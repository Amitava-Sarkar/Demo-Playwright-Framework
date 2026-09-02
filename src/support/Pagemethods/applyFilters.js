import { expect } from '@playwright/test';
import applyFiltersData from '../TestData/applyFilters.json' with { type: 'json' };
import { visibilityOfElement } from '../Utils/generalPlaywrightMethods';

export class ApplyFilters {
    constructor(page) {
        this.page = page;
        this.openImporter = page.getByTestId('template-name')
        this.importerName = page.getByTestId('template-name-input')
        this.importFileButton = page.getByRole('button', { name: applyFiltersData.uploadFiles.importFileButton })

        this.importerFrame = page.frameLocator('#fuse-importer-root');

        this.fileInput = this.importerFrame.locator('input[type="file"]');
        this.selectHeaderTitle = this.importerFrame.getByTestId('select-header-title');
        this.selectHeaderDescription = this.importerFrame.getByTestId('select-header-description');
        this.dataTable = this.importerFrame.locator('[data-test-id="table-view-wrapper"]');
        this.continueButton = this.importerFrame.getByTestId('continue-button');
        this.matchTitle = this.importerFrame.getByTestId('match-title');
        this.matchDescription = this.importerFrame.getByTestId('match-description');
        this.reviewPageHeaderText = this.importerFrame.getByTestId('review-submit');
        this.transformationTooltip = this.importerFrame.getByTestId('transformations-tooltip')
        this.okButton = this.importerFrame.getByRole('button', { name: 'OK' })
        this.applyFilterIcon = this.importerFrame.getByTestId('field-value-filters');
        this.tooltipContent = this.importerFrame.getByTestId('tool-tip-content');
        this.applyFilterPopup = this.importerFrame.locator('.gSoUCp');
        this.applyFilterPopupTitle = this.importerFrame.locator('.fGbAyc')
        this.applyFilterPopupDescription = this.importerFrame.locator('.bOBbDD')
        this.conditionGroupSection = this.importerFrame.getByTestId('condition-group')
        this.addConditionButton = this.importerFrame.getByTestId('add-condition')
        this.addConditionGroupButton = this.importerFrame.getByTestId('add-condition-group')
        this.applyButton = this.importerFrame.getByRole('button', { name: applyFiltersData.applyFilter.applyButton })
        this.selectColumnHeaderDropdown = this.importerFrame.locator(`[placeholder="${applyFiltersData.applyFilter.placeholders.selectField}"]`)
        this.selectColumnHeaderDropdownOptions = this.importerFrame.locator('.kSIuag')
        this.columnHeaders = this.importerFrame.locator('[data-test-id="autocomplete-menu-item"]')
        this.operatorDropdown = this.importerFrame.locator(`[placeholder="${applyFiltersData.applyFilter.placeholders.selectOperator}"]`)
        this.operatorDropdownOptions = this.importerFrame.locator('.kSIuag')
        this.operators = this.importerFrame.locator('[data-test-id="autocomplete-menu-item"]')
        this.valueInput = this.importerFrame.locator(`[placeholder="${applyFiltersData.applyFilter.placeholders.selectValue}"]`)
        this.valueField = this.importerFrame.locator(`[placeholder="${applyFiltersData.applyFilter.placeholders.enterValue}"]`)
        this.valueInputOptions = this.importerFrame.locator('.kSIuag')
        this.valueInputOptionsItems = this.importerFrame.locator('[data-test-id="autocomplete-menu-item"]')
        this.values = this.importerFrame.locator('[data-test-id="autocomplete-menu-item"]')
        this.booleanCells = this.importerFrame.getByTestId('option').locator('input')   
        this.selectDateField = this.importerFrame.getByTestId('datetime-input')
        this.calender = this.importerFrame.getByTestId('date-picker-container')
        this.currentMonthAndYear = this.importerFrame.getByTestId('month-year-selector')
        this.nextButton = this.importerFrame.getByTestId('next-month-button')
        this.previousButton = this.importerFrame.getByTestId('prev-month-button')
        this.deleteFilterIcon = this.importerFrame.getByTestId('delete-condition')
        this.filteredDropdownCells = this.importerFrame.locator('.sc-cOajNj.cgEFsj')
    }

    async navigateToReviewPage() {
        await this.page.goto('/');
        await expect(this.openImporter.filter({ hasText: applyFiltersData.uploadFiles.importerName })).toBeVisible();
        await this.openImporter.filter({ hasText: applyFiltersData.uploadFiles.importerName }).click();
        await expect(this.importerName).toBeVisible();
        await expect(this.importerName).toContainText(applyFiltersData.uploadFiles.importerName);
        await expect(this.importFileButton).toBeVisible();
        await expect(this.importFileButton).toBeEnabled();
        await this.importFileButton.click();
        await this.fileInput.setInputFiles(applyFiltersData.uploadFiles.sampleCsv);
        await expect(this.selectHeaderTitle).toBeVisible();
        await expect(this.selectHeaderDescription).toBeVisible();
        await expect(this.dataTable).toBeVisible();
        await expect(this.continueButton).toBeVisible();
        await expect(this.continueButton).toBeEnabled();
        await this.continueButton.click();
        await expect(this.matchTitle).toBeVisible();
        await expect(this.matchDescription).toBeVisible();
        await expect(this.continueButton).toBeVisible();
        await expect(this.continueButton).toBeEnabled();
        await this.continueButton.click();
        await expect(this.continueButton).toBeVisible();
        await this.continueButton.click();
        await expect(this.reviewPageHeaderText).toBeVisible();
        await expect(this.dataTable).toBeVisible();
        await expect(this.transformationTooltip).toBeVisible();
        await expect(this.okButton).toBeVisible();
        await expect(this.okButton).toBeEnabled();
        await this.okButton.click();
        await expect(this.applyFilterPopup).toBeHidden();
    }

    async verifyFunctionalityOfApplyFilterIcon() {
        await expect(this.applyFilterIcon).toBeVisible();
        await this.applyFilterIcon.hover();
        await expect(this.tooltipContent).toBeVisible();
        await expect(this.tooltipContent).toContainText(applyFiltersData.applyFilter.tooltip);
        await this.applyFilterIcon.click();
        await expect(this.applyFilterPopup).toBeVisible();
    }

    async visibilityOfElementsInApplyFilterPopup() {
        const elements = [
            this.applyFilterPopupTitle,
            this.applyFilterPopupDescription,
            this.conditionGroupSection,
            this.addConditionButton,
            this.addConditionGroupButton,
            this.applyButton
        ]
        for (const element of elements) {
            await visibilityOfElement(element);
        }
    }

