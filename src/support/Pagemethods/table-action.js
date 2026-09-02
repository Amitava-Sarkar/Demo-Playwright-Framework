import { expect } from '@playwright/test';
import importerData from '../TestData/importer.json' with { type: 'json' };
import tableActionData from '../TestData/table-action.json' with { type: 'json' };
import { visibilityOfElement } from '../Utils/generalPlaywrightMethods';

export class TableAction {
    constructor(page) {
        this.page = page;
        this.openImporter = page.getByTestId('template-name')
        this.importerName = page.getByTestId('template-name-input')
        this.importFileButton = page.getByRole('button', { name: tableActionData.uploadFiles.importFileButton })

        this.importerFrame = page.frameLocator('#fuse-importer-root');

        this.fileInput = this.importerFrame.locator('input[type="file"]');
        this.selectHeaderTitle = this.importerFrame.getByTestId('select-header-title');
        this.selectHeaderDescription = this.importerFrame.getByTestId('select-header-description');
        this.dataTable = this.importerFrame.locator('[data-test-id="table-view-wrapper"]');
        this.continueButton = this.importerFrame.getByTestId('continue-button');
        this.matchTitle = this.importerFrame.getByTestId('match-title');
        this.matchDescription = this.importerFrame.getByTestId('match-description');
        this.reviewPageHeaderText = this.importerFrame.getByTestId('review-submit');
        this.deleteRowButton = this.importerFrame.locator('[data-testid="ta-delete-rows"]');
        this.tooltipContent = this.importerFrame.getByTestId('tool-tip-content');
        this.allRowFilter = this.importerFrame.locator('[data-test-id="all_rows_filter"]');
        this.deleteSelectedRowPopup = this.importerFrame.getByText(tableActionData.deleteRow.deleteSelectedRowPopup);
        this.yesDeleteButtonUnderDeletePopup = this.importerFrame.getByRole('button', { name: tableActionData.deleteRow.yesDeleteButton });
        this.rowsDeletedStatusMessage = this.importerFrame.locator('[role="status"]');
        this.allCheckBoxToDeleteRow = this.importerFrame.locator('[data-test-id="checkbox"]');
        this.rows = this.importerFrame.locator('[data-cy="rows"]');
        this.cancelButton = this.importerFrame.getByRole('button', { name: tableActionData.deleteRow.cancelButton });
        this.crossIcon = this.importerFrame.getByTestId('close-icon');
        this.searchIcon = this.importerFrame.locator('[data-testid="ta-search-rows"]');
        this.searchInput = this.importerFrame.locator('[data-testid="ta-search-rows-input"]');
        this.findAndReplaceIcon = this.importerFrame.getByTestId('open-find-replace');
        this.findAndReplacePopup = this.importerFrame.locator('.cwCXtx');
        this.findAndReplacePopupTitle = this.importerFrame.getByTestId('find-replace-title');
        this.findAndReplacePopupDescription = this.importerFrame.getByTestId('find-replace-description');
        this.findInput = this.importerFrame.getByTestId('find-input');
        this.replaceInput = this.importerFrame.getByTestId('replace-input');
        this.useRegexCheckbox = this.importerFrame.getByTestId('use-regex');
        this.useCaseSensitiveCheckbox = this.importerFrame.getByTestId('case-sensitive');
        this.findAndReplaceButton = this.importerFrame.getByTestId('find-replace-submit');
        this.textNotFoundErrorMessage = this.importerFrame.getByText(tableActionData.findAndReplacePopup.textNotFoundErrorMessage);
        this.replacedValidationMessage = this.importerFrame.locator('[role="status"]');
        this.invalidFilter = this.importerFrame.locator('[data-test-id="invalid_filter"]');
        this.duplicateFilter = this.importerFrame.locator('[data-test-id="duplicates_filter"]');
        this.findByErrorFilter = this.importerFrame.locator('[data-testid="ta-filter-by-errors"]');
        this.fieldValueFilter = this.importerFrame.getByTestId('field-value-filters');
        this.exportDataIcon = this.importerFrame.locator('[data-testid="ta-export-data"]');
        this.optionDropdown = this.importerFrame.locator('.kSIuag');
        this.integerErrorValidation = this.importerFrame.getByText(tableActionData.filterByErrors.integerErrorValidation);
        this.urlErrorValidation = this.importerFrame.getByText(tableActionData.filterByErrors.urlErrorValidation);
        this.filterByErrorsOptions = this.importerFrame.locator('[data-test-id="autocomplete-menu-item"]');
        
    }

