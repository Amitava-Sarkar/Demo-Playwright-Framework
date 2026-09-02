import { expect } from '@playwright/test';
import applyFiltersData from '../TestData/applyFilters.json' with { type: 'json' };
import conditionFilterData from '../TestData/conditionFilter.json' with { type: 'json' };
import { ApplyFilters } from './applyFilters.js';
import {
    selectColumnOperatorAndFillValue,
    fillStringCells,
    clearDropdownCells,
    assertStringFilterResult,
    assertIntegerFilterResult,
    assertBooleanFilterResult,
    assertDropdownFilterResult,
    assertEmailFilterResult,
    assertTimeFilterResult,
    assertDateFilterResult,
    assertUrlFilterResult,
} from '../Utils/generalPlaywrightMethods.js';

export class ConditionGroup {
    constructor(page) {
        this.page = page;
        this.applyFiltersPage = new ApplyFilters(page);
        this.importerFrame = page.frameLocator('#fuse-importer-root');
        this.applyFilterIcon = this.importerFrame.getByTestId('field-value-filters');
        this.tooltipContent = this.importerFrame.getByTestId('tool-tip-content');
        this.applyFilterPopup = this.importerFrame.locator('.gSoUCp');
        this.applyFilterPopupTitle = this.importerFrame.locator('.fGbAyc')
        this.applyFilterPopupDescription = this.importerFrame.locator('.bOBbDD')
        this.conditionGroupSection = this.importerFrame.getByTestId('condition-group')
        this.addConditionButton = this.importerFrame.getByTestId('add-condition')
        this.filterCondition = this.importerFrame.getByTestId('filter-condition')
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
        this.valueInputOptions = this.importerFrame.locator('.kSIuag') // I have to use css class because the value input options are not having any test-id
        this.valueInputOptionsItems = this.importerFrame.locator('[data-test-id="autocomplete-menu-item"]')
        this.deleteConditionButton = this.importerFrame.getByTestId('delete-condition')
        this.deleteConditionGroupButton = this.importerFrame.getByText(conditionFilterData.labels.deleteConditionGroup)
        this.rows = this.importerFrame.getByTestId('rows')
        this.filteredBooleanCells = this.importerFrame.locator('.cgEFsj') // I have to use css class because the boolean cells are not having any test-id
        this.filteredDropdownCells = this.importerFrame.locator('.sc-cOajNj.cgEFsj') // I have to use css class because the dropdown cells are not having any test-id
        this.selectDateField = this.importerFrame.getByTestId('datetime-input')
        this.calender = this.importerFrame.getByTestId('date-picker-container')
        this.currentMonthAndYear = this.importerFrame.getByTestId('month-year-selector')
        this.nextButton = this.importerFrame.getByTestId('next-month-button')
        this.previousButton = this.importerFrame.getByTestId('prev-month-button')
    }

    async verifyFunctionalityOfAddConditionButton() {
        await this.applyFiltersPage.verifyFunctionalityOfApplyFilterIcon();
        await expect(this.filterCondition).toHaveCount(conditionFilterData.counts.initial);

        for (const expectedCount of conditionFilterData.counts.afterSuccessiveAdds) {
            await expect(this.addConditionButton).toBeVisible();
            await this.addConditionButton.click();
            await expect(this.filterCondition).toHaveCount(expectedCount);
        }
    }

    async verifyFunctionalityOfAddConditionGroupButton() {
        await this.applyFiltersPage.verifyFunctionalityOfApplyFilterIcon();
        await expect(this.conditionGroupSection).toHaveCount(conditionFilterData.counts.initial);

        for (const expectedCount of conditionFilterData.counts.afterSuccessiveAdds) {
            await expect(this.addConditionGroupButton).toBeVisible();
            await this.addConditionGroupButton.click();
            await expect(this.conditionGroupSection).toHaveCount(expectedCount);
        }
    }

    async deleteCondition() {
        await this.applyFiltersPage.verifyFunctionalityOfApplyFilterIcon();
        await expect(this.addConditionButton).toBeVisible();
        await this.addConditionButton.click();
        await expect(this.filterCondition).toHaveCount(conditionFilterData.counts.afterSingleAdd);
        await expect(this.deleteConditionButton.last()).toBeVisible();
        await this.deleteConditionButton.last().click();
        await expect(this.filterCondition).toHaveCount(conditionFilterData.counts.afterDelete);
    }