    async applyFilterForBooleanColumnWithIsOperator() {
        const { columns, operators, values , booleanCellIdPrefix } = applyFiltersData.applyFilter;
        await this.verifyFunctionalityOfApplyFilterIcon();
        await this.selectColumnAndOperator(columns.boolean, operators.is);
        await this.valueInput.click();
        await expect(this.valueInputOptions).toBeVisible();
        await this.values.filter({ hasText: values.true }).click();
        await expect(this.valueInput).toHaveValue(values.true)
        await this.applyButton.click();
        await expect(this.applyFilterPopup).toBeHidden();

        const filteredBooleanCellsCount = await this.importerFrame
            .locator(`.sc-cOajNj.cgEFsj`)
            .count();

        for (let i = 0; i < filteredBooleanCellsCount; i++) {
            const booleanCell = await this.importerFrame.locator(`#${booleanCellIdPrefix}-${i}`);
            await expect(booleanCell).toHaveValue(values.true)
        }
    }

    async applyFilterForBooleanColumnWithIsEmptyOperator() {
        const { columns, operators, values } = applyFiltersData.applyFilter;

        await this.verifyFunctionalityOfApplyFilterIcon();
        await this.selectColumnAndOperator(columns.boolean, operators.isEmpty);
        await this.applyButton.click();
        await expect(this.applyFilterPopup).toBeHidden();

        const booleanCellsCount = await this.booleanCells.count();

        for (let i = 1; i < booleanCellsCount; i++) {
            const booleanCell = this.booleanCells.nth(i);
            await expect(booleanCell).toHaveValue(values.empty)
        }

    }

    async applyFilterForBooleanColumnWithIsNotEmptyOperator() {
        const { columns, operators, values, booleanCellIdPrefix } = applyFiltersData.applyFilter;
        await this.verifyFunctionalityOfApplyFilterIcon();

        await this.selectColumnAndOperator(columns.boolean, operators.isNotEmpty);
        await this.applyButton.click();
        await expect(this.applyFilterPopup).toBeHidden();

        const filteredBooleanCellsCount = await this.importerFrame
            .locator(`.sc-cOajNj.cgEFsj`)
            .count();

        for (let i = 1; i < filteredBooleanCellsCount; i++) {
            const booleanCell = await this.importerFrame.locator(`#${booleanCellIdPrefix}-${i}`);
            await expect(booleanCell).not.toHaveValue(values.empty);
        }
    }

    async verifyAvailableOperatorsForStringColumn() {
        const { columns, stringColumnOperators } = applyFiltersData.applyFilter;
        await this.verifyFunctionalityOfApplyFilterIcon();

        await this.selectColumnHeaderDropdown.click();
        await expect(this.selectColumnHeaderDropdownOptions).toBeVisible();
        await this.columnHeaders.filter({ hasText: columns.string }).first().click();
        await expect(this.selectColumnHeaderDropdown).toHaveValue(columns.string)
        await this.operatorDropdown.click();
        await expect(this.operatorDropdownOptions).toBeVisible();

        const actualOperators = (await this.operators.allTextContents())
            .map(operator => operator.trim())
            .filter(operator => operator !== '');

        expect(actualOperators).toEqual(stringColumnOperators);
    }

    async applyFilterForStringColumnWithContainsOperator() {
        const { columns, operators, values, stringCellIdPrefix, stringCellsToFill } = applyFiltersData.applyFilter;

        for (let i = 0; i < stringCellsToFill; i++) {
            const stringCell = this.importerFrame.locator(`#${stringCellIdPrefix}-${i}`);
            await stringCell.dblclick();
            await stringCell.fill(values.testString);
        }

        await this.verifyFunctionalityOfApplyFilterIcon();

        await this.selectColumnAndOperator(columns.string, operators.contains);

        await expect(this.valueField).toBeVisible();
        await this.valueField.fill(values.testString);
        await expect(this.valueField).toHaveValue(values.testString);

        await this.applyButton.click();
        await expect(this.applyFilterPopup).toBeHidden();

        const filteredStringCellsCount = await this.importerFrame
            .getByTestId('spreadsheet-input')
            .filter({ hasText: values.testString })
            .count();

        for (let i = 0; i < filteredStringCellsCount; i++) {
            const stringCellValue = await this.importerFrame.locator(`#${stringCellIdPrefix}-${i}`).textContent();
            expect(stringCellValue).toContain(values.testString);
        }
    }


    async applyFilterForStringColumnWithDoesNotContainOperator() {
        const { columns, operators, values, stringCellIdPrefix, stringCellsToFill, stringCellsFillWaitTimeout, filteredCount } = applyFiltersData.applyFilter;

        for (let i = 0; i < stringCellsToFill; i++) {
            const stringCell = this.importerFrame.locator(`#${stringCellIdPrefix}-${i}`);
            await stringCell.dblclick();
            await stringCell.fill(values.testString);
        }
        await this.page.waitForTimeout(stringCellsFillWaitTimeout);
        await this.verifyFunctionalityOfApplyFilterIcon();

        await this.selectColumnAndOperator(columns.string, operators.doesNotContain);

        await expect(this.valueField).toBeVisible();
        await this.valueField.fill(values.testString);
        await expect(this.valueField).toHaveValue(values.testString);

        await this.applyButton.click();
        await expect(this.applyFilterPopup).toBeHidden();

        const filteredStringCellsCount = await this.importerFrame
            .getByTestId('spreadsheet-input')
            .filter({ hasText: values.testString })
            .count();

        expect(filteredStringCellsCount).toBe(filteredCount.doesNotContain);
    }

    async applyFilterForStringColumnWithIsOperator() {
        const { columns, operators, stringCellIdPrefix, filteredCount } = applyFiltersData.applyFilter;

        const firstStringCellValue = await this.importerFrame.locator(`#${stringCellIdPrefix}-0`).textContent();
        await this.verifyFunctionalityOfApplyFilterIcon();
        await this.selectColumnAndOperator(columns.string, operators.is);
        await this.valueField.fill(firstStringCellValue);
        await expect(this.valueField).toHaveValue(firstStringCellValue);
        await this.applyButton.click();
        await expect(this.applyFilterPopup).toBeHidden();

        const filteredStringCellsCount = await this.importerFrame
            .getByTestId('spreadsheet-input')
            .filter({ hasText: firstStringCellValue })
            .count();

        expect(filteredStringCellsCount).toBe(filteredCount.isOperator);
    }

    async applyFilterForStringColumnWithIsEmptyOperator() {
        const { columns, operators, values, stringCellIdPrefix, emptyStringCellsToVerify } = applyFiltersData.applyFilter;
        await this.verifyFunctionalityOfApplyFilterIcon();

        await this.selectColumnAndOperator(columns.string, operators.isEmpty);
        await this.applyButton.click();
        await expect(this.applyFilterPopup).toBeHidden();


        for (let i = 0; i < emptyStringCellsToVerify; i++) {
            const stringCellValue = await this.importerFrame.locator(`#${stringCellIdPrefix}-${i}`).textContent();
            expect(stringCellValue).toBe(values.empty);
        }
    }

