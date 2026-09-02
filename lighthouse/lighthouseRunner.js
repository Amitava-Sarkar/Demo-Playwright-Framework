import lighthouse from 'lighthouse';
import { launch as launchChrome } from 'chrome-launcher';
import { chromium } from 'playwright';
import {
    mkdirSync,
    writeFileSync,
    readFileSync,
} from 'fs';
import { resolve, join } from 'path';

import lighthousePages from './lighthousePages.js';

const REPORT_DIR = resolve('./lighthouse-report');
const STORAGE_STATE = resolve('./src/auth/user.json');

const thresholds = {
    performance: 80,
    accessibility: 90,
    bestPractices: 90,
    seo: 80,
};

async function runLighthouse(page, port) {
    console.log('\n==============================================');
    console.log(`Running Lighthouse: ${page.name}`);
    console.log(`Requested URL: ${page.url}`);
    console.log('==============================================');

    const result = await lighthouse(page.url, {
        port,

        output: 'html',

        onlyCategories: [
            'performance',
            'accessibility',
            'best-practices',
            'seo',
        ],

        disableStorageReset: true,
    });

    const scores = {
        performance: Math.round(
            result.lhr.categories.performance.score * 100
        ),

        accessibility: Math.round(
            result.lhr.categories.accessibility.score * 100
        ),

        bestPractices: Math.round(
            result.lhr.categories['best-practices'].score * 100
        ),

        seo: Math.round(
            result.lhr.categories.seo.score * 100
        ),
    };

    const finalUrl = result.lhr.finalDisplayedUrl;

    console.log('\nLighthouse Results');
    console.log('----------------------------------------------');
    console.log(`Performance     : ${scores.performance}`);
    console.log(`Accessibility   : ${scores.accessibility}`);
    console.log(`Best Practices  : ${scores.bestPractices}`);
    console.log(`SEO             : ${scores.seo}`);
    console.log('----------------------------------------------');

    const reportPath = join(
        REPORT_DIR,
        `${page.name.replace(/\s+/g, '-')}-lighthouse-report.html`
    );

    mkdirSync(REPORT_DIR, {
        recursive: true,
    });

    writeFileSync(
        reportPath,
        result.report
    );

    console.log(`Report: ${reportPath}`);

    return {
        ...page,
        scores,
        finalUrl,
    };
}

async function runAllLighthouseTests() {
    console.log('\n==============================================');
    console.log('        LIGHTHOUSE TEST EXECUTION');
    console.log('==============================================');

    mkdirSync(REPORT_DIR, {
        recursive: true,
    });

    /*
     * Launch Chrome with remote debugging.
     */
    const chrome = await launchChrome({
        chromeFlags: [
            '--headless',
            '--no-sandbox',
            '--disable-dev-shm-usage',
        ],
    });

    let browser;

    try {
        /*
         * Connect Playwright to the SAME Chrome instance.
         */
        browser = await chromium.connectOverCDP(
            `http://127.0.0.1:${chrome.port}`
        );

        const contexts = browser.contexts();

        const context =
            contexts.length > 0
                ? contexts[0]
                : await browser.newContext({
                      storageState: STORAGE_STATE,
                  });

        /*
         * If the existing context doesn't contain the
         * Playwright authentication state, add it.
         */
        if (contexts.length === 0) {
            await context.addCookies(
                JSON.parse(
                    readFileSync(
                        STORAGE_STATE,
                        'utf-8'
                    )
                ).cookies
            );
        }

        const authPage = await context.newPage();

        /*
         * Load the application's origin.
         */
        const origin = new URL(
            lighthousePages[0].url
        ).origin;

        await authPage.goto(origin, {
            waitUntil: 'domcontentloaded',
        });

        /*
         * Add localStorage from user.json.
         */
        const storageState = JSON.parse(
            readFileSync(
                STORAGE_STATE,
                'utf-8'
            )
        );

        const originStorage = storageState.origins?.find(
            item => item.origin === origin
        );

        if (originStorage?.localStorage) {
            await authPage.evaluate((items) => {
                for (const item of items) {
                    localStorage.setItem(
                        item.name,
                        item.value
                    );
                }
            }, originStorage.localStorage);

            await authPage.reload({
                waitUntil: 'domcontentloaded',
            });
        }

        console.log('\nAuthentication state loaded.');

        /*
         * Verify authentication before running Lighthouse.
         */
        const authenticatedPage =
            await context.newPage();

        await authenticatedPage.goto(
            `${origin}/account/importers`,
            {
                waitUntil: 'networkidle',
            }
        );

        console.log(
            `Authentication check URL: ${authenticatedPage.url()}`
        );

        if (
            authenticatedPage.url().includes(
                '/users/sign-in'
            )
        ) {
            throw new Error(
                'Authentication failed. Lighthouse would test the login page.'
            );
        }

        console.log(
            '✅ Authentication verified successfully.'
        );

        await authenticatedPage.close();
        await authPage.close();

        const results = [];

        for (const page of lighthousePages) {
            const result = await runLighthouse(
                page,
                chrome.port
            );

            results.push(result);
        }

        printSummary(results);
        generateSummaryReport(results);

    } finally {
        if (browser) {
            await browser.close();
        }

        await chrome.kill();
    }
}

function printSummary(results) {
    console.log(
        '\n\n=============================================='
    );

    console.log(
        '           LIGHTHOUSE SUMMARY'
    );

    console.log(
        '=============================================='
    );

    console.table(
        results.map(result => ({
            Page: result.name,
            'Requested URL': result.url,
            Performance: result.scores.performance,
            Accessibility: result.scores.accessibility,
            'Best Practices':
                result.scores.bestPractices,
            SEO: result.scores.seo,
        }))
    );
}

function generateSummaryReport(results) {
    const rows = results.map(result => {
        const reportFile =
            `${result.name.replace(
                /\s+/g,
                '-'
            )}-lighthouse-report.html`;

        return `
            <tr>
                <td>${result.name}</td>
                <td>${result.scores.performance}</td>
                <td>${result.scores.accessibility}</td>
                <td>${result.scores.bestPractices}</td>
                <td>${result.scores.seo}</td>
                <td>
                    <a
                        href="${reportFile}"
                        target="_blank"
                    >
                        View Report
                    </a>
                </td>
            </tr>
        `;
    }).join('');

    const html = `
        <!DOCTYPE html>

        <html>

        <head>

            <meta charset="UTF-8">

            <title>
                Lighthouse Summary Report
            </title>

            <style>

                body {
                    font-family: Arial, sans-serif;
                    margin: 40px;
                }

                h1 {
                    margin-bottom: 30px;
                }

                table {
                    width: 100%;
                    border-collapse: collapse;
                }

                th,
                td {
                    padding: 12px;
                    border: 1px solid #ddd;
                    text-align: center;
                }

                th {
                    background: #f4f4f4;
                }

                a {
                    text-decoration: none;
                }

            </style>

        </head>

        <body>

            <h1>
                Lighthouse Summary Report
            </h1>

            <table>

                <thead>

                    <tr>
                        <th>Page</th>
                        <th>Performance</th>
                        <th>Accessibility</th>
                        <th>Best Practices</th>
                        <th>SEO</th>
                        <th>Report</th>
                    </tr>

                </thead>

                <tbody>
                    ${rows}
                </tbody>

            </table>

        </body>

        </html>
    `;

    const summaryPath =
        join(
            REPORT_DIR,
            'index.html'
        );

    writeFileSync(
        summaryPath,
        html
    );

    console.log(
        `\nSummary report: ${summaryPath}`
    );
}

runAllLighthouseTests();