    async deleteConditionGroup() {
        await this.applyFiltersPage.verifyFunctionalityOfApplyFilterIcon();
        await expect(this.addConditionGroupButton).toBeVisible();
        await this.addConditionGroupButton.click();
        await expect(this.conditionGroupSection).toHaveCount(conditionFilterData.counts.afterSingleAdd);
        await expect(this.deleteConditionGroupButton).toBeVisible();
        await this.deleteConditionGroupButton.click();
        await expect(this.conditionGroupSection).toHaveCount(conditionFilterData.counts.afterDelete);
    }

    async applyingConditionFiltersForStringAndIntegerColumns() {
        const {
            columns,
            operators,
            values,
            stringCellIdPrefix,
            stringCellsToFill,
            integerFilterValues,
            integerCellIdPrefix,
            stringIntegerFilterCases,
        } = conditionFilterData.conditionFIlter;

        await fillStringCells(this, stringCellsToFill, values.testString);

        for (let caseIndex = 0; caseIndex < stringIntegerFilterCases.length; caseIndex++) {
            const filterCase = stringIntegerFilterCases[caseIndex];
            const stringOperator = operators[filterCase.string.operator];
            const integerOperator = operators[filterCase.integer.operator];
            const stringValue = filterCase.string.value ? values[filterCase.string.value] : '';
            const integerValue = integerFilterValues[filterCase.integer.valueKey];
            const skipColumn = caseIndex > 0;

            await this.applyFiltersPage.verifyFunctionalityOfApplyFilterIcon();
            await selectColumnOperatorAndFillValue(
                this,
                columns.string,
                stringOperator,
                stringValue,
                { skipColumn }
            );

            if (caseIndex === 0) {
                await this.addConditionButton.click();
                await expect(this.filterCondition.last()).toBeVisible();
            }

            await selectColumnOperatorAndFillValue(
                this,
                columns.integer,
                integerOperator,
                integerValue,
                { useLast: true, skipColumn }
            );
            await this.applyButton.click();

            await assertStringFilterResult(this, stringOperator, stringValue || values.testString, stringCellIdPrefix);
            await assertIntegerFilterResult(this, integerOperator, integerValue, integerCellIdPrefix);
        }
    }

    async applyingConditionFiltersForStringAndBooleanColumns() {
        const {
            columns,
            operators,
            values,
            stringCellIdPrefix,
            stringCellsToFill,
            booleanCellIdPrefix,
            stringBooleanFilterCases,
        } = conditionFilterData.conditionFIlter;

        await fillStringCells(this, stringCellsToFill, values.testString);

        for (let caseIndex = 0; caseIndex < stringBooleanFilterCases.length; caseIndex++) {
            const filterCase = stringBooleanFilterCases[caseIndex];
            const stringOperator = operators[filterCase.string.operator];
            const booleanOperator = operators[filterCase.boolean.operator];
            const stringValue = filterCase.string.value ? values[filterCase.string.value] : '';
            const booleanValue = values[filterCase.boolean.value];
            const skipColumn = caseIndex > 0;

            await this.applyFiltersPage.verifyFunctionalityOfApplyFilterIcon();
            await selectColumnOperatorAndFillValue(
                this,
                columns.string,
                stringOperator,
                stringValue,
                { skipColumn }
            );

            if (caseIndex === 0) {
                await this.addConditionButton.click();
                await expect(this.filterCondition.last()).toBeVisible();
            }

            await selectColumnOperatorAndFillValue(
                this,
                columns.boolean,
                booleanOperator,
                booleanValue,
                { useLast: true, skipColumn }
            );
            await this.applyButton.click();

            await assertStringFilterResult(this, stringOperator, stringValue || values.testString, stringCellIdPrefix);
            await assertBooleanFilterResult(this, booleanOperator, booleanValue, booleanCellIdPrefix);
        }
    }

    async applyingConditionFiltersForStringAndDropdownColumns() {
        const {
            columns,
            operators,
            values,
            stringCellIdPrefix,
            stringCellsToFillForDropdown,
            dropdownCellIdPrefix,
            stringDropdownFilterCases,
        } = conditionFilterData.conditionFIlter;

        await fillStringCells(this, stringCellsToFillForDropdown, values.testString, { step: 2 });
        await clearDropdownCells(this);

        let isFirstApplication = true;

        for (const filterCase of stringDropdownFilterCases) {
            const stringOperator = operators[filterCase.string.operator];
            const dropdownOperator = operators[filterCase.dropdown.operator];
            const stringValue = filterCase.string.value ? values[filterCase.string.value] : '';
            const dropdownValues = filterCase.dropdown.iterateOptions
                ? values.dropdownOptions
                : [''];

            for (const dropdownValue of dropdownValues) {
                const skipColumn = !isFirstApplication;

                await this.applyFiltersPage.verifyFunctionalityOfApplyFilterIcon();
                await selectColumnOperatorAndFillValue(
                    this,
                    columns.string,
                    stringOperator,
                    stringValue,
                    { skipColumn }
                );

                if (isFirstApplication) {
                    await this.addConditionButton.click();
                    await expect(this.filterCondition.last()).toBeVisible();
                }

                await selectColumnOperatorAndFillValue(
                    this,
                    columns.dropdown,
                    dropdownOperator,
                    dropdownValue,
                    { useLast: true, skipColumn }
                );
                await this.applyButton.click();

                await assertStringFilterResult(this, stringOperator, stringValue || values.testString, stringCellIdPrefix);
                await assertDropdownFilterResult(this, dropdownOperator, dropdownValue, dropdownCellIdPrefix);

                isFirstApplication = false;
            }
        }
    }

