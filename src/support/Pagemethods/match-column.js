import { expect } from '@playwright/test';
import importerData from '../TestData/importer.json' with { type: 'json' };
import matchColumnData from '../TestData/match-column.json' with { type: 'json' };

export class MatchColumn {
    constructor(page) {
        this.page = page;
        this.openImporter = page.getByTestId('template-name')
        this.importerName = page.getByTestId('template-name-input')
        this.importFileButton = page.getByRole('button', { name: 'Import File' })

        this.importerFrame = page.frameLocator('#fuse-importer-root');

        this.fileInput = this.importerFrame.locator('input[type="file"]');
        this.selectHeaderTitle = this.importerFrame.getByTestId('select-header-title');
        this.selectHeaderDescription = this.importerFrame.getByTestId('select-header-description');
        this.dataTable = this.importerFrame.locator('[data-test-id="table-view-wrapper"]');
        this.continueButton = this.importerFrame.getByTestId('continue-button');
        this.matchTitle = this.importerFrame.getByTestId('match-title');
        this.matchDescription = this.importerFrame.getByTestId('match-description');
        this.goBackButton = this.importerFrame.getByTestId('go-back');
        this.pageStepper = this.importerFrame.getByTestId('stepper');
        this.crossIcon = this.importerFrame.locator('[data-test-id="close-importer"]');
        this.headersColumns = this.importerFrame.locator('#tableHeaderId');
        this.firstRow = this.importerFrame.locator('#row-id-0');
        this.margeColumnIcon = this.importerFrame.getByTestId('combine-data-button-0');
        this.combineDataPopup = this.importerFrame.locator('.sc-bdfBQB.sc-bqyKOL.dmuEyS.gSoUCp');
        this.margeColumnIconTooltipText = this.importerFrame.getByTestId('tool-tip-content');
        this.combineDataPopupHeaderText = this.importerFrame.getByTestId('combine-column-heading');
        this.combineDataPopupDescriptionText = this.importerFrame.getByTestId('combine-column-sub-heading');
        this.selectColumnsToCombineSection = this.importerFrame.getByTestId('combine-columns-multiselect');
        this.selectColumnToCombineInput = this.importerFrame.getByTestId('input-field');
        this.delimiterSection = this.importerFrame.getByTestId('delimeter-autocomplete');
        this.delimiterDropdown = this.importerFrame.locator('.sc-cOajNj.gJwjJn');
        this.dataPreviewSection = this.importerFrame.locator('.sc-bdfBQB.keLtwY');
        this.cancelButton = this.importerFrame.getByRole('button', { name: 'Cancel' });
        this.combineYoursColumnButton = this.importerFrame.getByRole('button', { name: 'Combine your columns' });
        this.closeIcon = this.importerFrame.getByTestId('close-icon');
        this.columnName = this.importerFrame.getByTestId('columns-name')
        this.delimiterOptions = this.importerFrame.locator('[data-test-id="autocomplete-menu-item"]');
        this.allDelimiterOptions = this.importerFrame.locator('.sc-bdfBQB.sc-dOSRxR.dmuEyS.kSIuag');
        this.selectedColumnCrossIcon = this.importerFrame.getByTestId('remove-item');
        this.plusIcon = this.importerFrame.getByTestId('plus-icon');
        this.minusIcon = this.importerFrame.getByTestId('minus-icon');
        this.columnCombinedSuccessMessage = this.importerFrame.getByText(matchColumnData.successToastMessage);
        this.combinedColumn = this.importerFrame.getByTestId('selected-columns-0');
        this.toolTipContent = this.importerFrame.getByTestId('tool-tip-content');
        this.deleteCombinedColumnIcon = this.importerFrame.getByTestId('delete-combined-columns-0');
        this.closeImporterPopup = this.importerFrame.locator('.sc-bdfBQB.gtAHRq');
        this.closeImporterPopupTitle = this.importerFrame.locator('[data-test-id="close-confirmation-title"]');
        this.closeImporterPopupDescription = this.importerFrame.locator('[data-test-id="close-confirmation-description"]');
        this.closeButtonInCloseImporterPopup = this.importerFrame.getByRole('button', { name: 'Close' });
        this.cancelButtonInCloseImporterPopup = this.importerFrame.getByRole('button', { name: 'Cancel' });
        this.reviewPageHeaderText = this.importerFrame.getByTestId('review-submit');
        this.updatedColumnCrossIcon = this.importerFrame.getByTestId('clear-icon');
        this.unmatchedStatus = this.importerFrame.getByTestId('unmatched');
        this.unmatchedColumnPopup = this.importerFrame.locator('.sc-bdfBQB.cCIlqO');
        this.unmatchedColumnPopupTitle = this.importerFrame.getByText('Unmatched Column Headers', { exact: true });
        this.unmatchedColumnPopupDescription = this.importerFrame.getByText('There is 1 unmatched column headers. You will have to fill these out manually if you proceed.');
        this.assignHeaderButton = this.importerFrame.getByRole('button', { name: 'Assign Headers' });
        this.skipButton = this.importerFrame.getByRole('button', { name: 'Skip' });
        this.integerColumnHeader = this.importerFrame.locator('#your-column-Integer');
        this.columnHeaderOptions = this.importerFrame.locator('.sc-bdfBQB.sc-dOSRxR.dmuEyS.kSIuag');
        this.integerColumnHeaderOption = this.importerFrame.locator('[data-test-id="autocomplete-menu-item"]').filter({ hasText: 'Integer' });

    }