    async applyFilterForStringColumnWithIsNotEmptyOperator() {
        const { columns, operators, values, stringCellIdPrefix, emptyStringCellsToVerify } = applyFiltersData.applyFilter;
        await this.verifyFunctionalityOfApplyFilterIcon();
        await this.selectColumnAndOperator(columns.string, operators.isNotEmpty);
        await this.applyButton.click();
        await expect(this.applyFilterPopup).toBeHidden();

        for (let i = 0; i < emptyStringCellsToVerify; i++) {
            const stringCellValue = await this.importerFrame.locator(`#${stringCellIdPrefix}-${i}`).textContent();
            expect(stringCellValue).not.toBe(values.empty);
        }
    }

    async verifyAvailableOperatorsForIntegerAndFloatColumn() {
        const { integerAndFloatColumnOperators , columns , operators } = applyFiltersData.applyFilter;

        await this.verifyFunctionalityOfApplyFilterIcon();

        await this.selectColumnHeaderDropdown.click();
        await expect(this.selectColumnHeaderDropdownOptions).toBeVisible();
        await this.columnHeaders.filter({ hasText: columns.integer }).first().click();
        await expect(this.selectColumnHeaderDropdown).toHaveValue(columns.integer)
        await this.operatorDropdown.click();
        await expect(this.operatorDropdownOptions).toBeVisible();

        const actualOperators = (await this.operators.allTextContents())
            .map(operator => operator.trim())
            .filter(operator => operator !== '');

        expect(actualOperators).toEqual(integerAndFloatColumnOperators);
        await this.operators
            .getByText(operators.is, { exact: true })
            .click();

        await expect(this.operatorDropdown).toHaveValue(operators.is);
        await this.selectColumnHeaderDropdown.click();
        await expect(this.selectColumnHeaderDropdownOptions).toBeVisible();
        await this.columnHeaders.filter({ hasText: columns.float }).first().click();
        await expect(this.selectColumnHeaderDropdown).toHaveValue(columns.float)
        await this.operatorDropdown.click();
        await expect(this.operatorDropdownOptions).toBeVisible();

        const actualOperatorsForFloat = (await this.operators.allTextContents())
            .map(operator => operator.trim())
            .filter(operator => operator !== '');

        expect(actualOperatorsForFloat).toEqual(integerAndFloatColumnOperators);
    }

    async selectColumnAndOperator(columnName, operatorName) {
        await this.selectColumnHeaderDropdown.click();
        await expect(this.selectColumnHeaderDropdownOptions).toBeVisible();

        await this.columnHeaders
            .filter({ hasText: columnName, exact: true })
            .first()
            .click();

        await expect(this.selectColumnHeaderDropdown).toHaveValue(columnName);
        await this.operatorDropdown.click();
        await expect(this.operatorDropdownOptions).toBeVisible();

        await this.operators
            .getByText(operatorName, { exact: true })
            .click();

        await expect(this.operatorDropdown).toHaveValue(operatorName);
    }

    async selecTimeColumnOperator(columnName, operatorName) {
        await this.selectColumnHeaderDropdown.click();
        await expect(this.selectColumnHeaderDropdownOptions).toBeVisible();

        await this.columnHeaders
            .last()
            .click();

        await expect(this.selectColumnHeaderDropdown).toHaveValue(columnName);
        await this.operatorDropdown.click();
        await expect(this.operatorDropdownOptions).toBeVisible();

        await this.operators
            .getByText(operatorName, { exact: true })
            .click();

        await expect(this.operatorDropdown).toHaveValue(operatorName);
    }

    async applyFilterForIntegerColumnWithIsOperator() {
        const { columns, operators, integerCellIdPrefix, firstIntegerCellIndex, filteredCount } = applyFiltersData.applyFilter;
        const integerCellValue = await this.importerFrame.locator(`#${integerCellIdPrefix}-${firstIntegerCellIndex}`).textContent();

        await this.verifyFunctionalityOfApplyFilterIcon();
        await this.selectColumnAndOperator(columns.integer, operators.is);

        await this.valueField.fill(integerCellValue);
        await expect(this.valueField).toHaveValue(integerCellValue);
        await this.applyButton.click();
        await expect(this.applyFilterPopup).toBeHidden();

        const filteredIntegerCellsCount = await this.importerFrame
            .getByTestId('spreadsheet-input')
            .filter({ hasText: integerCellValue })
            .count();

        expect(filteredIntegerCellsCount).toBe(filteredCount.isOperator);
    }

    async applyFilterForIntegerColumnWithIsNotOperator() {
        const { columns, operators, integerCellIdPrefix, firstIntegerCellIndex, filteredCount } = applyFiltersData.applyFilter;
        const integerCellValue = await this.importerFrame.locator(`#${integerCellIdPrefix}-${firstIntegerCellIndex}`).textContent();

        await this.verifyFunctionalityOfApplyFilterIcon();
        await this.selectColumnAndOperator(columns.integer, operators.isNot);
        await this.valueField.fill(integerCellValue);
        await expect(this.valueField).toHaveValue(integerCellValue);
        await this.applyButton.click();

        const filteredIntegerCellsCount = await this.importerFrame
            .getByTestId('spreadsheet-input')
            .filter({ hasText: integerCellValue })
            .count();

        expect(filteredIntegerCellsCount).toBe(filteredCount.isNotOperator);
    }

    async applyFilterForIntegerColumnWithIsGreaterThanOperator() {
        const { columns, operators, integerCellIdPrefix, integerFilterValues, integerCellsToVerify } = applyFiltersData.applyFilter;

        await this.verifyFunctionalityOfApplyFilterIcon();
        await this.selectColumnAndOperator(columns.integer, operators.isGreaterThan);
        await this.valueField.fill(integerFilterValues.greaterThan);
        await expect(this.valueField).toHaveValue(integerFilterValues.greaterThan);
        await this.applyButton.click();
        await expect(this.applyFilterPopup).toBeHidden();

        for (let i = 0; i < integerCellsToVerify.greaterThan; i++) {
            const integerCellValue = await this.importerFrame.locator(`#${integerCellIdPrefix}-${i}`).textContent();
            expect(Number(integerCellValue)).toBeGreaterThan(Number(integerFilterValues.greaterThan));
        }
    }