    async applyingConditionFiltersForStringAndEmailColumns() {
        const {
            columns,
            operators,
            values,
            stringCellIdPrefix,
            stringCellsToFill,
            emailCellIdPrefix,
            firstEmailCellIndex,
            stringEmailFilterCases,
        } = conditionFilterData.conditionFIlter;

        await fillStringCells(this, stringCellsToFill, values.testString);

        const firstEmailCellValue = await this.importerFrame
            .locator(`#${emailCellIdPrefix}-${firstEmailCellIndex}`)
            .textContent();

        for (let caseIndex = 0; caseIndex < stringEmailFilterCases.length; caseIndex++) {
            const filterCase = stringEmailFilterCases[caseIndex];
            const stringOperator = operators[filterCase.string.operator];
            const emailOperator = operators[filterCase.email.operator];
            const stringValue = filterCase.string.value ? values[filterCase.string.value] : '';
            const emailValue = filterCase.email.useFirstCellValue ? firstEmailCellValue : '';
            const skipColumn = caseIndex > 0;

            await this.applyFiltersPage.verifyFunctionalityOfApplyFilterIcon();
            await selectColumnOperatorAndFillValue(
                this,
                columns.string,
                stringOperator,
                stringValue,
                { skipColumn }
            );

            if (caseIndex === 0) {
                await this.addConditionButton.click();
                await expect(this.filterCondition.last()).toBeVisible();
            }

            await selectColumnOperatorAndFillValue(
                this,
                columns.email,
                emailOperator,
                emailValue,
                { useLast: true, skipColumn }
            );
            await this.applyButton.click();

            await assertStringFilterResult(this, stringOperator, stringValue || values.testString, stringCellIdPrefix);
            await assertEmailFilterResult(this, emailOperator, emailValue, emailCellIdPrefix);
        }
    }

    async applyingConditionFiltersForStringAndTimeColumns() {
        const {
            columns,
            operators,
            values,
            stringCellIdPrefix,
            stringCellsToFill,
            timeCellIdPrefix,
            firstTimeCellIndex,
            timeValue,
            stringTimeFilterCases,
        } = conditionFilterData.conditionFIlter;

        await fillStringCells(this, stringCellsToFill, values.testString);

        const firstTimeCellValue = await this.importerFrame
            .locator(`#${timeCellIdPrefix}-${firstTimeCellIndex}`)
            .textContent();

        for (let caseIndex = 0; caseIndex < stringTimeFilterCases.length; caseIndex++) {
            const filterCase = stringTimeFilterCases[caseIndex];
            const stringOperator = operators[filterCase.string.operator];
            const timeOperator = operators[filterCase.time.operator];
            const stringValue = filterCase.string.value ? values[filterCase.string.value] : '';
            let filterTimeValue = '';

            if (filterCase.time.useFirstCellValue) {
                filterTimeValue = firstTimeCellValue;
            } else if (filterCase.time.useTimeValue) {
                filterTimeValue = timeValue;
            }

            const skipColumn = caseIndex > 0;

            await this.applyFiltersPage.verifyFunctionalityOfApplyFilterIcon();
            await selectColumnOperatorAndFillValue(
                this,
                columns.string,
                stringOperator,
                stringValue,
                { skipColumn }
            );

            if (caseIndex === 0) {
                await this.addConditionButton.click();
                await expect(this.filterCondition.last()).toBeVisible();
            }

            await selectColumnOperatorAndFillValue(
                this,
                columns.time,
                timeOperator,
                filterTimeValue,
                { useLast: true, skipColumn }
            );
            await this.applyButton.click();

            await assertStringFilterResult(this, stringOperator, stringValue || values.testString, stringCellIdPrefix);
            await assertTimeFilterResult(this, timeOperator, filterTimeValue, timeCellIdPrefix);
        }
    }