    async navigateToMatchColumnPage() {
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
    }

    async verifyElementsVisibilityInMatchColumnPage() {
        const elements = [
            this.matchTitle,
            this.matchDescription,
            this.dataTable,
            this.continueButton,
            this.goBackButton,
            this.pageStepper
        ]

        for (const element of elements) {
            await expect(element).toBeVisible();
        }
    }

    async verifyMatchColumnPageTableHeaders() {
        const expectedHeaders = [
            'Uploaded Columns',
            'Supported Columns',
            'Content example',
            'Status'
        ];

        await this.page.waitForTimeout(2000); //waiting for the headers to be visible
        await expect(this.dataTable).toBeVisible();
        const actualHeaders = (await this.headersColumns.allTextContents())
            .map(header => header.trim())
            .filter(header => header !== '');

        expect(actualHeaders).toEqual(expectedHeaders);
    }

    async functionalityOfMargeColumnIcon() {
        await expect(this.dataTable).toBeVisible();
        await this.firstRow.hover();
        await expect(this.margeColumnIcon).toBeVisible();
        await expect(this.margeColumnIcon).toBeEnabled();
        await this.margeColumnIcon.click();
        await expect(this.combineDataPopup).toBeVisible();
    }

    async verifyOnHoveringMargeColumnIconTooltipTextIsDisplayed() {
        await expect(this.dataTable).toBeVisible();
        await this.firstRow.hover();
        await expect(this.margeColumnIcon).toBeVisible();
        await this.margeColumnIcon.hover();
        await expect(this.margeColumnIconTooltipText).toBeVisible();
        await expect(this.margeColumnIconTooltipText).toContainText(matchColumnData.tooltip);
    }

    async visibilityOfElementsInCombineDataPopup() {
        const elements = [
            {
                locator: this.combineDataPopupHeaderText,
                text: matchColumnData.heading
            },
            {
                locator: this.combineDataPopupDescriptionText,
                text: matchColumnData.description
            },
            {
                locator: this.selectColumnsToCombineSection,
                text: matchColumnData.selectMultipleColumn
            },
            {
                locator: this.delimiterSection,
                text: matchColumnData.selectDelimiter
            },
            {
                locator: this.selectColumnToCombineInput
            },
            {
                locator: this.delimiterDropdown.nth(1)
            },
            {
                locator: this.dataPreviewSection
            },
            {
                locator: this.cancelButton
            },
            {
                locator: this.combineYoursColumnButton
            }
        ];

        for (const element of elements) {
            await expect(element.locator).toBeVisible();
            if (element.text) {
                await expect(element.locator).toContainText(element.text);
            }
        }
    }