    async navigateToReviewPage() {
        await this.page.goto('/');
        await expect(this.openImporter.filter({ hasText: importerData.uploadFiles.importerName }).last()).toBeVisible();
        await this.openImporter.filter({ hasText: importerData.uploadFiles.importerName }).last().click();
        await expect(this.importerName).toBeVisible();
        await expect(this.importerName).toContainText(importerData.uploadFiles.importerName);
        await expect(this.importFileButton).toBeVisible();
        await expect(this.importFileButton).toBeEnabled();
        await this.importFileButton.click();
        await this.fileInput.setInputFiles(importerData.uploadFiles.unmatchedColumnCsv);
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
        await expect(this.reviewPageHeaderText).toBeVisible();
        await expect(this.dataTable).toBeVisible();
    }

    async verifyDeleteButtonIsDisableWithoutSelectingAnyColumn() {
        await expect(this.deleteRowButton).toBeVisible();
        const button = this.deleteRowButton.locator('button');
        await expect(button).toBeDisabled();
        await this.deleteRowButton.hover({ force: true });
        await expect(this.tooltipContent)
            .toHaveText(tableActionData.deleteRow.tooltip);

    }

    getRowWithId(index) {
        const { idPrefix } = tableActionData.row;
        return this.importerFrame.locator(
            `[id="${idPrefix}-${index}"]`
        );
    }

    selectParticularRow(index = 0) {
        const { checkboxCellPrefix } = tableActionData.row;
        return this.importerFrame.locator(`[data-test-id="${checkboxCellPrefix}-${index}"]`);
    }

    async matchRowDataReview(randomRows) {

        const { columnsWithInput, columnsWithTextarea } = tableActionData.row;
        const rowCount = randomRows.length;

        for (let i = 0; i < rowCount; i++) {
            const row = this.getRowWithId(i);

            for (const [index] of columnsWithInput.entries()) {
                const input = row
                    .getByTestId('cell-column')
                    .nth(index);
                await input.scrollIntoViewIfNeeded();
                await expect(input).toBeVisible();
            }

            for (const [index] of columnsWithTextarea.entries()) {

                const cell = row
                    .getByTestId('spreadsheet-input')
                    .nth(index);
                await cell.scrollIntoViewIfNeeded();
                await expect(cell).toBeVisible();
            }
        }
    }

    async deleteOneRowAtATime() {
        const { initialRowCount, singleRowDeletedMessage } = tableActionData.deleteRow;

        await expect(this.allRowFilter)
            .toContainText(`(${initialRowCount})`);
        for (let i = 0; i < initialRowCount; i++) {

            const rowCheckbox = this.selectParticularRow(0);

            await rowCheckbox.scrollIntoViewIfNeeded();
            await rowCheckbox.hover({ force: true });
            await expect(rowCheckbox).toBeVisible();
            await rowCheckbox.click();

            const deleteButton =
                this.deleteRowButton.locator('button');

            await expect(deleteButton).toBeEnabled();
            await this.deleteRowButton.click();
            await expect(this.deleteSelectedRowPopup).toBeVisible();
            await this.yesDeleteButtonUnderDeletePopup.click();
            await expect(this.allRowFilter)
                .toContainText(`(${initialRowCount - (i + 1)})`);

            await expect(this.rowsDeletedStatusMessage.last()).toBeVisible();
            await expect(this.rowsDeletedStatusMessage.last()).toHaveText(singleRowDeletedMessage);
        }
    }