    async applyingConditionFiltersForIntegerAndBooleanColumns() {
        const {
            columns,
            operators,
            values,
            integerFilterValues,
            integerCellIdPrefix,
            booleanCellIdPrefix,
            integerBooleanFilterCases,
        } = conditionFilterData.conditionFIlter;

        for (let caseIndex = 0; caseIndex < integerBooleanFilterCases.length; caseIndex++) {
            const filterCase = integerBooleanFilterCases[caseIndex];
            const integerOperator = operators[filterCase.integer.operator];
            const booleanOperator = operators[filterCase.boolean.operator];
            const integerValue = integerFilterValues[filterCase.integer.valueKey];
            const booleanValue = filterCase.boolean.value ? values[filterCase.boolean.value] : '';
            const skipColumn = caseIndex > 0;

            await this.applyFiltersPage.verifyFunctionalityOfApplyFilterIcon();
            await selectColumnOperatorAndFillValue(
                this,
                columns.integer,
                integerOperator,
                integerValue,
                { skipColumn }
            );

            if (caseIndex === 0) {
                await this.addConditionButton.click();
                await expect(this.filterCondition.last()).toBeVisible();
            }

            await selectColumnOperatorAndFillValue(
                this,
                columns.boolean,
                booleanOperator,
                booleanValue,
                { useLast: true, skipColumn }
            );
            await this.applyButton.click();

            await assertIntegerFilterResult(this, integerOperator, integerValue, integerCellIdPrefix);
            await assertBooleanFilterResult(this, booleanOperator, booleanValue, booleanCellIdPrefix);
        }
    }

    async applyingConditionFiltersForIntegerAndEmailColumns() {
        const {
            columns,
            operators,
            integerFilterValues,
            integerCellIdPrefix,
            emailCellIdPrefix,
            firstEmailCellIndex,
            integerEmailFilterCases,
        } = conditionFilterData.conditionFIlter;

        const firstEmailCellValue = await this.importerFrame
            .locator(`#${emailCellIdPrefix}-${firstEmailCellIndex}`)
            .textContent();

        for (let caseIndex = 0; caseIndex < integerEmailFilterCases.length; caseIndex++) {
            const filterCase = integerEmailFilterCases[caseIndex];
            const integerOperator = operators[filterCase.integer.operator];
            const emailOperator = operators[filterCase.email.operator];
            const integerValue = integerFilterValues[filterCase.integer.valueKey];
            const emailValue = filterCase.email.useFirstCellValue ? firstEmailCellValue : '';
            const skipColumn = caseIndex > 0;

            await this.applyFiltersPage.verifyFunctionalityOfApplyFilterIcon();
            await selectColumnOperatorAndFillValue(
                this,
                columns.integer,
                integerOperator,
                integerValue,
                { skipColumn }
            );

            if (caseIndex === 0) {
                await this.addConditionButton.click();
                await expect(this.filterCondition.last()).toBeVisible();
            }

            await selectColumnOperatorAndFillValue(
                this,
                columns.email,
                emailOperator,
                emailValue,
                { useLast: true, skipColumn }
            );
            await this.applyButton.click();

            await assertIntegerFilterResult(this, integerOperator, integerValue, integerCellIdPrefix);
            await assertEmailFilterResult(this, emailOperator, emailValue, emailCellIdPrefix);
        }
    }

    async applyingConditionFiltersForIntegerAndDropdownColumns() {
        const {
            columns,
            operators,
            values,
            integerFilterValues,
            integerCellIdPrefix,
            dropdownCellIdPrefix,
            integerDropdownFilterCases,
        } = conditionFilterData.conditionFIlter;

        await clearDropdownCells(this);

        let isFirstApplication = true;

        for (const filterCase of integerDropdownFilterCases) {
            const integerOperator = operators[filterCase.integer.operator];
            const dropdownOperator = operators[filterCase.dropdown.operator];
            const integerValue = integerFilterValues[filterCase.integer.valueKey];
            const dropdownValues = filterCase.dropdown.iterateOptions
                ? values.dropdownOptions
                : [''];

            for (const dropdownValue of dropdownValues) {
                const skipColumn = !isFirstApplication;

                await this.applyFiltersPage.verifyFunctionalityOfApplyFilterIcon();
                await selectColumnOperatorAndFillValue(
                    this,
                    columns.integer,
                    integerOperator,
                    integerValue,
                    { skipColumn }
                );

                if (isFirstApplication) {
                    await this.addConditionButton.click();
                    await expect(this.filterCondition.last()).toBeVisible();
                }

                await selectColumnOperatorAndFillValue(
                    this,
                    columns.dropdown,
                    dropdownOperator,
                    dropdownValue,
                    { useLast: true, skipColumn }
                );
                await this.applyButton.click();

                await assertIntegerFilterResult(this, integerOperator, integerValue, integerCellIdPrefix);
                await assertDropdownFilterResult(this, dropdownOperator, dropdownValue, dropdownCellIdPrefix);

                isFirstApplication = false;
            }
        }
    }