    async functionalityOfCancelButtonInCombineDataPopup() {
        await expect(this.cancelButton).toBeVisible();
        await expect(this.cancelButton).toBeEnabled();
        await this.cancelButton.click();
        await expect(this.combineDataPopup).not.toBeVisible();
    }

    async functionalityOfCloseIconInCombineDataPopup() {
        await expect(this.closeIcon).toBeVisible();
        await expect(this.closeIcon).toBeEnabled();
        await this.closeIcon.click();
        await expect(this.combineDataPopup).not.toBeVisible();
    }

    async verifyDelimiterOptionsInChooseDelimiterDropdown() {
        const expectedDelimiterOptions = matchColumnData.delimiterOption;

        await this.delimiterDropdown.nth(1).click();

        const actualDelimiterOptions = (
            await this.delimiterOptions.allTextContents()
        ).map(text => text.trim());

        expect(actualDelimiterOptions).toEqual(expectedDelimiterOptions);
    }

    async selectDelimiterAndVerify(
        delimiterName
    ) {
        await this.delimiterDropdown.nth(1).click();
    
        await expect(this.allDelimiterOptions)
            .toBeVisible();
    
        await this.delimiterOptions
            .filter({ hasText: delimiterName })
            .click();
    
        await expect(this.delimiterDropdown.nth(1))
            .toHaveValue(delimiterName);
    }

    async verifyNoneAsADelimiter() {
        await this.selectDelimiterAndVerify('None');
    }

    async verifySpaceAsADelimiter() {
        await this.selectDelimiterAndVerify('Space');
    }

    async verifyCommaAsADelimiter() {
        await this.selectDelimiterAndVerify('Comma');
    }

    async verifySemicolonAsADelimiter() {
        await this.selectDelimiterAndVerify('Semicolon');
    }

    async verifyDashAsADelimiter() {
        await this.selectDelimiterAndVerify('Dash');
    }

    async verifyTabAsADelimiter() {
        await this.selectDelimiterAndVerify('Tab');
    }

    async verifyDotAsADelimiter() {
        await this.selectDelimiterAndVerify('Dot');
    }

    async verifyPlusIconFunctionality() {

        await expect(this.selectColumnToCombineInput).toBeVisible();
        const initialSelectedCount =
            await this.selectedColumnCrossIcon.count();
        expect(initialSelectedCount).toBe(1);
        await this.selectColumnToCombineInput.click();
        const firstPlusIcon = this.plusIcon.first();
        const columnSelected = (
            await firstPlusIcon.locator('..').textContent()
        )?.trim();
        await expect(firstPlusIcon).toBeVisible();
        await firstPlusIcon.click();
        const updatedSelectedCount =
            await this.selectedColumnCrossIcon.count();
        expect(updatedSelectedCount).toBe(initialSelectedCount + 1);
        const lastSelectedColumn = this.selectedColumnCrossIcon
            .last()
            .locator('..');
        await expect(lastSelectedColumn)
            .toHaveText(columnSelected);
        const lastMinusColumn = this.minusIcon
            .last()
            .locator('..');
        await expect(lastMinusColumn)
            .toHaveText(columnSelected);
    }