    async applyFilterForIntegerColumnWithIsGreaterThanOperatorWhenNoDataIsGreaterThanTheValue() {
        const { columns, operators, integerFilterValues, filteredCount } = applyFiltersData.applyFilter;

        await this.verifyFunctionalityOfApplyFilterIcon();
        await this.selectColumnAndOperator(columns.integer, operators.isGreaterThan);
        await this.valueField.fill(integerFilterValues.greaterThanNoMatch);
        await expect(this.valueField).toHaveValue(integerFilterValues.greaterThanNoMatch);
        await this.applyButton.click();
        await expect(this.applyFilterPopup).toBeHidden();

        const filteredIntegerCellsCount = await this.importerFrame
            .getByTestId('spreadsheet-input')
            .filter({ hasText: integerFilterValues.greaterThanNoMatch })
            .count();

        expect(filteredIntegerCellsCount).toBe(filteredCount.noMatch);
    }

    async applyFilterForIntegerColumnWithIsLessThanOperator() {
        const { columns, operators, integerCellIdPrefix, integerFilterValues, integerCellsToVerify } = applyFiltersData.applyFilter;

        await this.verifyFunctionalityOfApplyFilterIcon();
        await this.selectColumnAndOperator(columns.integer, operators.isLessThan);
        await this.valueField.fill(integerFilterValues.lessThan);
        await expect(this.valueField).toHaveValue(integerFilterValues.lessThan);
        await this.applyButton.click();
        await expect(this.applyFilterPopup).toBeHidden();

        for (let i = 0; i < integerCellsToVerify.lessThan; i++) {
            const integerCellValue = await this.importerFrame.locator(`#${integerCellIdPrefix}-${i}`).textContent();
            expect(Number(integerCellValue)).toBeLessThan(Number(integerFilterValues.lessThan));
        }
    }

    async applyFilterForIntegerColumnWithIsLessThanOperatorWhenNoDataIsLessThanTheValue() {
        const { columns, operators, integerFilterValues, filteredCount } = applyFiltersData.applyFilter;

        await this.verifyFunctionalityOfApplyFilterIcon();
        await this.selectColumnAndOperator(columns.integer, operators.isLessThan);
        await this.valueField.fill(integerFilterValues.lessThanNoMatch);
        await expect(this.valueField).toHaveValue(integerFilterValues.lessThanNoMatch);
        await this.applyButton.click();
        await expect(this.applyFilterPopup).toBeHidden();

        const filteredIntegerCellsCount = await this.importerFrame
            .getByTestId('spreadsheet-input')
            .filter({ hasText: integerFilterValues.lessThanNoMatch })
            .count();

        expect(filteredIntegerCellsCount).toBe(filteredCount.noMatch);
    }

    async verifyAvailableOperatorsForEmailAndUrlColumn() {
        const { emailAndUrlColumnOperators , columns , operators } = applyFiltersData.applyFilter;

        await this.verifyFunctionalityOfApplyFilterIcon();
        await this.selectColumnHeaderDropdown.click();
        await expect(this.selectColumnHeaderDropdownOptions).toBeVisible();
        await this.columnHeaders.filter({ hasText: columns.email }).first().click();
        await expect(this.selectColumnHeaderDropdown).toHaveValue(columns.email)
        await this.operatorDropdown.click();
        await expect(this.operatorDropdownOptions).toBeVisible();

        const actualOperatorsForEmail = (await this.operators.allTextContents())
            .map(operator => operator.trim())
            .filter(operator => operator !== '');

        expect(actualOperatorsForEmail).toEqual(emailAndUrlColumnOperators);
        await this.operators
            .getByText(operators.is, { exact: true })
            .click();
        await expect(this.operatorDropdown).toHaveValue(operators.is);


        await this.selectColumnHeaderDropdown.click();
        await expect(this.selectColumnHeaderDropdownOptions).toBeVisible();
        await this.columnHeaders.filter({ hasText: columns.url }).first().click();
        await expect(this.selectColumnHeaderDropdown).toHaveValue(columns.url)
        await this.operatorDropdown.click();
        await expect(this.operatorDropdownOptions).toBeVisible();

        const actualOperatorsForURL = (await this.operators.allTextContents())
            .map(operator => operator.trim())
            .filter(operator => operator !== '');

        expect(actualOperatorsForURL).toEqual(emailAndUrlColumnOperators);
    }

    async applyFilterForEmailColumnWithContainsOperator() {
        const { columns, operators, emailCellIdPrefix, firstEmailCellIndex } = applyFiltersData.applyFilter;

        const firstEmailCellValue = await this.importerFrame.locator(`#${emailCellIdPrefix}-${firstEmailCellIndex}`).textContent();
        await this.verifyFunctionalityOfApplyFilterIcon();
        await this.selectColumnAndOperator(columns.email, operators.contains);
        await this.valueField.fill(firstEmailCellValue);
        await expect(this.valueField).toHaveValue(firstEmailCellValue);
        await this.applyButton.click();
        await expect(this.applyFilterPopup).toBeHidden();

        const filteredEmailCellsCount = await this.importerFrame
            .getByTestId('spreadsheet-input')
            .filter({ hasText: firstEmailCellValue })
            .count();

        for (let i = 0; i < filteredEmailCellsCount; i++) {
            const emailCellValue = await this.importerFrame.locator(`#${emailCellIdPrefix}-${i}`).textContent();
            expect(emailCellValue).toContain(firstEmailCellValue);
        }
    }

    async applyFilterForEmailColumnWithDoesNotContainOperator() {
        const { columns, operators, filteredCount, emailCellIdPrefix, firstEmailCellIndex, emailAndUrlCellsToVerify } = applyFiltersData.applyFilter;

        const firstEmailCellValue = await this.importerFrame.locator(`#${emailCellIdPrefix}-${firstEmailCellIndex}`).textContent();
        await this.verifyFunctionalityOfApplyFilterIcon();
        await this.selectColumnAndOperator(columns.email, operators.doesNotContain);
        await this.valueField.fill(firstEmailCellValue);
        await expect(this.valueField).toHaveValue(firstEmailCellValue);
        await this.applyButton.click();
        await expect(this.applyFilterPopup).toBeHidden();

        const filteredEmailCellsCount = await this.importerFrame
            .getByTestId('spreadsheet-input')
            .locator(`[id^="${emailCellIdPrefix}-"]`)
            .count();

        expect(filteredEmailCellsCount).toBe(filteredCount.doesNotContain);

        for (let i = 0; i < emailAndUrlCellsToVerify.doesNotContain; i++) {
            const emailCellValue = await this.importerFrame.locator(`#${emailCellIdPrefix}-${i}`).textContent();
            expect(emailCellValue).not.toContain(firstEmailCellValue);
        }
    }