    async deleteAllRowAtATime() {
        const { initialRowCount, allRowsDeletedCount, rowsDeletedMessage } = tableActionData.deleteRow;

        await expect(this.allRowFilter)
            .toContainText(`(${initialRowCount})`);
        const selectAllCheckbox = this.allCheckBoxToDeleteRow.first();
        await selectAllCheckbox.scrollIntoViewIfNeeded();
        await expect(selectAllCheckbox).toBeVisible();
        await selectAllCheckbox.click();
        const deleteButton =
            this.deleteRowButton.locator('button');

        await expect(deleteButton).toBeEnabled();
        await this.deleteRowButton.click();
        await expect(this.deleteSelectedRowPopup).toBeVisible();
        await expect(this.yesDeleteButtonUnderDeletePopup).toBeVisible();

        await this.yesDeleteButtonUnderDeletePopup.click();
        await expect(this.allRowFilter).toContainText(allRowsDeletedCount);
        await expect(this.rowsDeletedStatusMessage.last()).toBeVisible();
        await expect(this.rowsDeletedStatusMessage.last()).toContainText(rowsDeletedMessage);
    }

    async verifyOneRowAlwaysPresent() {
        const { remainingRowIndex, emptyCellsCount, emptyCellValue } = tableActionData.deleteRow;

        await expect(this.getRowWithId(remainingRowIndex)).toBeVisible();
        for (let i = 0; i < emptyCellsCount; i++) {
            await expect(this.getRowWithId(remainingRowIndex).getByTestId('cell-column').nth(i))
                .toHaveText(emptyCellValue);
        }
    }

    async rowAddedAutomatically() {
        const { autoRowAddValue } = tableActionData.deleteRow;

        const initialRowCount = await this.rows.count();
        const lastRow = this.rows.last();
        await lastRow.scrollIntoViewIfNeeded();

        const firstCell = lastRow
            .getByTestId('cell-column')
            .getByTestId('spreadsheet-input')
            .first();

        await firstCell.dblclick();
        await firstCell.fill(autoRowAddValue);
        await expect(firstCell).toContainText(autoRowAddValue);
        await expect(this.rows).toHaveCount(initialRowCount + 1);
    }

    async cancelButtonUnderDeletePopup() {
        const selectAllCheckbox = this.allCheckBoxToDeleteRow.first();
        await selectAllCheckbox.scrollIntoViewIfNeeded();
        await expect(selectAllCheckbox).toBeVisible();
        await selectAllCheckbox.click();
        const deleteButton = this.deleteRowButton.locator('button');
        await expect(deleteButton).toBeEnabled();
        await this.deleteRowButton.click();
        await expect(this.deleteSelectedRowPopup).toBeVisible();
        await expect(this.cancelButton).toBeVisible();
        await expect(this.cancelButton).toBeEnabled();
        await this.cancelButton.click();
        await expect(this.deleteSelectedRowPopup).toBeHidden();
    }

    async crossIconUnderDeletePopup() {
        const selectAllCheckbox = this.allCheckBoxToDeleteRow.first();
        await selectAllCheckbox.scrollIntoViewIfNeeded();
        await expect(selectAllCheckbox).toBeVisible();
        await selectAllCheckbox.click();
        const deleteButton = this.deleteRowButton.locator('button');
        await expect(deleteButton).toBeEnabled();
        await this.deleteRowButton.click();
        await expect(this.deleteSelectedRowPopup).toBeVisible();
        await expect(this.crossIcon).toBeVisible();
        await expect(this.crossIcon).toBeEnabled();
        await this.crossIcon.click();
        await expect(this.deleteSelectedRowPopup).toBeHidden();
    }



    async verifyFunctionalityOfSearchIcon() {
        await expect(this.searchIcon).toBeVisible();
        await expect(this.searchIcon).toBeEnabled();
        await this.searchIcon.click();
        await expect(this.searchInput).toBeVisible();
    }