    async applyingConditionFiltersForIntegerAndTimeColumns() {
        const {
            columns,
            operators,
            integerFilterValues,
            integerCellIdPrefix,
            timeCellIdPrefix,
            firstTimeCellIndex,
            timeValue,
            integerTimeFilterCases,
        } = conditionFilterData.conditionFIlter;

        const firstTimeCellValue = await this.importerFrame
            .locator(`#${timeCellIdPrefix}-${firstTimeCellIndex}`)
            .textContent();

        for (let caseIndex = 0; caseIndex < integerTimeFilterCases.length; caseIndex++) {
            const filterCase = integerTimeFilterCases[caseIndex];
            const integerOperator = operators[filterCase.integer.operator];
            const timeOperator = operators[filterCase.time.operator];
            const integerValue = integerFilterValues[filterCase.integer.valueKey];
            let filterTimeValue = '';

            if (filterCase.time.useFirstCellValue) {
                filterTimeValue = firstTimeCellValue;
            } else if (filterCase.time.useTimeValue) {
                filterTimeValue = timeValue;
            }

            const skipColumn = caseIndex > 0;

            await this.applyFiltersPage.verifyFunctionalityOfApplyFilterIcon();
            await selectColumnOperatorAndFillValue(
                this,
                columns.integer,
                integerOperator,
                integerValue,
                { skipColumn }
            );

            if (caseIndex === 0) {
                await this.addConditionButton.click();
                await expect(this.filterCondition.last()).toBeVisible();
            }

            await selectColumnOperatorAndFillValue(
                this,
                columns.time,
                timeOperator,
                filterTimeValue,
                { useLast: true, skipColumn }
            );
            await this.applyButton.click();

            await assertIntegerFilterResult(this, integerOperator, integerValue, integerCellIdPrefix);
            await assertTimeFilterResult(this, timeOperator, filterTimeValue, timeCellIdPrefix);
        }
    }

    async applyingConditionFiltersForBooleanAndDropdownColumns() {
        const {
            columns,
            operators,
            values,
            booleanCellIdPrefix,
            dropdownCellIdPrefix,
            booleanDropdownFilterCases,
        } = conditionFilterData.conditionFIlter;

        await clearDropdownCells(this);

        let isFirstApplication = true;

        for (const filterCase of booleanDropdownFilterCases) {
            const booleanOperator = operators[filterCase.boolean.operator];
            const dropdownOperator = operators[filterCase.dropdown.operator];
            const booleanValue = filterCase.boolean.value ? values[filterCase.boolean.value] : '';
            const dropdownValues = filterCase.dropdown.iterateOptions
                ? values.dropdownOptions
                : [''];

            for (const dropdownValue of dropdownValues) {
                const skipColumn = !isFirstApplication;

                await this.applyFiltersPage.verifyFunctionalityOfApplyFilterIcon();
                await selectColumnOperatorAndFillValue(
                    this,
                    columns.boolean,
                    booleanOperator,
                    booleanValue,
                    { skipColumn }
                );

                if (isFirstApplication) {
                    await this.addConditionButton.click();
                    await expect(this.filterCondition.last()).toBeVisible();
                }

                await selectColumnOperatorAndFillValue(
                    this,
                    columns.dropdown,
                    dropdownOperator,
                    dropdownValue,
                    { useLast: true, skipColumn }
                );
                await this.applyButton.click();

                await assertBooleanFilterResult(this, booleanOperator, booleanValue, booleanCellIdPrefix);
                await assertDropdownFilterResult(this, dropdownOperator, dropdownValue, dropdownCellIdPrefix);

                isFirstApplication = false;
            }
        }
    }