    async applyFilterForEmailColumnWithIsOperator() {
        const { columns, operators, emailCellIdPrefix, firstEmailCellIndex } = applyFiltersData.applyFilter;

        const firstEmailCellValue = await this.importerFrame.locator(`#${emailCellIdPrefix}-${firstEmailCellIndex}`).textContent();
        await this.verifyFunctionalityOfApplyFilterIcon();
        await this.selectColumnAndOperator(columns.email, operators.is);
        await this.valueField.fill(firstEmailCellValue);
        await expect(this.valueField).toHaveValue(firstEmailCellValue);
        await this.applyButton.click();
        await expect(this.applyFilterPopup).toBeHidden();

        const filteredEmailCellsCount = await this.importerFrame
            .getByTestId('spreadsheet-input')
            .locator(`[id^="${emailCellIdPrefix}-"]`)
            .count();

        for (let i = 0; i < filteredEmailCellsCount; i++) {
            const emailCellValue = await this.importerFrame.locator(`#${emailCellIdPrefix}-${i}`).textContent();
            expect(emailCellValue).toContain(firstEmailCellValue);
        }

    }

    async applyFilterForEmailColumnWithIsNotOperator() {
        const { columns, operators, filteredCount, emailCellIdPrefix, firstEmailCellIndex, emailAndUrlCellsToVerify } = applyFiltersData.applyFilter;

        const firstEmailCellValue = await this.importerFrame.locator(`#${emailCellIdPrefix}-${firstEmailCellIndex}`).textContent();
        await this.verifyFunctionalityOfApplyFilterIcon();
        await this.selectColumnAndOperator(columns.email, operators.isNot);
        await this.valueField.fill(firstEmailCellValue);
        await expect(this.valueField).toHaveValue(firstEmailCellValue);
        await this.applyButton.click();
        await expect(this.applyFilterPopup).toBeHidden();

        const filteredEmailCellsCount = await this.importerFrame
            .getByTestId('spreadsheet-input')
            .locator(`[id^="${emailCellIdPrefix}-"]`)
            .count();

        expect(filteredEmailCellsCount).toBe(filteredCount.doesNotContain);

        for (let i = 0; i < emailAndUrlCellsToVerify.doesNotContain; i++) {
            const emailCellValue = await this.importerFrame.locator(`#${emailCellIdPrefix}-${i}`).textContent();
            expect(emailCellValue).not.toContain(firstEmailCellValue);
        }
    }

    async applyFilterForEmailColumnWithIsEmptyOperator() {
        const { columns, operators, values, emailCellIdPrefix } = applyFiltersData.applyFilter;

        await this.verifyFunctionalityOfApplyFilterIcon();
        await this.selectColumnAndOperator(columns.email, operators.isEmpty);
        await this.applyButton.click();
        await expect(this.applyFilterPopup).toBeHidden();

        const filteredEmailCellsCount = await this.importerFrame
            .getByTestId('spreadsheet-input')
            .locator(`[id^="${emailCellIdPrefix}-"]`)
            .count();

        for (let i = 0; i < filteredEmailCellsCount; i++) {
            const emailCellValue = await this.importerFrame.locator(`#${emailCellIdPrefix}-${i}`).textContent();
            expect(emailCellValue).toBe(values.empty);
        }

    }

    async applyFilterForEmailColumnWithIsNotEmptyOperator() {
        const { columns, operators, values, emailCellIdPrefix } = applyFiltersData.applyFilter;

        await this.verifyFunctionalityOfApplyFilterIcon();
        await this.selectColumnAndOperator(columns.email, operators.isNotEmpty);
        await this.applyButton.click();
        await expect(this.applyFilterPopup).toBeHidden();

        const filteredEmailCellsCount = await this.importerFrame
            .getByTestId('spreadsheet-input')
            .locator(`[id^="${emailCellIdPrefix}-"]`)
            .count();

        for (let i = 0; i < filteredEmailCellsCount; i++) {
            const emailCellValue = await this.importerFrame.locator(`#${emailCellIdPrefix}-${i}`).textContent();
            expect(emailCellValue).not.toBe(values.empty);
        }
    }

    async applyFilterForUrlColumnWithContainsOperator() {
        const { columns, operators, urlCellIdPrefix, firstUrlCellIndex } = applyFiltersData.applyFilter;

        const firstUrlCellValue = await this.importerFrame.locator(`#${urlCellIdPrefix}-${firstUrlCellIndex}`).textContent();
        await this.verifyFunctionalityOfApplyFilterIcon();
        await this.selectColumnAndOperator(columns.url, operators.contains);
        await this.valueField.fill(firstUrlCellValue);
        await expect(this.valueField).toHaveValue(firstUrlCellValue);
        await this.applyButton.click();
        await expect(this.applyFilterPopup).toBeHidden();

        const filteredUrlCellsCount = await this.importerFrame
            .getByTestId('spreadsheet-input')
            .locator(`[id^="${urlCellIdPrefix}-"]`)
            .count();

        for (let i = 0; i < filteredUrlCellsCount; i++) {
            const urlCellValue = await this.importerFrame.locator(`#${urlCellIdPrefix}-${i}`).textContent();
            expect(urlCellValue).toContain(firstUrlCellValue);
        }
    }

    async applyFilterForUrlColumnWithDoesNotContainOperator() {
        const { columns, operators, urlCellIdPrefix, firstUrlCellIndex } = applyFiltersData.applyFilter;

        const firstUrlCellValue = await this.importerFrame.locator(`#${urlCellIdPrefix}-${firstUrlCellIndex}`).textContent();
        await this.verifyFunctionalityOfApplyFilterIcon();
        await this.selectColumnAndOperator(columns.url, operators.doesNotContain);
        await this.valueField.fill(firstUrlCellValue);
        await expect(this.valueField).toHaveValue(firstUrlCellValue);
        await this.applyButton.click();
        await expect(this.applyFilterPopup).toBeHidden();

        const filteredUrlCellsCount = await this.importerFrame
            .getByTestId('spreadsheet-input')
            .locator(`[id^="${urlCellIdPrefix}-"]`)
            .count();


        for (let i = 0; i < filteredUrlCellsCount; i++) {
            const urlCellValue = await this.importerFrame.locator(`#${urlCellIdPrefix}-${i}`).textContent();
            expect(urlCellValue).not.toContain(firstUrlCellValue);
        }
    }

    async applyFilterForUrlColumnWithIsOperator() {
        const { columns, operators, urlCellIdPrefix, firstUrlCellIndex } = applyFiltersData.applyFilter;

        const firstUrlCellValue = await this.importerFrame.locator(`#${urlCellIdPrefix}-${firstUrlCellIndex}`).textContent();
        await this.verifyFunctionalityOfApplyFilterIcon();
        await this.selectColumnAndOperator(columns.url, operators.is);
        await this.valueField.fill(firstUrlCellValue);
        await expect(this.valueField).toHaveValue(firstUrlCellValue);
        await this.applyButton.click();
        await expect(this.applyFilterPopup).toBeHidden();

        const filteredUrlCellsCount = await this.importerFrame
            .getByTestId('spreadsheet-input')
            .locator(`[id^="${urlCellIdPrefix}-"]`)
            .count();

        for (let i = 0; i < filteredUrlCellsCount; i++) {
            const urlCellValue = await this.importerFrame.locator(`#${urlCellIdPrefix}-${i}`).textContent();
            expect(urlCellValue).toContain(firstUrlCellValue);
        }
    }

