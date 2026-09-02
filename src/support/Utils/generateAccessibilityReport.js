import fs from 'fs';
import path from 'path';
import { createHtmlReport } from 'axe-html-reporter';

const resultsDir = 'accessibility-results';
const reportDir = 'accessibility-report';

const files = fs
    .readdirSync(resultsDir)
    .filter(file => file.endsWith('.json'));

const allResults = files.map(file => {
    const filePath = path.join(resultsDir, file);

    return {
        pageName: path.basename(file, '.json'),
        results: JSON.parse(
            fs.readFileSync(filePath, 'utf8')
        ),
    };
});

const violations = allResults.flatMap(
    ({ pageName, results }) =>
        results.violations.map(violation => ({
            ...violation,
            pageName,
        }))
);

fs.mkdirSync(reportDir, { recursive: true });

createHtmlReport({
    results: {
        violations,
    },
    options: {
        projectKey: 'Accessibility Test Suite',
        outputDir: reportDir,
        reportFileName: 'index.html',
    },
});

console.log(
    `Accessibility report generated: ${reportDir}/index.html`
);