    async applyingConditionFiltersForBooleanAndEmailColumns() {
        const {
            columns,
            operators,
            values,
            booleanCellIdPrefix,
            emailCellIdPrefix,
            firstEmailCellIndex,
            booleanEmailFilterCases,
        } = conditionFilterData.conditionFIlter;

        const firstEmailCellValue = await this.importerFrame
            .locator(`#${emailCellIdPrefix}-${firstEmailCellIndex}`)
            .textContent();

        for (let caseIndex = 0; caseIndex < booleanEmailFilterCases.length; caseIndex++) {
            const filterCase = booleanEmailFilterCases[caseIndex];
            const booleanOperator = operators[filterCase.boolean.operator];
            const emailOperator = operators[filterCase.email.operator];
            const booleanValue = filterCase.boolean.value ? values[filterCase.boolean.value] : '';
            const emailValue = filterCase.email.useFirstCellValue ? firstEmailCellValue : '';
            const skipColumn = caseIndex > 0;

            await this.applyFiltersPage.verifyFunctionalityOfApplyFilterIcon();
            await selectColumnOperatorAndFillValue(
                this,
                columns.boolean,
                booleanOperator,
                booleanValue,
                { skipColumn }
            );

            if (caseIndex === 0) {
                await this.addConditionButton.click();
                await expect(this.filterCondition.last()).toBeVisible();
            }

            await selectColumnOperatorAndFillValue(
                this,
                columns.email,
                emailOperator,
                emailValue,
                { useLast: true, skipColumn }
            );
            await this.applyButton.click();

            await assertBooleanFilterResult(this, booleanOperator, booleanValue, booleanCellIdPrefix);
            await assertEmailFilterResult(this, emailOperator, emailValue, emailCellIdPrefix);
        }
    }

    async applyingConditionFiltersForBooleanAndDateColumns() {
        const {
            columns,
            operators,
            values,
            booleanCellIdPrefix,
            dateCellIdPrefix,
            firstDateCellIndex,
            booleanDateFilterCases,
        } = conditionFilterData.conditionFIlter;

        const firstDateCellValue = await this.importerFrame
            .locator(`#${dateCellIdPrefix}-${firstDateCellIndex}`)
            .textContent();

        for (let caseIndex = 0; caseIndex < booleanDateFilterCases.length; caseIndex++) {
            const filterCase = booleanDateFilterCases[caseIndex];
            const booleanOperator = operators[filterCase.boolean.operator];
            const dateOperator = operators[filterCase.date.operator];
            const booleanValue = filterCase.boolean.value ? values[filterCase.boolean.value] : '';
            const dateValue = filterCase.date.useFirstCellValue ? firstDateCellValue : '';
            const skipColumn = caseIndex > 0;

            await this.applyFiltersPage.verifyFunctionalityOfApplyFilterIcon();
            await selectColumnOperatorAndFillValue(
                this,
                columns.boolean,
                booleanOperator,
                booleanValue,
                { skipColumn }
            );

            if (caseIndex === 0) {
                await this.addConditionButton.click();
                await expect(this.filterCondition.last()).toBeVisible();
            }

            await selectColumnOperatorAndFillValue(
                this,
                columns.date,
                dateOperator,
                dateValue,
                { useLast: true, skipColumn }
            );
            await this.applyButton.click();

            await assertBooleanFilterResult(this, booleanOperator, booleanValue, booleanCellIdPrefix);
            await assertDateFilterResult(this, dateOperator, dateValue, dateCellIdPrefix);
        }
    }

    async applyingConditionFiltersForBooleanAndTimeColumns() {
        const {
            columns,
            operators,
            values,
            booleanCellIdPrefix,
            timeCellIdPrefix,
            firstTimeCellIndex,
            timeValue,
            booleanTimeFilterCases,
        } = conditionFilterData.conditionFIlter;

        const firstTimeCellValue = await this.importerFrame
            .locator(`#${timeCellIdPrefix}-${firstTimeCellIndex}`)
            .textContent();

        for (let caseIndex = 0; caseIndex < booleanTimeFilterCases.length; caseIndex++) {
            const filterCase = booleanTimeFilterCases[caseIndex];
            const booleanOperator = operators[filterCase.boolean.operator];
            const timeOperator = operators[filterCase.time.operator];
            const booleanValue = filterCase.boolean.value ? values[filterCase.boolean.value] : '';
            let filterTimeValue = '';

            if (filterCase.time.useFirstCellValue) {
                filterTimeValue = firstTimeCellValue;
            } else if (filterCase.time.useTimeValue) {
                filterTimeValue = timeValue;
            }

            const skipColumn = caseIndex > 0;

            await this.applyFiltersPage.verifyFunctionalityOfApplyFilterIcon();
            await selectColumnOperatorAndFillValue(
                this,
                columns.boolean,
                booleanOperator,
                booleanValue,
                { skipColumn }
            );

            if (caseIndex === 0) {
                await this.addConditionButton.click();
                await expect(this.filterCondition.last()).toBeVisible();
            }

            await selectColumnOperatorAndFillValue(
                this,
                columns.time,
                timeOperator,
                filterTimeValue,
                { useLast: true, skipColumn }
            );
            await this.applyButton.click();

            await assertBooleanFilterResult(this, booleanOperator, booleanValue, booleanCellIdPrefix);
            await assertTimeFilterResult(this, timeOperator, filterTimeValue, timeCellIdPrefix);
        }
    }