    async verifyUserIsAbleToSearch(dataForSearch) {

        const { maxRetries, retryWaitTimeout } = tableActionData.search;

        for (let attempt = 0; attempt < maxRetries; attempt++) {
            await this.searchInput.clear();
            await this.searchInput.fill(dataForSearch);

            const actualValue = await this.searchInput.inputValue();

            if (actualValue === dataForSearch) {
                console.log(`✅ Search input value matches: "${actualValue}"`);
                break;
            }
            console.log(
                `❌ Search input value mismatch. Expected: "${dataForSearch}", Got: "${actualValue}"`
            );
            if (attempt === maxRetries - 1) {
                throw new Error(
                    `Failed to enter search text after ${maxRetries} attempts`
                );
            }
            await this.page.waitForTimeout(retryWaitTimeout);
        }
        await expect(this.searchInput).toHaveValue(dataForSearch);
    }

    async verifyNoRowsFound() {
        const { noResultsText } = tableActionData.search;

        await expect(this.findAndReplaceIcon).toBeVisible();
        await expect(this.findAndReplaceIcon).toContainText(noResultsText)
        await expect(this.rows).toHaveCount(0);
    }

    async verifyRowsFound(searchData) {
        const { rowsVisibleWaitTimeout, resultsTextSuffix } = tableActionData.search;

        await this.page.waitForTimeout(rowsVisibleWaitTimeout);
        const searchResultCount = await this.rows.count();
        await expect(this.findAndReplaceIcon).toBeVisible();
        await expect(this.findAndReplaceIcon).toContainText(`${searchResultCount}${resultsTextSuffix}`)
        await expect(this.rows).toHaveCount(searchResultCount);
        const cells = this.rows.getByTestId('cell-column');
        const cellCount = await cells.count();

        let isFound = false;
        for (let i = 0; i < cellCount; i++) {
            const text = await cells.nth(i).textContent();

            if (text?.includes(searchData)) {
                isFound = true;
                break;
            }
        }
        expect(isFound).toBeTruthy();
    }

    async verifyFunctionalityOfFindAndReplaceIcon() {
        await this.searchIcon.click();
        await expect(this.findAndReplaceIcon).toBeVisible();
        await this.findAndReplaceIcon.click();
        await expect(this.findAndReplacePopupTitle).toBeVisible();
        await expect(this.findAndReplacePopupTitle).toContainText(tableActionData.findAndReplacePopup.title);
    }

    async verifyElementsVisibilityInFindAndReplacePopup() {

        const elements = [
            {
                locator: this.findAndReplacePopupTitle,
                text: tableActionData.findAndReplacePopup.title
            },
            {
                locator: this.findAndReplacePopupDescription,
                text: tableActionData.findAndReplacePopup.description
            },
            {
                locator: this.findInput,
                text: tableActionData.findAndReplacePopup.findInput
            },
            {
                locator: this.replaceInput,
                text: tableActionData.findAndReplacePopup.replaceInput
            },
            {
                locator: this.useRegexCheckbox,

            },
            {
                locator: this.useCaseSensitiveCheckbox,

            },
            {
                locator: this.cancelButton,
            },
            {
                locator: this.findAndReplaceButton,
            }
        ]

        for (const element of elements) {
            await visibilityOfElement(element.locator);
            if (element.text) {
                await expect(element.locator).toContainText(element.text);
            }
        }
    }

    async fillingInputAndReplaceValue(replacedValue) {
        const { stringCellIdPrefix, firstStringCellIndex } = tableActionData.findAndReplacePopup;
        const stringCell = this.importerFrame.locator(`#${stringCellIdPrefix}-${firstStringCellIndex}`);

        const cellValue = await stringCell.textContent();

        await this.verifyFunctionalityOfFindAndReplaceIcon();

        const findInput = this.findInput.locator('input');
        await expect(findInput).toBeVisible();
        await findInput.fill(cellValue);

        const replaceInput = this.replaceInput.locator('input');
        await expect(replaceInput).toBeVisible();
        await replaceInput.fill(replacedValue);

    }