    async applyFilterForUrlColumnWithIsNotOperator() {
        const { columns, operators, filteredCount, urlCellIdPrefix, firstUrlCellIndex } = applyFiltersData.applyFilter;

        const firstUrlCellValue = await this.importerFrame.locator(`#${urlCellIdPrefix}-${firstUrlCellIndex}`).textContent();
        await this.verifyFunctionalityOfApplyFilterIcon();
        await this.selectColumnAndOperator(columns.url, operators.isNot);
        await this.valueField.fill(firstUrlCellValue);
        await expect(this.valueField).toHaveValue(firstUrlCellValue);
        await this.applyButton.click();
        await expect(this.applyFilterPopup).toBeHidden();

        const filteredUrlCellsCount = await this.importerFrame
            .getByTestId('spreadsheet-input')
            .locator(`[id^="${urlCellIdPrefix}-"]`)
            .count();

        expect(filteredUrlCellsCount).toBe(filteredCount.doesNotContain);

        for (let i = 0; i < filteredUrlCellsCount; i++) {
            const urlCellValue = await this.importerFrame.locator(`#${urlCellIdPrefix}-${i}`).textContent();
            expect(urlCellValue).not.toContain(firstUrlCellValue);
        }
    }

    async applyFilterForUrlColumnWithIsEmptyOperator() {
        const { columns, operators, values, urlCellIdPrefix } = applyFiltersData.applyFilter;

        await this.verifyFunctionalityOfApplyFilterIcon();
        await this.selectColumnAndOperator(columns.url, operators.isEmpty);
        await this.applyButton.click();
        await expect(this.applyFilterPopup).toBeHidden();

        const filteredUrlCellsCount = await this.importerFrame
            .getByTestId('spreadsheet-input')
            .locator(`[id^="${urlCellIdPrefix}-"]`)
            .count();

        for (let i = 0; i < filteredUrlCellsCount; i++) {
            const urlCellValue = await this.importerFrame.locator(`#${urlCellIdPrefix}-${i}`).textContent();
            expect(urlCellValue).toBe(values.empty);
        }
    }

    async applyFilterForUrlColumnWithIsNotEmptyOperator() {
        const { columns, operators, values, urlCellIdPrefix } = applyFiltersData.applyFilter;

        await this.verifyFunctionalityOfApplyFilterIcon();
        await this.selectColumnAndOperator(columns.url, operators.isNotEmpty);
        await this.applyButton.click();
        await expect(this.applyFilterPopup).toBeHidden();

        const filteredUrlCellsCount = await this.importerFrame
            .getByTestId('spreadsheet-input')
            .locator(`[id^="${urlCellIdPrefix}-"]`)
            .count();

        for (let i = 0; i < filteredUrlCellsCount; i++) {
            const urlCellValue = await this.importerFrame.locator(`#${urlCellIdPrefix}-${i}`).textContent();
            expect(urlCellValue).not.toBe(values.empty);
        }
    }

    async selectDate(targetDate) {
        const date = new Date(targetDate);

        const targetMonth = date.toLocaleString('default', { month: 'long' });
        const targetYear = date.getFullYear().toString();
        const targetMonthAndYear = `${targetMonth} ${targetYear}`;
        const targetDay = date.getDate().toString();

        await expect(this.calender).toBeVisible();

        let attempts = 0;

        while (attempts < 24) {
            const currentMonthAndYear = (
                await this.currentMonthAndYear.textContent()
            ).trim();

            if (currentMonthAndYear === targetMonthAndYear) {
                break;
            }

            const currentDate = new Date(currentMonthAndYear);
            const targetDateObj = new Date(targetDate);
            const previousMonthAndYear = currentMonthAndYear;

            if (currentDate < targetDateObj) {
                await this.nextButton.click();
            } else {
                await this.previousButton.click();
            }

            await expect(this.currentMonthAndYear).not.toHaveText(previousMonthAndYear);
            attempts++;
        }

        if (attempts === 24) {
            throw new Error(`Unable to find ${targetMonthAndYear} in calendar`);
        }

        // Select the day after reaching the target month/year
        const dayLocator = this.calender
            .locator('div')
            .filter({ hasText: new RegExp(`^${targetDay}$`) })
            .first();

        await expect(dayLocator).toBeVisible();
        await dayLocator.click();
    }

    async verifyAvailableOperatorsForDateColumn() {
        const { columns, dateColumnOperators } = applyFiltersData.applyFilter;

        await this.verifyFunctionalityOfApplyFilterIcon();
        await this.selectColumnHeaderDropdown.click();
        await expect(this.selectColumnHeaderDropdownOptions).toBeVisible();
        await this.columnHeaders.filter({ hasText: columns.date }).first().click();
        await expect(this.selectColumnHeaderDropdown).toHaveValue(columns.date)
        await this.operatorDropdown.click();
        await expect(this.operatorDropdownOptions).toBeVisible();

        const actualOperators = (await this.operators.allTextContents())
            .map(operator => operator.trim())
            .filter(operator => operator !== '');

        expect(actualOperators).toEqual(dateColumnOperators);
    }

    async applyFilterForDateColumnWithIsOperator() {
        const { columns, operators } = applyFiltersData.applyFilter;

        const firstDateCellValue = await this.importerFrame.locator('#date-0').textContent();
        await this.verifyFunctionalityOfApplyFilterIcon();
        await this.selectColumnAndOperator(columns.date, operators.is);
        await this.selectDateField.click()

        await this.selectDate(firstDateCellValue);
        await this.applyButton.click();
        await expect(this.applyFilterPopup).toBeHidden();

        const filteredDateCellsCount = await this.importerFrame
            .getByTestId('spreadsheet-input')
            .locator(`[id^="date-"]`)
            .count();

        for (let i = 0; i < filteredDateCellsCount; i++) {
            const dateCellValue = await this.importerFrame.locator(`#date-${i}`).textContent();
            expect(dateCellValue).toContain(firstDateCellValue);
        }
    }

    async applyFilterForDateColumnWithIsNotOperator() {
        const { columns, operators } = applyFiltersData.applyFilter;

        const firstDateCellValue = await this.importerFrame.locator('#date-0').textContent();
        await this.verifyFunctionalityOfApplyFilterIcon();
        await this.selectColumnAndOperator(columns.date, operators.isNot);
        await this.selectDateField.click()

        await this.selectDate(firstDateCellValue);
        await this.applyButton.click();
        await expect(this.applyFilterPopup).toBeHidden();

        const filteredDateCellsCount = await this.importerFrame
            .getByTestId('spreadsheet-input')
            .locator(`[id^="date-"]`)
            .count();

        for (let i = 0; i < filteredDateCellsCount; i++) {
            const dateCellValue = await this.importerFrame.locator(`#date-${i}`).textContent();
            expect(dateCellValue).not.toContain(firstDateCellValue);
        }
    }

