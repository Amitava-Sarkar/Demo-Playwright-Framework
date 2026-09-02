import { expect } from '@playwright/test';
import importerData from '../TestData/importer.json' with { type: 'json' };
import importsFileData from '../TestData/importsFile.json' with { type: 'json' };
import { visibilityOfElement } from '../Utils/generalPlaywrightMethods';
import fs from 'fs';


export class ImportsFile {
    constructor(page) {
        this.page = page;
        this.importsTab = page.getByTestId('importsLink');
        this.headerText = page.getByTestId('importsTitle');
        this.importsButton = page.getByTestId('import-file-button')
        this.importDataText = page.getByText('Import Data', { exact: true });
        this.importDataDescription = page.getByText('Choose an Importer to import data and create File Imports');
        this.importFilePopup = page.locator('.gZRIau')
        this.importFilePopupHeaderText = page.getByText('Import a File');
        this.importFilePopupDescriptionText = page.getByText('Select an importer to get started.');
        this.selectImporterDropdown = page.locator('[placeholder="Select an option..."]')
        this.cancelButton = page.getByRole('button', { name: 'Cancel' })
        this.launchImporterButton = page.getByRole('button', { name: 'Launch Importer' })
        this.crossIcon = page.getByTestId('close-icon')
        this.selectImporterDropdownOptions = page.locator('.kSIuag')
        this.importer = page.locator('[data-test-id="autocomplete-menu-item"]')
        this.uploadFileHeaderText = page.getByText('Upload a File to Import your Data')
        this.fileImportsDataTable = page.locator('[data-test-id="table-view-wrapper"]')
        this.nameColumn = page.getByTestId('cell-column').first()
        this.headersColumns = page.locator('#tableHeaderId')
        this.slugColumn = page.getByTestId('import-slug')
        this.crossIconInCopiedSuccessMessage = page.getByTestId('toast-close-icon')
        this.slugColumnTooltipText = page.getByTestId('tool-tip-content')
        this.hoverSection = page.getByTestId('cell-column').last().locator('..')
        this.downloadButton = page.getByTestId('download')
        this.deleteButton = page.locator('[data-test-id="delete-button"]')
        this.deletePopup = page.locator('.exMZrl')
        this.deletePopupTitle = page.getByText('Delete Import')
        this.deletePopupDescription = page.getByTestId('delete-import-pop-up-description')
        this.cancelButtonUnderDeletePopup = page.getByRole('button', { name: 'Cancel' })
        this.yesDeleteButtonUnderDeletePopup = page.getByRole('button', { name: 'Yes, delete' })
        this.fileDeletedSuccessMessage = page.getByText(importsFileData.validations.deleteMessage)
    }

    async navigateToImportsFilePage() {
        await this.page.goto('/');
        await expect(this.importsTab).toBeVisible();
        await this.importsTab.click();
        await expect(this.page).toHaveURL(/account\/imports/, { timeout: 6000 });
        await expect(this.headerText).toBeVisible();
    }

    async verifyElementsVisibilityInImportsFilePageWhenNoFilesAreImported() {
        const elements = [
            this.headerText,
            this.importsButton.first(),
            this.importDataText,
            this.importDataDescription,
            this.importsButton.last(),
        ]

        for (const element of elements) {
            await expect(element).toBeVisible();
        }
    }

    async verifyFunctionalityOfImportFileButton() {
        await expect(this.importsButton.first()).toBeVisible();
        await expect(this.importsButton.first()).toBeEnabled();
        await this.importsButton.first().click();
        await expect(this.importFilePopup).toBeVisible();
    }

    async verifyElementsVisibilityInImportFilePopup() {
        const elements = [
            this.importFilePopupHeaderText,
            this.importFilePopupDescriptionText,
            this.selectImporterDropdown,
            this.cancelButton,
            this.launchImporterButton,
            this.crossIcon
        ]

        for (const element of elements) {
            await expect(element).toBeVisible();
        }
    }

    async verifyFunctionalityOfCancelButtonInImportFilePopup() {
        await expect(this.cancelButton).toBeVisible();
        await expect(this.cancelButton).toBeEnabled();
        await this.cancelButton.click();
        await expect(this.importFilePopup).not.toBeVisible();
    }

    async verifyFunctionalityOfCrossIconInImportFilePopup() {
        await expect(this.crossIcon).toBeVisible();
        await expect(this.crossIcon).toBeEnabled();
        await this.crossIcon.click();
        await expect(this.importFilePopup).not.toBeVisible();
    }

    async verifyFunctionalityOfLaunchImporterButtonIsDisabledWithoutSelectingAnImporter() {
        await expect(this.launchImporterButton).toBeVisible();
        await expect(this.launchImporterButton).toHaveAttribute('disabled');
    }