    async findReplaceInsensitiveCaseSearchWithRegex(replacedValue) {
        const { findAndReplaceButton, replacedValidationMessage, stringCellIdPrefix, firstStringCellIndex } = tableActionData.findAndReplacePopup;

        await expect(this.useRegexCheckbox).toBeVisible();
        await this.useRegexCheckbox.click();

        await expect(this.useCaseSensitiveCheckbox).toBeVisible();
        await this.useCaseSensitiveCheckbox.click();

        await expect(this.findAndReplaceButton).toBeVisible();
        await expect(this.findAndReplaceButton).toHaveText(findAndReplaceButton);
        await this.findAndReplaceButton.click();

        await expect(this.replacedValidationMessage).toBeVisible();
        await expect(this.replacedValidationMessage).toContainText(replacedValidationMessage);
        await expect(this.importerFrame.locator(`#${stringCellIdPrefix}-${firstStringCellIndex}`)).toBeVisible();
        await expect(this.importerFrame.locator(`#${stringCellIdPrefix}-${firstStringCellIndex}`)).toHaveText(replacedValue);
    }

    async findReplaceSensitiveCaseSearchWithRegex(replacedValue) {
        const { findAndReplaceButton, replacedValidationMessage, stringCellIdPrefix, firstStringCellIndex } = tableActionData.findAndReplacePopup;

        await expect(this.useRegexCheckbox).toBeVisible();
        await this.useRegexCheckbox.click();

        await expect(this.findAndReplaceButton).toBeVisible();
        await expect(this.findAndReplaceButton).toHaveText(findAndReplaceButton);
        await this.findAndReplaceButton.click();

        await expect(this.replacedValidationMessage).toBeVisible();
        await expect(this.replacedValidationMessage).toContainText(replacedValidationMessage);
        await expect(this.importerFrame.locator(`#${stringCellIdPrefix}-${firstStringCellIndex}`)).toBeVisible();
        await expect(this.importerFrame.locator(`#${stringCellIdPrefix}-${firstStringCellIndex}`)).toHaveText(replacedValue);
    }

    async verifyFunctionalityOfCancelButtonInFindAndReplacePopup() {
        await expect(this.cancelButton).toBeVisible();
        await this.cancelButton.click();
        await expect(this.findAndReplacePopup).toBeHidden();
    }

    async verifyFunctionalityOfCloseIconInFindAndReplacePopup() {
        await expect(this.crossIcon).toBeVisible();
        await this.crossIcon.click();
        await expect(this.findAndReplacePopup).toBeHidden()
    }

    async verifyValidationWhenAnyValueNotMatchedWithCells() {
        const { noMatchReplaceValue, textNotFoundErrorMessage } = tableActionData.findAndReplacePopup;

        await this.findAndReplaceButton.click();
        await this.fillingInputAndReplaceValue(noMatchReplaceValue);
        await this.findAndReplaceButton.click();
        await expect(this.textNotFoundErrorMessage).toBeVisible();
        await expect(this.textNotFoundErrorMessage).toContainText(textNotFoundErrorMessage);
    }

    async verifyAllFiltersAreVisible() {
        const elements = [
            this.allRowFilter, this.searchIcon, this.invalidFilter, this.duplicateFilter, this.findByErrorFilter, this.fieldValueFilter, this.exportDataIcon
        ]
        for (const element of elements) {
            await visibilityOfElement(element);
        }
    }

    async verifyInvalidFilterWhenNoInvalidDataIsPresent() {
        const { noDataCount } = tableActionData.filters;

        await expect(this.invalidFilter).toBeVisible();
        await expect(this.invalidFilter).toContainText(noDataCount);
        await this.invalidFilter.click();
        await expect(this.rows.locator('textarea')
        ).not.toBeAttached();

    }

    async verifyInvalidFilterWhenInvalidDataIsPresent() {
        const { invalidData, errorColor } = tableActionData.filters;

        const firstCell = await this.rows.getByTestId('spreadsheet-input').first()
        await firstCell.dblclick();
        await firstCell.fill(invalidData);
        await expect(firstCell).toContainText(invalidData);
        await expect(firstCell).toHaveCSS('color', errorColor);
        await this.invalidFilter.click();
        await expect(this.rows.getByTestId('spreadsheet-input').first()).toBeAttached();
        await expect(this.rows.getByTestId('spreadsheet-input').first()).toContainText(invalidData);
        await expect(this.rows.getByTestId('spreadsheet-input').first()).toHaveCSS('color', errorColor);
    }