    async verifyAvailableOperatorsForTimeColumn() {
        const { columns, timeColumnOperators } = applyFiltersData.applyFilter;

        await this.verifyFunctionalityOfApplyFilterIcon();
        await this.selectColumnHeaderDropdown.click();
        await expect(this.selectColumnHeaderDropdownOptions).toBeVisible();
        await this.columnHeaders.filter({ hasText: columns.time }).last().click();
        await expect(this.selectColumnHeaderDropdown).toHaveValue(columns.time)
        await this.operatorDropdown.click();
        await expect(this.operatorDropdownOptions).toBeVisible();

        const actualOperators = (await this.operators.allTextContents())
            .map(operator => operator.trim())
            .filter(operator => operator !== '');

        expect(actualOperators).toEqual(timeColumnOperators);

    }

    async applyFilterForTimeColumnWithIsOperator() {
        const { columns, operators, timeCellIdPrefix } = applyFiltersData.applyFilter;

        const firstTimeCellValue = await this.importerFrame.locator('#time-0').textContent();
        await this.verifyFunctionalityOfApplyFilterIcon();
        await this.selecTimeColumnOperator(columns.time, operators.is);
        await this.valueField.fill(firstTimeCellValue);
        await expect(this.valueField).toHaveValue(firstTimeCellValue);

        await this.applyButton.click();
        await expect(this.applyFilterPopup).toBeHidden();

        const filteredTimeCellsCount = await this.importerFrame
            .getByTestId('spreadsheet-input')
            .locator(`[id^="time-"]`)
            .count();

        for (let i = 0; i < filteredTimeCellsCount; i++) {
            const timeCellValue = await this.importerFrame.locator(`#${timeCellIdPrefix}-${i}`).textContent();
            expect(timeCellValue).toContain(firstTimeCellValue);
        }
    }

    async applyFilterForTimeColumnWithIsNotOperator() {
        const { columns, operators, timeCellIdPrefix } = applyFiltersData.applyFilter;

        const firstTimeCellValue = await this.importerFrame.locator('#time-0').textContent();
        await this.verifyFunctionalityOfApplyFilterIcon();
        await this.selecTimeColumnOperator(columns.time, operators.isNot);
        await this.valueField.fill(firstTimeCellValue);
        await expect(this.valueField).toHaveValue(firstTimeCellValue);
        await this.applyButton.click();
        await expect(this.applyFilterPopup).toBeHidden();

        const filteredTimeCellsCount = await this.importerFrame
            .getByTestId('spreadsheet-input')
            .locator(`[id^="time-"]`)
            .count();

        for (let i = 0; i < filteredTimeCellsCount; i++) {
            const timeCellValue = await this.importerFrame.locator(`#${timeCellIdPrefix}-${i}`).textContent();
            expect(timeCellValue).not.toContain(firstTimeCellValue);
        }
    }

    async applyFilterForTimeColumnWithContainsOperator() {
        const { columns, operators, timeCellIdPrefix, timevalue } = applyFiltersData.applyFilter;

        await this.verifyFunctionalityOfApplyFilterIcon();
        await this.selecTimeColumnOperator(columns.time, operators.contains);
        await this.valueField.fill(timevalue);
        await expect(this.valueField).toHaveValue(timevalue);
        await this.applyButton.click();
        await expect(this.applyFilterPopup).toBeHidden();

        const filteredTimeCellsCount = await this.importerFrame
            .getByTestId('spreadsheet-input')
            .locator(`[id^="time-"]`)
            .count();

        for (let i = 0; i < filteredTimeCellsCount; i++) {
            const timeCellValue = await this.importerFrame.locator(`#${timeCellIdPrefix}-${i}`).textContent();
            expect(timeCellValue).toContain(timevalue);
        }
    }

    async applyFilterForTimeColumnWithDoesNotContainOperator() {
        const { columns, operators, timeCellIdPrefix, timevalue } = applyFiltersData.applyFilter;

        await this.verifyFunctionalityOfApplyFilterIcon();
        await this.selecTimeColumnOperator(columns.time, operators.doesNotContain);
        await this.valueField.fill(timevalue);
        await expect(this.valueField).toHaveValue(timevalue);
        await this.applyButton.click();
        await expect(this.applyFilterPopup).toBeHidden();

        const filteredTimeCellsCount = await this.importerFrame
            .getByTestId('spreadsheet-input')
            .locator(`[id^="time-"]`)
            .count();

        for (let i = 0; i < filteredTimeCellsCount; i++) {
            const timeCellValue = await this.importerFrame.locator(`#${timeCellIdPrefix}-${i}`).textContent();
            expect(timeCellValue).not.toContain(timevalue);
        }
    }

    async applyFilterForTimeColumnWithIsEmptyOperator() {
        const { columns, operators, values, timeCellIdPrefix } = applyFiltersData.applyFilter;

        await this.verifyFunctionalityOfApplyFilterIcon();
        await this.selecTimeColumnOperator(columns.time, operators.isEmpty);
        await this.applyButton.click();
        await expect(this.applyFilterPopup).toBeHidden();

        const filteredTimeCellsCount = await this.importerFrame
            .getByTestId('spreadsheet-input')
            .locator(`[id^="time-"]`)
            .count();

        for (let i = 0; i < filteredTimeCellsCount; i++) {
            const timeCellValue = await this.importerFrame.locator(`#${timeCellIdPrefix}-${i}`).textContent();
            expect(timeCellValue).toBe(values.empty)
        }
    }

    async applyFilterForTimeColumnWithIsNotEmptyOperator() {
        const { columns, operators, values, timeCellIdPrefix } = applyFiltersData.applyFilter;

        await this.verifyFunctionalityOfApplyFilterIcon();
        await this.selecTimeColumnOperator(columns.time, operators.isNotEmpty);
        await this.applyButton.click();
        await expect(this.applyFilterPopup).toBeHidden();

        const filteredTimeCellsCount = await this.importerFrame
            .getByTestId('spreadsheet-input')
            .locator(`[id^="time-"]`)
            .count();

        for (let i = 0; i < filteredTimeCellsCount; i++) {
            const timeCellValue = await this.importerFrame.locator(`#${timeCellIdPrefix}-${i}`).textContent();
            expect(timeCellValue).not.toBe(values.empty)
        }
    }    

