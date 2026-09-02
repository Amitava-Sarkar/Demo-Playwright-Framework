import 'dotenv/config';
import { existsSync, readFileSync } from 'fs';
import { request as _request } from 'https';
import { parseStringPromise } from 'xml2js';

const webhookUrl = process.env.SLACK_WEBHOOK_URL;

if (!webhookUrl) {
    console.error('SLACK_WEBHOOK_URL is not defined');
    process.exit(1);
}

const junitPath =
    process.env.JUNIT_OUTPUT_FILE || 'junit-results/playwright-results.xml';

function getEnv(name, fallback = 'N/A') {
    return process.env[name] || fallback;
}

async function parseJUnit() {
    if (!existsSync(junitPath)) {
        console.warn(`JUnit report not found: ${junitPath}`);

        return {
            total: 'N/A',
            passed: 'N/A',
            failed: 'N/A',
            skipped: 'N/A',
            duration: 'N/A',
        };
    }

    const xml = readFileSync(junitPath, 'utf8');
    const result = await parseStringPromise(xml);

    const testsuites = result.testsuites?.testsuite;

    if (!testsuites || testsuites.length === 0) {
        throw new Error('Unable to find testsuites in JUnit report');
    }

    let total = 0;
    let failed = 0;
    let skipped = 0;
    let errors = 0;
    let duration = 0;

    for (const testsuite of testsuites) {
        total += Number(testsuite.$?.tests || 0);
        failed += Number(testsuite.$?.failures || 0);
        skipped += Number(testsuite.$?.skipped || 0);
        errors += Number(testsuite.$?.errors || 0);
        duration += Number(testsuite.$?.time || 0);
    }

    const passed = total - failed - skipped - errors;

    return {
        total,
        passed,
        failed: failed + errors,
        skipped,
        duration: `${duration.toFixed(2)}s`,
    };
}

function sendSlackMessage(message) {
    return new Promise((resolve, reject) => {
        const url = new URL(webhookUrl);

        const payload = JSON.stringify({
            text: message,
        });

        const request = _request(
            {
                hostname: url.hostname,
                path: url.pathname + url.search,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(payload),
                },
            },
            response => {
                let responseData = '';

                response.on('data', chunk => {
                    responseData += chunk;
                });

                response.on('end', () => {
                    if (response.statusCode >= 200 && response.statusCode < 300) {
                        resolve(responseData);
                    } else {
                        reject(
                            new Error(
                                `Slack returned ${response.statusCode}: ${responseData}`
                            )
                        );
                    }
                });
            }
        );

        request.on('error', reject);

        request.write(payload);
        request.end();
    });
}

async function main() {
    const results = await parseJUnit();

    const status = getEnv('JOB_STATUS');

    const statusIcon =
        status === 'success'
            ? '✅'
            : status === 'cancelled'
                ? '⚠️'
                : '🚨';

    const message = `
${statusIcon} *Playwright Automation ${status.toUpperCase()}*

*Environment:* ${getEnv('ENVIRONMENT', 'Staging')}
*Browser:* ${getEnv('BROWSER', 'Chromium')}
*Branch:* ${getEnv('BRANCH')}
*Commit:* ${getEnv('COMMIT')}
*Workflow:* ${getEnv('WORKFLOW')}

*Test Results*
✅ Passed: ${results.passed}
❌ Failed: ${results.failed}
⏭️ Skipped: ${results.skipped}
📊 Total: ${results.total}
⏱️ Duration: ${results.duration}

*Additional Checks*
♿ Accessibility: ${getEnv('ACCESSIBILITY_STATUS')}
🚦 Lighthouse: ${getEnv('LIGHTHOUSE_STATUS')}

*View Results*
${getEnv('GITHUB_RUN_URL')}
`;

    console.log(message);

    await sendSlackMessage(message);

    console.log('Slack notification sent successfully.');
}

main().catch(error => {
    console.error('Failed to send Slack notification:', error);
    process.exit(1);
});