    async verifyMinusIconFunctionality() {
        await expect(this.selectColumnToCombineInput).toBeVisible();
        await this.selectColumnToCombineInput.click();
        const initialPlusCount = await this.plusIcon.count();
        await expect(this.plusIcon.first()).toBeVisible();
        await this.plusIcon.first().click();
        const itemForRemoved = this.minusIcon
            .last()
            .locator('..');
        const itemName = (
            await itemForRemoved.textContent()
        )?.trim();
        const selectedItem = this.selectedColumnCrossIcon
            .last()
            .locator('..');
        const selectedItemName = (
            await selectedItem.textContent()
        )?.trim();
        expect(itemName).toBe(selectedItemName);
        await itemForRemoved.click();
        const updatedSelectedItemName = (
            await this.selectedColumnCrossIcon
                .last()
                .locator('..')
                .textContent()
        )?.trim();
        expect(updatedSelectedItemName).not.toBe(selectedItemName);
        const updatedPlusCount = await this.plusIcon.count();
        expect(updatedPlusCount).toEqual(initialPlusCount);
    }

    async addColumnForMerge() {
        await expect(this.selectColumnToCombineInput).toBeVisible();
        await this.selectColumnToCombineInput.click();
        const mergeColumnCount = await this.plusIcon.count();

        for (let i = 0; i < mergeColumnCount-1; i++) {
            await this.plusIcon.first().click();
        }
    }

    async removeColumnForMerge() {
        const mergeColumnCount = await this.minusIcon.count();

        for (let i = 0; i < mergeColumnCount-1; i++) {
            await this.minusIcon.first().click();
        }
    }

    async verifyCombineYourColumnsButtonIsDisabledWithoutAnyColumnsSelected() {
        await expect(this.combineYoursColumnButton).toBeVisible();
        await expect(this.combineYoursColumnButton).toHaveAttribute('disabled');
    }

    async functionalityOfCombineYourColumnsButton() {
        await expect(this.combineYoursColumnButton).toBeVisible();
        await expect(this.combineYoursColumnButton).toBeEnabled();
        await this.combineYoursColumnButton.dblclick({ force: true });
        await expect(this.columnCombinedSuccessMessage).toBeVisible();
        await expect(this.columnCombinedSuccessMessage).toContainText(matchColumnData.successToastMessage);
        await expect(this.combinedColumn).toBeVisible();
    }

    async verifyToolTipMessageOverPreviewSection() {
        await expect(this.combineYoursColumnButton).toBeVisible();
        await expect(this.combineYoursColumnButton).toBeEnabled();
        await this.combineYoursColumnButton.click({ force: true });

        for (let index = 0; index < matchColumnData.dataPreviewToolTipMessage.length; index++) {

            const previewData = this.importerFrame.getByTestId(`combine-data-preview-${index}`);
            await expect(previewData).toBeVisible();
            await previewData.hover()
            await expect(this.toolTipContent)
                .toHaveText(matchColumnData.dataPreviewToolTipMessage[index]);
        }
    }

    async verifyDeleteCombinedColumnIcon() {
        await expect(this.deleteCombinedColumnIcon).toBeVisible();
        await expect(this.deleteCombinedColumnIcon).toBeEnabled();
        await this.deleteCombinedColumnIcon.click();
        await expect(this.combinedColumn).not.toBeVisible();
    }

    async functionalityOfGoBackButton() {
        await expect(this.goBackButton).toBeVisible();
        await expect(this.goBackButton).toBeEnabled();
        await this.goBackButton.click();
        await expect(this.selectHeaderTitle).toBeVisible();
        await expect(this.selectHeaderDescription).toBeVisible();
        await expect(this.dataTable).toBeVisible();
    }

    async functionalityOfCrossIcon() {   
        await expect(this.crossIcon).toBeVisible();
        await expect(this.crossIcon).toBeEnabled();
        await this.crossIcon.click();
        await expect(this.closeImporterPopup).toBeVisible();
    }