    async applyingConditionFiltersForStringAndUrlColumns() {
        const {
            columns,
            operators,
            values,
            stringCellIdPrefix,
            stringCellsToFill,
            urlCellIdPrefix,
            firstUrlCellIndex,
            stringUrlFilterCases,
        } = conditionFilterData.conditionFIlter;

        await fillStringCells(this, stringCellsToFill, values.testString);

        const firstUrlCellValue = await this.importerFrame
            .locator(`#${urlCellIdPrefix}-${firstUrlCellIndex}`)
            .textContent();

        for (let caseIndex = 0; caseIndex < stringUrlFilterCases.length; caseIndex++) {
            const filterCase = stringUrlFilterCases[caseIndex];
            const stringOperator = operators[filterCase.string.operator];
            const urlOperator = operators[filterCase.url.operator];
            const stringValue = filterCase.string.value ? values[filterCase.string.value] : '';
            const urlValue = filterCase.url.useFirstCellValue ? firstUrlCellValue : '';
            const skipColumn = caseIndex > 0;

            await this.applyFiltersPage.verifyFunctionalityOfApplyFilterIcon();
            await selectColumnOperatorAndFillValue(
                this,
                columns.string,
                stringOperator,
                stringValue,
                { skipColumn }
            );

            if (caseIndex === 0) {
                await this.addConditionButton.click();
                await expect(this.filterCondition.last()).toBeVisible();
            }

            await selectColumnOperatorAndFillValue(
                this,
                columns.url,
                urlOperator,
                urlValue,
                { useLast: true, skipColumn }
            );
            await this.applyButton.click();

            await assertStringFilterResult(this, stringOperator, stringValue || values.testString, stringCellIdPrefix);
            await assertUrlFilterResult(this, urlOperator, urlValue, urlCellIdPrefix);
        }
    }

    async applyingConditionFiltersForIntegerAndUrlColumns() {
        const {
            columns,
            operators,
            integerFilterValues,
            integerCellIdPrefix,
            urlCellIdPrefix,
            firstUrlCellIndex,
            integerUrlFilterCases,
        } = conditionFilterData.conditionFIlter;

        const firstUrlCellValue = await this.importerFrame
            .locator(`#${urlCellIdPrefix}-${firstUrlCellIndex}`)
            .textContent();

        for (let caseIndex = 0; caseIndex < integerUrlFilterCases.length; caseIndex++) {
            const filterCase = integerUrlFilterCases[caseIndex];
            const integerOperator = operators[filterCase.integer.operator];
            const urlOperator = operators[filterCase.url.operator];
            const integerValue = integerFilterValues[filterCase.integer.valueKey];
            const urlValue = filterCase.url.useFirstCellValue ? firstUrlCellValue : '';
            const skipColumn = caseIndex > 0;

            await this.applyFiltersPage.verifyFunctionalityOfApplyFilterIcon();
            await selectColumnOperatorAndFillValue(
                this,
                columns.integer,
                integerOperator,
                integerValue,
                { skipColumn }
            );

            if (caseIndex === 0) {
                await this.addConditionButton.click();
                await expect(this.filterCondition.last()).toBeVisible();
            }

            await selectColumnOperatorAndFillValue(
                this,
                columns.url,
                urlOperator,
                urlValue,
                { useLast: true, skipColumn }
            );
            await this.applyButton.click();

            await assertIntegerFilterResult(this, integerOperator, integerValue, integerCellIdPrefix);
            await assertUrlFilterResult(this, urlOperator, urlValue, urlCellIdPrefix);
        }
    }

    async applyingConditionFiltersForBooleanAndUrlColumns() {
        const {
            columns,
            operators,
            values,
            booleanCellIdPrefix,
            urlCellIdPrefix,
            firstUrlCellIndex,
            booleanUrlFilterCases,
        } = conditionFilterData.conditionFIlter;

        const firstUrlCellValue = await this.importerFrame
            .locator(`#${urlCellIdPrefix}-${firstUrlCellIndex}`)
            .textContent();

        for (let caseIndex = 0; caseIndex < booleanUrlFilterCases.length; caseIndex++) {
            const filterCase = booleanUrlFilterCases[caseIndex];
            const booleanOperator = operators[filterCase.boolean.operator];
            const urlOperator = operators[filterCase.url.operator];
            const booleanValue = filterCase.boolean.value ? values[filterCase.boolean.value] : '';
            const urlValue = filterCase.url.useFirstCellValue ? firstUrlCellValue : '';
            const skipColumn = caseIndex > 0;

            await this.applyFiltersPage.verifyFunctionalityOfApplyFilterIcon();
            await selectColumnOperatorAndFillValue(
                this,
                columns.boolean,
                booleanOperator,
                booleanValue,
                { skipColumn }
            );

            if (caseIndex === 0) {
                await this.addConditionButton.click();
                await expect(this.filterCondition.last()).toBeVisible();
            }

            await selectColumnOperatorAndFillValue(
                this,
                columns.url,
                urlOperator,
                urlValue,
                { useLast: true, skipColumn }
            );
            await this.applyButton.click();

            await assertBooleanFilterResult(this, booleanOperator, booleanValue, booleanCellIdPrefix);
            await assertUrlFilterResult(this, urlOperator, urlValue, urlCellIdPrefix);
        }
    }