     async verifyAvailableOperatorsForDropdownColumn() {
        const { columns, dropdownColumnOperators } = applyFiltersData.applyFilter;

        await this.verifyFunctionalityOfApplyFilterIcon();
        await this.selectColumnHeaderDropdown.click();
        await expect(this.selectColumnHeaderDropdownOptions).toBeVisible();
        await this.columnHeaders.filter({ hasText: columns.dropdown }).last().click();
        await expect(this.selectColumnHeaderDropdown).toHaveValue(columns.dropdown)
        await this.operatorDropdown.click();
        await expect(this.operatorDropdownOptions).toBeVisible();

        const actualOperators = (await this.operators.allTextContents())
            .map(operator => operator.trim())
            .filter(operator => operator !== '');

        expect(actualOperators).toEqual(dropdownColumnOperators);
     }

     async applyFilterForDropdownColumnWithIsOperator() {
        const { columns, operators, dropdownCellIdPrefix } = applyFiltersData.applyFilter;

        await this.verifyFunctionalityOfApplyFilterIcon();
        await this.selectColumnAndOperator(columns.dropdown, operators.is);
        await this.valueInput.click();
        await expect(this.valueInputOptions).toBeVisible();
        const firstDropdownOption = await this.valueInputOptionsItems.first().textContent();
        await this.valueInputOptionsItems.first().click();
        await expect(this.valueInput).toHaveValue(firstDropdownOption);
        await expect(this.valueInputOptions).toBeHidden();
        await this.applyButton.click();
        await expect(this.applyFilterPopup).toBeHidden();

        const filteredDropdownCellsCount = await this.importerFrame 
        .locator(`[value="${firstDropdownOption}"]`)
        .count();
       
        for (let i = 0; i < filteredDropdownCellsCount; i++) {
            const fillteredDropdownCell = await this.importerFrame.locator(`[value="${firstDropdownOption}"]`).nth(i)
            await expect(fillteredDropdownCell).toHaveValue(firstDropdownOption);
        }
    }

    async applyFilterForDropdownColumnWithIsNotOperator() {
        const { columns, operators, dropdownCellIdPrefix } = applyFiltersData.applyFilter;
        await this.verifyFunctionalityOfApplyFilterIcon();
        await this.selectColumnAndOperator(columns.dropdown, operators.isNot);
        await this.valueInput.click();
        await expect(this.valueInputOptions).toBeVisible();
        const firstDropdownOption = await this.valueInputOptionsItems.first().textContent();
        await this.valueInputOptionsItems.first().click();
        await expect(this.valueInput).toHaveValue(firstDropdownOption);
        await this.applyButton.click();
        await expect(this.applyFilterPopup).toBeHidden();

        const filteredDropdownCellsCount = await this.filteredDropdownCells.count();
    
        for (let i = 0; i < filteredDropdownCellsCount; i++) {
            const fillteredDropdownCell = await this.importerFrame.locator(`#${dropdownCellIdPrefix}-${i}`)
            await expect(fillteredDropdownCell).not.toHaveValue(firstDropdownOption);
        }
    }

    async applyFilterForDropdownColumnWithIsEmptyOperator() {
        const { columns, operators, values, dropdownCellIdPrefix } = applyFiltersData.applyFilter;
        await this.verifyFunctionalityOfApplyFilterIcon();
        await this.selectColumnAndOperator(columns.dropdown, operators.isEmpty);
        await this.applyButton.click();
        await expect(this.applyFilterPopup).toBeHidden();
        
        const filteredDropdownCellsCount = await this.filteredDropdownCells.count();
       
        for (let i = 0; i < filteredDropdownCellsCount; i++) {
            const fillteredDropdownCell = await this.importerFrame.locator(`#${dropdownCellIdPrefix}-${i}`)
            await expect(fillteredDropdownCell).toHaveValue(values.empty);
        }
    }

    async applyFilterForDropdownColumnWithIsNotEmptyOperator() {
        const { columns, operators, values, dropdownCellIdPrefix } = applyFiltersData.applyFilter;
        await this.verifyFunctionalityOfApplyFilterIcon();
        await this.selectColumnAndOperator(columns.dropdown, operators.isNotEmpty);
        await this.applyButton.click();
        await expect(this.applyFilterPopup).toBeHidden();
        
        const filteredDropdownCellsCount = await this.filteredDropdownCells.count();
       
        for (let i = 0; i < filteredDropdownCellsCount; i++) {
            const filteredDropdownCell = await this.importerFrame.locator(`#${dropdownCellIdPrefix}-${i}`)
            await expect(filteredDropdownCell).not.toHaveValue(values.empty);
        }
    }

    async verifyFunctionalityOfCrossIconInDropdownColumn(){
        await this.applyFilterForDropdownColumnWithIsNotEmptyOperator()

        const { dropdownCellIdPrefix , clearPrefix , values } = applyFiltersData.applyFilter;
        const dropdownCellsCount = await this.filteredDropdownCells.count();

        for (let i = 0; i < dropdownCellsCount; i++) {
            const dropdownCell = await this.importerFrame.locator(`#${dropdownCellIdPrefix}-${i}`)
            await expect(dropdownCell).not.toHaveValue(values.empty);
            const crossIconInDropdownCell = await this.importerFrame.locator(`#${dropdownCellIdPrefix}-${i}-${clearPrefix}`)
            await crossIconInDropdownCell.click();
            await expect(dropdownCell).toHaveValue(values.empty)
        }
    }

    async verifyFunctionalityOfChangeDropdownOption() {
        const { columns, operators, dropdownCellIdPrefix, values } = applyFiltersData.applyFilter;

        const dropdownCell = await this.importerFrame.locator(`#${dropdownCellIdPrefix}-0`)
        await expect(dropdownCell).toHaveValue(values.dropdownOptions[0]);
        await dropdownCell.click();
        await expect(this.valueInputOptions).toBeVisible();
        const dropdownOption = await this.valueInputOptionsItems.nth(1).textContent();
        await this.valueInputOptionsItems.nth(1).click();
        await expect(this.valueInputOptions).toBeHidden();
        await expect(dropdownCell).toHaveValue(dropdownOption);
    }

    async deletingAppliedFilter(){
        const { dropdownCellIdPrefix, values } = applyFiltersData.applyFilter;

        await this.applyFilterForDropdownColumnWithIsEmptyOperator()
        await this.verifyFunctionalityOfApplyFilterIcon();
        await expect(this.deleteFilterIcon).toBeVisible();
        await this.deleteFilterIcon.click();
        await expect(this.valueInput).toBeVisible();
        await expect(this.valueInput).toHaveValue(values.empty);
        await this.applyButton.click();
        await expect(this.applyFilterPopup).toBeHidden();

        for (let i = 0; i < 9; i++) {
            const dropdownCell = await this.importerFrame.locator(`#${dropdownCellIdPrefix}-${i}`)
            await expect(dropdownCell).not.toHaveValue(values.empty);
        }
    }
}