    async verifyDuplicateFilterWhenNoDuplicateDataIsPresent() {
        const { noDataCount } = tableActionData.filters;

        await expect(this.duplicateFilter).toBeVisible();
        await expect(this.duplicateFilter).toContainText(noDataCount);
        await this.duplicateFilter.click();
        await expect(this.rows.locator('textarea')).not.toBeAttached();
        await expect(this.rows.locator('textarea')).toBeHidden();
    }

    async verifyDuplicateFilterWhenDuplicateDataIsPresent() {
        const { stringCellIdPrefix, firstStringCellIndex } = tableActionData.findAndReplacePopup;
        const { secondStringCellIndex } = tableActionData.filters;

        let initialDuplicateCount = 0;
        const firstStringCell = await this.importerFrame.locator(`#${stringCellIdPrefix}-${firstStringCellIndex}`);
        const firstStringCellValue = await firstStringCell.textContent();
        const secondStringCell = await this.importerFrame.locator(`#${stringCellIdPrefix}-${secondStringCellIndex}`);
        await secondStringCell.dblclick();
        await secondStringCell.fill(firstStringCellValue);
        await expect(secondStringCell).toContainText(firstStringCellValue);
        initialDuplicateCount++;
        await expect(this.duplicateFilter).toContainText(`(${initialDuplicateCount})`);
        await this.duplicateFilter.click();
        await expect(this.rows.locator('textarea')).toBeAttached();
        await expect(this.rows.locator('textarea')).toBeVisible();
    }

    async userUsesTheFilterByErrors() {
        const {
            integerInput,
            urlInput,
            integerErrorValidation,
            urlErrorValidation,
            integerColumn,
            urlColumn,
            errorCount,
            integerCellIdPrefix,
            urlCellIdPrefix,
            filterWaitTimeout,
            optionDropdownWaitTimeout
        } = tableActionData.filterByErrors;
        const { errorColor } = tableActionData.filters;

        for (let i = 0; i < errorCount; i++) {
            const integerCell = this.importerFrame.locator(`#${integerCellIdPrefix}-${i}`);
            await integerCell.dblclick();
            await integerCell.fill(integerInput);
        }

        for (let i = 0; i < errorCount; i++) {
            const urlCell = this.importerFrame.locator(`#${urlCellIdPrefix}-${i}`)
            await urlCell.dblclick();
            await urlCell.fill(urlInput);
        }

        // Integer error filter
        await expect(this.findByErrorFilter).toBeVisible();
        await this.page.waitForTimeout(filterWaitTimeout);
        await this.findByErrorFilter.click();
        await expect(this.optionDropdown).toBeVisible();
        await this.filterByErrorsOptions.filter({ hasText: integerColumn }).click();

        for (let i = 0; i < errorCount; i++) {
            const integerColumnLocator = this.importerFrame.locator(`#${integerCellIdPrefix}-${i}`);
            await expect(integerColumnLocator).toBeVisible();
            await expect(integerColumnLocator).toHaveCSS(
                'color', errorColor
            );
        }
        await expect(this.integerErrorValidation).toBeVisible();
        await expect(this.integerErrorValidation).toContainText(integerErrorValidation);

        // Url error filter
        await this.findByErrorFilter.click();
        await this.page.waitForTimeout(optionDropdownWaitTimeout);
        await expect(this.optionDropdown).toBeVisible();
        await this.filterByErrorsOptions.filter({ hasText: urlColumn }).click();

        for (let i = 0; i < errorCount; i++) {
            const urlColumnLocator = this.importerFrame.locator(`#${urlCellIdPrefix}-${i}`);
            await expect(urlColumnLocator).toBeVisible();
            await expect(urlColumnLocator).toHaveCSS(
                'color', errorColor
            );
        }
        await expect(this.urlErrorValidation).toBeVisible();
        await expect(this.urlErrorValidation).toContainText(urlErrorValidation);
    }
}