    async applyingConditionFiltersForUrlAndDropdownColumns() {
        const {
            columns,
            operators,
            values,
            urlCellIdPrefix,
            firstUrlCellIndex,
            dropdownCellIdPrefix,
            urlDropdownFilterCases,
        } = conditionFilterData.conditionFIlter;

        await clearDropdownCells(this);

        const firstUrlCellValue = await this.importerFrame
            .locator(`#${urlCellIdPrefix}-${firstUrlCellIndex}`)
            .textContent();

        let isFirstApplication = true;

        for (const filterCase of urlDropdownFilterCases) {
            const urlOperator = operators[filterCase.url.operator];
            const dropdownOperator = operators[filterCase.dropdown.operator];
            const urlValue = filterCase.url.useFirstCellValue ? firstUrlCellValue : '';
            const dropdownValues = filterCase.dropdown.iterateOptions
                ? values.dropdownOptions
                : [''];

            for (const dropdownValue of dropdownValues) {
                const skipColumn = !isFirstApplication;

                await this.applyFiltersPage.verifyFunctionalityOfApplyFilterIcon();
                await selectColumnOperatorAndFillValue(
                    this,
                    columns.url,
                    urlOperator,
                    urlValue,
                    { skipColumn }
                );

                if (isFirstApplication) {
                    await this.addConditionButton.click();
                    await expect(this.filterCondition.last()).toBeVisible();
                }

                await selectColumnOperatorAndFillValue(
                    this,
                    columns.dropdown,
                    dropdownOperator,
                    dropdownValue,
                    { useLast: true, skipColumn }
                );
                await this.applyButton.click();

                await assertUrlFilterResult(this, urlOperator, urlValue, urlCellIdPrefix);
                await assertDropdownFilterResult(this, dropdownOperator, dropdownValue, dropdownCellIdPrefix);

                isFirstApplication = false;
            }
        }
    }

    async applyingConditionFiltersForUrlAndTimeColumns() {
        const {
            columns,
            operators,
            urlCellIdPrefix,
            firstUrlCellIndex,
            timeCellIdPrefix,
            firstTimeCellIndex,
            timeValue,
            urlTimeFilterCases,
        } = conditionFilterData.conditionFIlter;

        const firstUrlCellValue = await this.importerFrame
            .locator(`#${urlCellIdPrefix}-${firstUrlCellIndex}`)
            .textContent();

        const firstTimeCellValue = await this.importerFrame
            .locator(`#${timeCellIdPrefix}-${firstTimeCellIndex}`)
            .textContent();

        for (let caseIndex = 0; caseIndex < urlTimeFilterCases.length; caseIndex++) {
            const filterCase = urlTimeFilterCases[caseIndex];
            const urlOperator = operators[filterCase.url.operator];
            const timeOperator = operators[filterCase.time.operator];
            const urlValue = filterCase.url.useFirstCellValue ? firstUrlCellValue : '';
            let filterTimeValue = '';

            if (filterCase.time.useFirstCellValue) {
                filterTimeValue = firstTimeCellValue;
            } else if (filterCase.time.useTimeValue) {
                filterTimeValue = timeValue;
            }

            const skipColumn = caseIndex > 0;

            await this.applyFiltersPage.verifyFunctionalityOfApplyFilterIcon();
            await selectColumnOperatorAndFillValue(
                this,
                columns.url,
                urlOperator,
                urlValue,
                { skipColumn }
            );

            if (caseIndex === 0) {
                await this.addConditionButton.click();
                await expect(this.filterCondition.last()).toBeVisible();
            }

            await selectColumnOperatorAndFillValue(
                this,
                columns.time,
                timeOperator,
                filterTimeValue,
                { useLast: true, skipColumn }
            );
            await this.applyButton.click();

            await assertUrlFilterResult(this, urlOperator, urlValue, urlCellIdPrefix);
            await assertTimeFilterResult(this, timeOperator, filterTimeValue, timeCellIdPrefix);
        }
    }
}
