import AxeBuilder from '@axe-core/playwright';
import fs from 'fs';
import path from 'path';

class AccessibilityUtils {

    async getAccessibilityResults(page) {
        return await new AxeBuilder({ page }).analyze();
    }

    async saveAccessibilityResults(page, pageName) {

        const results =
            await this.getAccessibilityResults(page);

        const outputDir = 'accessibility-results';

        fs.mkdirSync(outputDir, { recursive: true });

        fs.writeFileSync(
            path.join(outputDir, `${pageName}.json`),
            JSON.stringify(results, null, 2)
        );

        console.log(
            `Accessibility results saved for ${pageName}`
        );

        return results;
    }

    async getBlockingViolations(page) {

        const { violations } =
            await this.getAccessibilityResults(page);

        return violations.filter(
            violation =>
                violation.impact === 'critical' ||
                violation.impact === 'serious' ||
                violation.impact === 'moderate'
        );
    }
}

export default new AccessibilityUtils();