    async verifyUserIsAbleToSelectAnImporterFromTheDropdown() {
        await expect(this.selectImporterDropdown).toBeVisible();
        await expect(this.selectImporterDropdown).toBeEnabled();
        await this.selectImporterDropdown.click();
        await expect(this.selectImporterDropdownOptions).toBeVisible();
        const importerName = await this.importer.filter({ hasText: importerData.uploadFiles.importerName }).last().textContent();
        await this.importer.filter({ hasText: importerData.uploadFiles.importerName }).last().click();
        await expect(this.selectImporterDropdown).toHaveValue(importerName);
    }

    async verifyFunctionalityOfLaunchImporterButtonWhenAnImporterIsSelected() {
        await expect(this.launchImporterButton).toBeVisible();
        await expect(this.launchImporterButton).toBeEnabled();
        await this.launchImporterButton.click();
        await expect(this.importFilePopup).not.toBeVisible();
        const importerFrame = this.page.frameLocator('#fuse-importer-root');
        const uploadFileHeaderText = importerFrame.getByText('Upload a File to Import your Data');
        await expect(uploadFileHeaderText).toBeVisible();
    }

    async verifyUserIsAbleToImportAFile() {
        const importerFrame = this.page.frameLocator('#fuse-importer-root');
        await importerFrame.locator('input[type="file"]').setInputFiles(importerData.uploadFiles.unmatchedColumnCsv);
        await expect(importerFrame.getByTestId('select-header-title')).toBeVisible();
        const description = importerFrame.getByTestId('select-header-description');
        await expect(description).toBeVisible();
        const dataTable = importerFrame.locator('[data-test-id="table-view-wrapper"]');
        await expect(dataTable).toBeVisible();
        const continueButton = importerFrame.getByTestId('continue-button');
        await expect(continueButton).toBeVisible();
        await expect(continueButton).toBeEnabled();
        await continueButton.click();
        const matchTitleHeaderText = importerFrame.getByTestId('match-title');
        await expect(matchTitleHeaderText).toBeVisible();
        const matchTitleDescription = importerFrame.getByTestId('match-description');
        await expect(matchTitleDescription).toBeVisible();
        await expect(continueButton).toBeVisible();
        await expect(continueButton).toBeEnabled();
        await continueButton.click();
        const reviewPageHeaderText = importerFrame.getByTestId('review-submit');
        await expect(reviewPageHeaderText).toBeVisible();
        await expect(dataTable).toBeVisible();
        const submitButton = importerFrame.getByRole('button', { name: 'Submit' });
        await expect(submitButton).toBeVisible();
        await expect(submitButton).toBeEnabled();
        await submitButton.click();
        const readyToSubmitPopup = importerFrame.getByTestId('submit-modal-title'); // importerFrame
        await expect(readyToSubmitPopup).toBeVisible();
        const submitConfirmationButton = importerFrame.getByTestId('yes-submit')
        await expect(submitConfirmationButton).toBeVisible();
        await expect(submitConfirmationButton).toBeEnabled();
        await submitConfirmationButton.click();
        const dataImportedSuccessfullyPopup = importerFrame.locator('.dVcIIF');
        await expect(dataImportedSuccessfullyPopup).toBeVisible();
        await expect(dataImportedSuccessfullyPopup).toContainText(importerData.dataImportedSuccessfullyMessage);
        await expect(dataImportedSuccessfullyPopup).toContainText(importerData.dataImportedSuccessfullyDescription);
        const closeButton = importerFrame.getByRole('button', { name: 'OK, close' });
        await expect(closeButton).toBeVisible();
        await expect(closeButton).toBeEnabled();
        await closeButton.click();
        await expect(this.fileImportsDataTable).toBeVisible();
    }

    async verifyColumnNameInFileImportedDataTable() {
        const expectedHeaders = [
            'File Name',
            'Slug',
            'Importer',
            'Created',
            'Import Status',
            'Rows'
        ];

        await this.page.waitForTimeout(2000); //waiting for the headers to be visible
        await expect(this.fileImportsDataTable).toBeVisible();
        const actualHeaders = (await this.headersColumns.allTextContents())
            .map(header => header.trim())
            .filter(header => header !== '');

        expect(actualHeaders).toEqual(expectedHeaders);
    }

    async verifyUserIsAbleToCopyTheSlugOfTheFileImported() {
        await expect(this.fileImportsDataTable).toBeVisible();
        await expect(this.slugColumn.first()).toBeVisible();
        const slugId = await this.slugColumn.first().textContent();
        await this.slugColumn.first().click();
        const copiedSuccessMessage = await this.page.getByText(`Copied ${slugId} to clipboard`);
        await expect(copiedSuccessMessage).toBeVisible();
        await expect(copiedSuccessMessage).toContainText(`Copied ${slugId} to clipboard`);
    }