    async visibilityOfElementsInCloseImporterPopup() {
        const elements = [
            {
                locator: this.closeImporterPopupTitle,
                text: matchColumnData.closeImporterPopup.title
            },
            {
                locator: this.closeImporterPopupDescription,
                text: matchColumnData.closeImporterPopup.description
            },
            {
                locator: this.closeButtonInCloseImporterPopup,
                text: matchColumnData.closeImporterPopup.closeButton
            },
            {
                locator: this.cancelButtonInCloseImporterPopup,
                text: matchColumnData.closeImporterPopup.cancelButton
            },
            {
                locator: this.crossIcon,
            }
        ]

        for (const element of elements) {
            await expect(element.locator).toBeVisible();
            if (element.text) {
                await expect(element.locator).toContainText(element.text);
            }
        }
    }       

    async functionalityOfCancelButtonInCloseImporterPopup() {
        await expect(this.cancelButtonInCloseImporterPopup).toBeVisible();
        await expect(this.cancelButtonInCloseImporterPopup).toBeEnabled();
        await this.cancelButtonInCloseImporterPopup.click();
        await expect(this.closeImporterPopup).not.toBeVisible();
    }
    
    async functionalityOfCloseButtonInCloseImporterPopup() {
        await expect(this.closeButtonInCloseImporterPopup).toBeVisible();
        await expect(this.closeButtonInCloseImporterPopup).toBeEnabled();
        await this.closeButtonInCloseImporterPopup.click();
        await expect(this.closeImporterPopup).not.toBeVisible();
    }
    
    async functionalityOfCrossIconInCloseImporterPopup() {
        await expect(this.closeIcon).toBeVisible();
        await expect(this.closeIcon).toBeEnabled();
        await this.closeIcon.click();
        await expect(this.closeImporterPopup).not.toBeVisible();
    }

    async functionalityOfContinueButtonInImporterMatchColumnPage() {
        await expect(this.continueButton).toBeVisible();
        await expect(this.continueButton).toBeEnabled();
        await this.continueButton.click();
        await expect(this.reviewPageHeaderText).toBeVisible();
        await expect(this.dataTable).toBeVisible();
    }

    async unmatchedColumnStatus() {
        await expect(this.updatedColumnCrossIcon.first()).toBeVisible();
        await this.updatedColumnCrossIcon.first().click();
        await expect(this.unmatchedStatus).toBeVisible();
        await expect(this.continueButton).toBeVisible();
        await expect(this.continueButton).toBeEnabled();
        await this.continueButton.click();
        await expect(this.unmatchedColumnPopup).toBeVisible();
    }

    async visibilityOfElementsInUnmatchedColumnPopup() {
        const elements = [
            this.unmatchedColumnPopupTitle,
            this.unmatchedColumnPopupDescription,
            this.assignHeaderButton,
            this.skipButton,
            this.closeIcon,
        ];

        for (const element of elements) {
            await expect(element).toBeVisible();
        }
    }

    async functionalityOfSkipButton() {
        await expect(this.skipButton).toBeVisible();
        await expect(this.skipButton).toBeEnabled();
        await this.skipButton.click();
        await expect(this.unmatchedColumnPopup).not.toBeVisible();
        await expect(this.reviewPageHeaderText).toBeVisible();
        await expect(this.dataTable).toBeVisible();
    }

    async functionalityOfAssignHeaderButton() {
        await expect(this.assignHeaderButton).toBeVisible();
        await expect(this.assignHeaderButton).toBeEnabled();
        await this.assignHeaderButton.click();
        await expect(this.unmatchedColumnPopup).not.toBeVisible();
    }
    
    async assignHeadersToUnmatchedColumn() {
        await expect(this.unmatchedStatus).toBeVisible();
        await expect(this.integerColumnHeader).toBeVisible();
        await this.integerColumnHeader.click();
        await expect(this.columnHeaderOptions).toBeVisible();
        await this.integerColumnHeaderOption.click();
        await expect(this.integerColumnHeader).toHaveValue('Integer');
        await expect(this.unmatchedStatus).not.toBeVisible();
    }
}