    async verifyTheHandCursorIsDisplayedWhenUserClickOnDropdownIcon() {
        await expect(this.selectImporterDropdown).toBeVisible();
        await this.selectImporterDropdown.click();
        await expect(this.selectImporterDropdownOptions).toBeVisible();
     
    }

    async verifyFunctionalityOfCrossIconInCopiedSuccessMessage() {
        await expect(this.fileImportsDataTable).toBeVisible();
        await expect(this.slugColumn.first()).toBeVisible();
        const slugId = await this.slugColumn.first().textContent();
        await this.slugColumn.first().click();
        const copiedSuccessMessage = await this.page.getByText(`Copied ${slugId} to clipboard`);
        await expect(copiedSuccessMessage).toBeVisible();
        await expect(copiedSuccessMessage).toContainText(`Copied ${slugId} to clipboard`);
        await expect(this.crossIconInCopiedSuccessMessage).toBeVisible();
        await this.crossIconInCopiedSuccessMessage.click();
        await expect(copiedSuccessMessage).not.toBeVisible();
    }

    async verifyOnHoveringSlugColumnTooltipTextIsDisplayed() {
        await expect(this.fileImportsDataTable).toBeVisible();
        await expect(this.slugColumn.first()).toBeVisible();
        await this.slugColumn.first().hover();
        await expect(this.slugColumnTooltipText).toBeVisible();
        await expect(this.slugColumnTooltipText).toContainText(importsFileData.validations.tooltipText);
    }

    async verifyUserIsAbleToDownloadTheImportedFile() {
        const slugIdOfDownloadedFile = await this.page.getByTestId('rows').last().locator('[data-cy="cell-column"]').nth(1).textContent();
        const downloadPromise = this.page.waitForEvent('download');
        await this.hoverSection.hover();
        await expect(this.downloadButton.last()).toBeVisible();
        await this.downloadButton.last().click();
        const downloadedFile = await downloadPromise;
        expect(downloadedFile).toBeTruthy();
        expect(downloadedFile.suggestedFilename()).toBe(`${slugIdOfDownloadedFile}.csv`);
    }

    async verifyAllTheRowsCountInTheDownloadedFiles() {
        const rowsCount = importsFileData.rowCount;
        await expect(this.fileImportsDataTable).toBeVisible();
        const downloadPromise = this.page.waitForEvent('download');
        await this.hoverSection.hover();
        await expect(this.downloadButton.last()).toBeVisible();
        await this.downloadButton.last().click();
        const downloadedFile = await downloadPromise;
        const filePath = await downloadedFile.path();
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const downloadedRowCount = fileContent
            .split('\n')
            .filter(row => row.trim() !== '')
            .length - 1;
       expect(downloadedRowCount).toBe(rowsCount);

    }

    async verifyFunctionalityOfDeleteButton() {
        await expect(this.fileImportsDataTable).toBeVisible();
        await this.hoverSection.hover();
        await expect(this.deleteButton.last()).toBeVisible();
        await this.deleteButton.last().click();
        await expect(this.deletePopup).toBeVisible();
    }

    async verifyElementsVisibilityInDeletePopup() {
        const elements = [
            this.deletePopupTitle,
            this.deletePopupDescription,
            this.cancelButtonUnderDeletePopup,
            this.yesDeleteButtonUnderDeletePopup,
            this.crossIcon
        ]

        for (const element of elements) {
            await visibilityOfElement(element)
        }
    }

    async verifyFunctionalityOfCancelButtonInDeletePopup() {
        await expect(this.cancelButtonUnderDeletePopup).toBeVisible();
        await expect(this.cancelButtonUnderDeletePopup).toBeEnabled();
        await this.cancelButtonUnderDeletePopup.click();
        await expect(this.deletePopup).not.toBeVisible();
    }

    async verifyFunctionalityOfCrossIconInDeletePopup(){
        await expect(this.crossIcon).toBeVisible();
        await expect(this.crossIcon).toBeEnabled();
        await this.crossIcon.click();
        await expect(this.deletePopup).not.toBeVisible();
    }

    async verifyFunctionalityOfYesDeleteButtonInDeletePopup(){
        await expect(this.yesDeleteButtonUnderDeletePopup).toBeVisible();
        await expect(this.yesDeleteButtonUnderDeletePopup).toBeEnabled();
        await this.yesDeleteButtonUnderDeletePopup.click();
        await expect(this.deletePopup).not.toBeVisible();
        await expect(this.fileDeletedSuccessMessage).toBeVisible();
        await expect(this.fileDeletedSuccessMessage).toContainText(importsFileData.validations.deleteMessage);
    }

}       