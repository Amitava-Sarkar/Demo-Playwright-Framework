import { expect } from '@playwright/test';
import { clickWebElement , inputField , visibilityOfElement} from '../Utils/generalPlaywrightMethods';
import importerData from '../TestData/importer.json' with { type: 'json' };
export class Importer
{
    constructor(page)
    {
        this.page = page;
        this.emailInput = page.locator('#email');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.getByRole('button', { name: 'Sign In', exact: true });
        this.importerHeaderText = page.getByTestId('importerTitle');
        this.fuseLogo = page.locator('svg path[fill="#FD395A"]');
        this.importerTab = page.getByTestId('importersLink');
        this.fileImportTab = page.getByTestId('importsLink');
        this.teamTab = page.getByTestId('teamLink');
        this.brandingTab = page.getByTestId('brandingLink');
        this.developersTab = page.getByTestId('developerLink');
        this.documentTab = page.locator('.ezpezU').last();
        this.menuIcon = page.locator('.eJpXAL');
        this.createImporterText = page.locator('div p.hbNOxr');
        this.subText = page.locator('.XaeTB');
        this.createImporterButton = page.getByTestId('createImporterButton');
        this.uploadCSVPopup = page.locator('div form');
        this.headerText = page.getByText('Upload a clean CSV file to create an importer');
        this.subTextUnderUploadCSVPopup = page.getByText('Upload any .csv, .xls, .xlsx spreadsheet file with any set of columns as long as it has one record per row.');
        this.image = page.locator('g[clip-path="url(#clip0_10_43515)"]');
        this.dragAndDropText = page.getByText('Drag & drop your file here');
        this.browseFileButton = page.getByText('Browse files');
        this.addColumnManuallyLink = page.getByTestId('add-column-manually');
        this.crossIcon = page.getByTestId('close-icon');
        this.importerNamefield = page.getByTestId('html-input');
        this.savebutton = page.getByTestId('createImporterPopupButton');
        this.validationMessage = page.getByText('Importer created successfully');
        this.hoverPlace = page.getByTestId('cell-column').first().locator('..');
        this.deleteButton = page.locator('[data-test-id="delete-button"]').first();
        this.deleteConfirmation = page.getByRole('button', { name: 'Yes, delete' });
        this.deleteSuccessMessage = page.getByText('deleted successfully');
        this.importerBack = page.locator('.ffGlhY');
        this.fileInput = this.page.locator('input[type="file"]');
        this.addColumnButton = page.getByTestId('addAColumn').first();
        this.addColumnPopup = page.locator('div form')
        this.internalKeyField = page.locator('#internal_key');
        this.columnLabel = page.locator('#label');
        this.descriptionInput = page.locator('#description')
        this.columnTypeDField = page.locator('[placeholder="Select option..."]')
        this.dropdownOptions = page.locator('.kSIuag')
        this.columnDropdownOption = page.locator('[data-test-id="autocomplete-menu-item"]');
        this.continueButton = page.getByTestId('continue-button');
        this.addValidationButton = page.getByText('Add another validation')
        this.validationDropdown = page.locator('[placeholder="Select option"]').last()
        this.errorMessageField = page.locator('[placeholder="Edit error message"]').last()
        this.enterValueField = page.locator('[placeholder="Enter value"]')
        this.deleteValidation = page.getByText('Delete validation');
        this.deleteTransformation = page.getByText('Delete transformation');
        this.columnAddedPopup = page.locator('.gSoUCp');
        this.gotItButton = page.getByTestId('gotItButton');
        this.ImporterCreationSuccessMessage = page.getByText(importerData.validation.ImporterCreationSuccessMessage);
        this.editImporterNameButton = page.getByTestId('template-edit-button')
        this.editImporterPopup = page.locator('div form')
        this.importerNameField = page.locator('#name')
        this.cognitoToggle = page.getByTestId('toggle-incognito')
        this.importerEditIcon = page.locator('.sMzAp').first()
        this.saveButton = page.getByRole('button', { name: 'Save' })
        this.importerUpdatedValidation = page.getByText(importerData.validation.importerUpdatedSuccessMessage)
        this.importFileButton = page.getByRole('button', { name: 'Import File' })
        this.columnHoverPlace = page.getByTestId('cell-column').last().locator('..')
        this.columnEditIcon = page.locator('.sMzAp').last()
        this.editColumnPopup = page.locator('div form')
        this.dropdownTypeColumn = page.locator('[data-test-id="autocomplete-menu-item"]').filter({ hasText: 'Dropdown (select one)' })
        this.dropdownValuesField1 = page.locator('#values\\.0')
        this.dropdownValuesField2 = page.locator('#values\\.1')
        this.addValueButton = page.getByTestId('addButton')
        this.columnTypeColumn = page.getByTestId('column_type').filter({ hasText: 'Dropdown (select one)' })
        this.columnTypeSection = page.getByTestId('column_type').last()
        this.columnDeleteIcon = page.locator('[data-test-id="delete-button"]').last()
        this.deleteSuccessValidation = page.getByText(importerData.validation.columnDeletedSuccessMessage)
        this.undoDeletionButton = page.getByText('Undo')
        this.undoDeletionSuccessValidation = page.getByText(importerData.validation.columnUndeletedSuccessMessage)
        this.floatTypeColumn = page.locator('[data-test-id="autocomplete-menu-item"]').filter({ hasText: 'Float' })
        this.booleanTypeColumn = page.locator('[data-test-id="autocomplete-menu-item"]').filter({ hasText: 'Boolean' })
        this.emailTypeColumn = page.locator('[data-test-id="autocomplete-menu-item"]').filter({ hasText: 'Email' })
        this.urlTypeColumn = page.locator('[data-test-id="autocomplete-menu-item"]').filter({ hasText: 'Url' })
        this.dateTypeColumn = page.locator('[data-test-id="autocomplete-menu-item"]').filter({ hasText:  /^Date$/  })
        this.patternDropdown = page.locator('div input').last()
        this.dateTimeTypeColumn = page.locator('[data-test-id="autocomplete-menu-item"]').filter({ hasText:  /^Date Time$/  })
        this.timeTypeColumn = page.locator('[data-test-id="autocomplete-menu-item"]').filter({ hasText:  /^Time$/  })
    }

    async navigateToImporterPage() {
        await this.page.goto('/');
        await expect(this.page).toHaveURL(/account\/importers/, { timeout: 6000 });
        await expect(this.importerHeaderText).toBeVisible();
    }

    async elementVisibility() {
          const elements = [ this.importerHeaderText, this.fuseLogo, this.importerTab, this.fileImportTab, this.teamTab, this.brandingTab,
          this.developersTab, this.documentTab,this.createImporterText, this.menuIcon, this.subText, this.createImporterButton ];
      
          for (const element of elements) {
            await visibilityOfElement(element);
          }
        }


    async clickOnCreateImporterButton(){
        await clickWebElement(this.createImporterButton);
        await expect(this.uploadCSVPopup).toBeVisible();
    }

    async elementVisibilityOfUploadCSVButton(){
        const elements = [ this.headerText, this.subTextUnderUploadCSVPopup, this.image, this.dragAndDropText, this.browseFileButton,
            this.addColumnManuallyLink,  this.crossIcon ];
      
        for (const element of elements) {
          await visibilityOfElement(element);
        }

    }

    async importerCreation(input){
        await clickWebElement(this.addColumnManuallyLink);
        await inputField(this.importerNamefield,input)
        await clickWebElement(this.savebutton);
        await expect(this.validationMessage).toBeVisible();
   
    }

    async importerDeletion(){
        await clickWebElement(this.importerBack);
        await this.hoverPlace.hover();
        await this.deleteButton.hover();
        await clickWebElement(this.deleteButton);
        await clickWebElement(this.deleteConfirmation);
        await expect(this.deleteSuccessMessage).toBeVisible();


    }

    async importerCreationViaUploadingFile(filePath){
        await this.fileInput.setInputFiles(filePath);
        await expect(this.ImporterCreationSuccessMessage).toBeVisible();
        await expect(this.ImporterCreationSuccessMessage).toContainText(importerData.validation.ImporterCreationSuccessMessage);
    }

    async editImporterName(){
        
        await clickWebElement(this.importerBack);
        await expect(this.page).toHaveURL(/\account\/importers\/?$/, {timeout: 60000})
        await this.hoverPlace.hover();
        await this.importerEditIcon.hover();
        await clickWebElement(this.importerEditIcon);
        await expect(this.editImporterPopup).toBeVisible();
        await this.importerNameField.fill(importerData.editImporterName);
        await expect(this.importerNameField).toHaveValue(importerData.editImporterName);
        await this.cognitoToggle.click();
        await expect(this.cognitoToggle).toHaveAttribute('data-value', 'true');
        await expect(this.saveButton).toBeEnabled();
        await this.saveButton.click();
        await expect(this.importerUpdatedValidation).toBeVisible();
        await expect(this.importerUpdatedValidation).toContainText(importerData.validation.importerUpdatedSuccessMessage);
        await this.hoverPlace.hover();
        await this.page.waitForTimeout(2000); //waiting for the importer to be hovered
        await this.deleteButton.hover();
        await clickWebElement(this.deleteButton);
        await clickWebElement(this.deleteConfirmation);
        await expect(this.deleteSuccessMessage).toBeVisible();
    }
    
    async addColumnFunctionality(input){
        await clickWebElement(this.addColumnButton);
        await inputField(this.internalKeyField,input);
        await inputField(this.columnLabel,input);
        await clickWebElement(this.columnTypeDField);
        await clickWebElement(this.columnDropdownOption.first());
        await clickWebElement(this.continueButton);
        await clickWebElement(this.deleteValidation);
        await clickWebElement(this.continueButton);
        await clickWebElement(this.deleteTransformation);
        await clickWebElement(this.continueButton);
        await expect(this.columnAddedPopup).toBeVisible();
        await clickWebElement(this.gotItButton);
    }

    async addColumnFunctionalityWithValidation(){
        await this.addColumnButton.click();
        await expect(this.addColumnPopup).toBeVisible();
        await expect(this.internalKeyField).toBeVisible();
        await this.internalKeyField.fill(importerData.input);
        await expect(this.internalKeyField).toHaveValue(importerData.input);
        await expect(this.columnLabel).toBeVisible();
        await this.columnLabel.fill(importerData.columnInput);
        await expect(this.columnLabel).toHaveValue(importerData.columnInput);
        await expect(this.descriptionInput).toBeVisible();
        await this.descriptionInput.fill(importerData.descriptionInput);
        await expect(this.descriptionInput).toHaveValue(importerData.descriptionInput);
        await this.columnTypeDField.click();
        await expect(this.dropdownOptions).toBeVisible();
        await this.columnDropdownOption.nth(1).click();
        await expect(this.continueButton).toBeEnabled();
        await this.continueButton.click();
        await this.addValidationButton.click();
        await expect(this.validationDropdown).toBeVisible();
        await this.validationDropdown.click();
        await expect(this.dropdownOptions).toBeVisible();
        await this.columnDropdownOption.first().click();
        await expect(this.errorMessageField).toBeVisible();
        await expect(this.enterValueField).toBeVisible();
        await this.enterValueField.fill('20');
        await expect(this.enterValueField).toHaveValue('20');
        await expect(this.errorMessageField).toHaveValue('Must Be Less Than');
        await expect(this.continueButton).toBeEnabled();
        await this.continueButton.click();
        await this.continueButton.click();
        await expect(this.columnAddedPopup).toBeVisible();
        await this.gotItButton.click();
    }

    async verifyImportFileButtonIsDisabled(){
        await expect(this.importFileButton).toBeVisible()
        await expect(this.importFileButton).toHaveAttribute('disabled', '')
    }

    async verifyImportFileButtonIsEnabled(){
        await expect(this.importFileButton).toBeVisible()
        await expect(this.importFileButton).toBeEnabled()
        await expect(this.importFileButton).not.toHaveAttribute('disabled', '')
    }

    async columnEditFunctionality(){
        await this.page.waitForTimeout(5000); //waiting for the column to be hovered
        await this.columnHoverPlace.hover();
        await this.columnEditIcon.hover();
        await this.columnEditIcon.click();
        await expect(this.editColumnPopup).toBeVisible();
        await expect(this.columnTypeDField.first()).toBeVisible();
        await this.columnTypeDField.first().click();
        await expect(this.dropdownOptions).toBeVisible();
        await this.dropdownTypeColumn.click();
        await expect(this.columnTypeDField.first()).toHaveValue('Dropdown (select one)');
        await expect(this.dropdownValuesField1).toBeVisible();
        await this.dropdownValuesField1.fill('Value 1');
        await expect(this.dropdownValuesField1).toHaveValue('Value 1');
        await expect(this.addValueButton).toBeVisible();
        await this.addValueButton.click();
        await this.dropdownValuesField2.fill('Value 2');
        await expect(this.dropdownValuesField2).toHaveValue('Value 2');
        await expect(this.continueButton).toBeEnabled();
        await this.continueButton.click();
        await expect(this.deleteValidation).toBeVisible();
        await this.deleteValidation.click();
        await expect(this.continueButton).toBeEnabled();
        await this.continueButton.click();
        await expect(this.columnAddedPopup).toBeVisible();
        await this.gotItButton.click();
        await expect(this.columnAddedPopup).not.toBeVisible();
        await expect(this.columnTypeColumn.first()).toHaveText('Dropdown (select one)');
        
    }

    async columnDeleteFunctionality(){
        await this.columnHoverPlace.hover();
        await this.page.waitForTimeout(5000); //waiting for the column to be hovered    
        await this.columnDeleteIcon.hover();
        await this.columnDeleteIcon.click();
        await expect(this.deleteSuccessValidation).toBeVisible();
        await expect(this.deleteSuccessValidation).toContainText(importerData.validation.columnDeletedSuccessMessage);
    }

    async columnUndoDeletionFunctionality(){
        await expect(this.undoDeletionButton).toBeVisible();
        await this.undoDeletionButton.click();
        await expect(this.undoDeletionSuccessValidation).toBeVisible();
        await expect(this.undoDeletionSuccessValidation).toContainText(importerData.validation.columnUndeletedSuccessMessage);
    }

    async stringTypeColumnCreation(input){
        await this.addColumnFunctionality(input)
        await expect(this.columnTypeSection).toHaveText('String')
    }

    async integerTypeColumnCreation(input){
        await this.addColumnFunctionalityWithValidation(input)
        await expect(this.columnTypeSection).toHaveText('Integer')
    }

    async floatTypeColumnCreation(){
        await expect(this.addColumnButton).toBeVisible();
        await this.addColumnButton.click();
        await expect(this.addColumnPopup).toBeVisible();
        await expect(this.internalKeyField).toBeVisible();
        await this.internalKeyField.fill(importerData.input);
        await expect(this.internalKeyField).toHaveValue(importerData.input);
        await expect(this.columnLabel).toBeVisible();
        await this.columnLabel.fill(importerData.columnInput);
        await expect(this.columnLabel).toHaveValue(importerData.columnInput);
        await expect(this.descriptionInput).toBeVisible();
        await this.descriptionInput.fill(importerData.descriptionInput);
        await expect(this.descriptionInput).toHaveValue(importerData.descriptionInput);
        await this.columnTypeDField.click();
        await expect(this.dropdownOptions).toBeVisible();
        await this.floatTypeColumn.click();
        await expect(this.columnTypeDField).toHaveValue('Float')
        await expect(this.continueButton).toBeEnabled();
        await this.continueButton.click();
        await expect(this.continueButton).toBeEnabled();
        await this.continueButton.click();
        await expect(this.deleteTransformation).toBeVisible();
        await this.deleteTransformation.click();
        await expect(this.continueButton).toBeEnabled();
        await this.continueButton.click();
        await expect(this.columnAddedPopup).toBeVisible();
        await this.gotItButton.click();
        await expect(this.columnAddedPopup).not.toBeVisible();
        await expect(this.columnTypeSection).toHaveText('Float')
    }

    async booleanTypeColumnCreation(){
        await expect(this.addColumnButton).toBeVisible();
        await this.addColumnButton.click();
        await expect(this.addColumnPopup).toBeVisible();
        await expect(this.internalKeyField).toBeVisible();
        await this.internalKeyField.fill(importerData.input);
        await expect(this.internalKeyField).toHaveValue(importerData.input);
        await expect(this.columnLabel).toBeVisible();
        await this.columnLabel.fill(importerData.columnInput);
        await expect(this.columnLabel).toHaveValue(importerData.columnInput);
        await expect(this.descriptionInput).toBeVisible();
        await this.descriptionInput.fill(importerData.descriptionInput);
        await expect(this.descriptionInput).toHaveValue(importerData.descriptionInput);
        await this.columnTypeDField.click();
        await expect(this.dropdownOptions).toBeVisible();
        await this.booleanTypeColumn.click();
        await expect(this.columnTypeDField).toHaveValue('Boolean')
        await expect(this.continueButton).toBeEnabled();
        await this.continueButton.click();
        await expect(this.continueButton).toBeEnabled();
        await this.continueButton.click();
        await expect(this.columnAddedPopup).toBeVisible();
        await this.gotItButton.click();
        await expect(this.columnAddedPopup).not.toBeVisible();
        await expect(this.columnTypeSection).toHaveText('Boolean')
    }

    async emailTypeColumnCreation(){
        await expect(this.addColumnButton).toBeVisible();
        await this.addColumnButton.click();
        await expect(this.addColumnPopup).toBeVisible();
        await expect(this.internalKeyField).toBeVisible();
        await this.internalKeyField.fill(importerData.input);
        await expect(this.internalKeyField).toHaveValue(importerData.input);
        await expect(this.columnLabel).toBeVisible();
        await this.columnLabel.fill(importerData.columnInput);
        await expect(this.columnLabel).toHaveValue(importerData.columnInput);
        await expect(this.descriptionInput).toBeVisible();
        await this.descriptionInput.fill(importerData.descriptionInput);
        await expect(this.descriptionInput).toHaveValue(importerData.descriptionInput);
        await this.columnTypeDField.click();
        await expect(this.dropdownOptions).toBeVisible();
        await this.emailTypeColumn.click();
        await expect(this.columnTypeDField).toHaveValue('Email')
        await expect(this.continueButton).toBeEnabled();
        await this.continueButton.click();
        await expect(this.continueButton).toBeEnabled();
        await this.continueButton.click();
        await expect(this.columnAddedPopup).toBeVisible();
        await this.gotItButton.click();
        await expect(this.columnAddedPopup).not.toBeVisible();
        await expect(this.columnTypeSection).toHaveText('Email')
    }

    async urlTypeColumnCreation(){
        await expect(this.addColumnButton).toBeVisible();
        await this.addColumnButton.click();
        await expect(this.addColumnPopup).toBeVisible();
        await expect(this.internalKeyField).toBeVisible();
        await this.internalKeyField.fill(importerData.input);
        await expect(this.internalKeyField).toHaveValue(importerData.input);
        await expect(this.columnLabel).toBeVisible();
        await this.columnLabel.fill(importerData.columnInput);
        await expect(this.columnLabel).toHaveValue(importerData.columnInput);
        await expect(this.descriptionInput).toBeVisible();
        await this.descriptionInput.fill(importerData.descriptionInput);
        await expect(this.descriptionInput).toHaveValue(importerData.descriptionInput);
        await this.columnTypeDField.click();
        await expect(this.dropdownOptions).toBeVisible();
        await this.urlTypeColumn.click();
        await expect(this.columnTypeDField).toHaveValue('Url')
        await expect(this.continueButton).toBeEnabled();
        await this.continueButton.click();
        await expect(this.continueButton).toBeEnabled();
        await this.continueButton.click();
        await expect(this.deleteTransformation).toBeVisible();
        await this.deleteTransformation.click();
        await expect(this.continueButton).toBeEnabled();
        await this.continueButton.click();
        await expect(this.columnAddedPopup).toBeVisible();
        await this.gotItButton.click();
        await expect(this.columnAddedPopup).not.toBeVisible();
        await expect(this.columnTypeSection).toHaveText('Url')
    }

    async dropdownTypeColumnCreation(){
        await expect(this.addColumnButton).toBeVisible();
        await this.addColumnButton.click();
        await expect(this.addColumnPopup).toBeVisible();
        await expect(this.internalKeyField).toBeVisible();
        await this.internalKeyField.fill(importerData.input);
        await expect(this.internalKeyField).toHaveValue(importerData.input);
        await expect(this.columnLabel).toBeVisible();
        await this.columnLabel.fill(importerData.columnInput);
        await expect(this.columnLabel).toHaveValue(importerData.columnInput);
        await expect(this.columnTypeDField).toBeVisible();
        await this.columnTypeDField.click();
        await expect(this.dropdownOptions).toBeVisible();
        await this.dropdownTypeColumn.click();
        await expect(this.columnTypeDField).toHaveValue('Dropdown (select one)');
        await expect(this.dropdownValuesField1).toBeVisible();
        await this.dropdownValuesField1.fill('Value 1');
        await expect(this.dropdownValuesField1).toHaveValue('Value 1');
        await expect(this.addValueButton).toBeVisible();
        await this.addValueButton.click();
        await this.dropdownValuesField2.fill('Value 2');
        await expect(this.dropdownValuesField2).toHaveValue('Value 2');
        await expect(this.continueButton).toBeEnabled();
        await this.continueButton.click();
        await expect(this.deleteValidation).toBeVisible();
        await this.deleteValidation.click();
        await expect(this.continueButton).toBeEnabled();
        await this.continueButton.click();
        await expect(this.columnAddedPopup).toBeVisible();
        await this.gotItButton.click();
        await expect(this.columnAddedPopup).not.toBeVisible();
        await expect(this.columnTypeSection).toHaveText('Dropdown (select one)');
    }

    async dateTypeColumnCreation(){
        await expect(this.addColumnButton).toBeVisible();
        await this.addColumnButton.click();
        await expect(this.addColumnPopup).toBeVisible();
        await expect(this.internalKeyField).toBeVisible();
        await this.internalKeyField.fill(importerData.input);
        await expect(this.internalKeyField).toHaveValue(importerData.input);
        await expect(this.columnLabel).toBeVisible();
        await this.columnLabel.fill(importerData.columnInput);
        await expect(this.columnLabel).toHaveValue(importerData.columnInput);
        await expect(this.columnTypeDField).toBeVisible();
        await this.columnTypeDField.click();
        await expect(this.dropdownOptions).toBeVisible();
        await this.dateTypeColumn.click();
        await expect(this.columnTypeDField.first()).toHaveValue('Date')
        await expect(this.patternDropdown).toBeVisible();
        await this.patternDropdown.click();
        await expect(this.dropdownOptions).toBeVisible();
        await this.columnDropdownOption.first().click();
        await expect(this.patternDropdown).toHaveValue('MM/dd/yyyy (e.g. 08/31/2023)')
        await expect(this.continueButton).toBeEnabled();
        await this.continueButton.click();
        await expect(this.continueButton).toBeEnabled();
        await this.continueButton.click();
        await expect(this.continueButton).toBeEnabled();
        await this.continueButton.click();
        await expect(this.columnAddedPopup).toBeVisible();
        await this.gotItButton.click();
        await expect(this.columnAddedPopup).not.toBeVisible();
        await expect(this.columnTypeSection).toHaveText('Date')
    }

    async dateTimeTypeColumnCreation(){
        await expect(this.addColumnButton).toBeVisible();
        await this.addColumnButton.click();
        await expect(this.addColumnPopup).toBeVisible();
        await expect(this.internalKeyField).toBeVisible();
        await this.internalKeyField.fill(importerData.input);
        await expect(this.internalKeyField).toHaveValue(importerData.input);
        await expect(this.columnLabel).toBeVisible();
        await this.columnLabel.fill(importerData.columnInput);
        await expect(this.columnLabel).toHaveValue(importerData.columnInput);
        await expect(this.columnTypeDField).toBeVisible();
        await this.columnTypeDField.click();
        await expect(this.dropdownOptions).toBeVisible();
        await this.dateTimeTypeColumn.click();
        await expect(this.columnTypeDField.first()).toHaveValue('Date Time')
        await expect(this.patternDropdown).toBeVisible();
        await this.patternDropdown.click();
        await expect(this.dropdownOptions).toBeVisible();
        await this.columnDropdownOption.first().click();
        await expect(this.patternDropdown).toHaveValue('MM/dd/yyyy HH:mm (e.g. 08/31/2023 12:30)')
        await expect(this.continueButton).toBeEnabled();
        await this.continueButton.click();
        await expect(this.continueButton).toBeEnabled();
        await this.continueButton.click();
        await expect(this.continueButton).toBeEnabled();
        await this.continueButton.click();
        await expect(this.columnAddedPopup).toBeVisible();
        await this.gotItButton.click();
        await expect(this.columnAddedPopup).not.toBeVisible();
        await expect(this.columnTypeSection).toHaveText('Date Time')
    }

    async timeTypeColumnCreation(){
        await expect(this.addColumnButton).toBeVisible();
        await this.addColumnButton.click();
        await expect(this.addColumnPopup).toBeVisible();
        await expect(this.internalKeyField).toBeVisible();
        await this.internalKeyField.fill(importerData.input);
        await expect(this.internalKeyField).toHaveValue(importerData.input);
        await expect(this.columnLabel).toBeVisible();
        await this.columnLabel.fill(importerData.columnInput);
        await expect(this.columnLabel).toHaveValue(importerData.columnInput);
        await expect(this.columnTypeDField).toBeVisible();
        await this.columnTypeDField.click();
        await expect(this.dropdownOptions).toBeVisible();
        await this.timeTypeColumn.click();
        await expect(this.columnTypeDField.first()).toHaveValue('Time')
        await expect(this.patternDropdown).toBeVisible();
        await this.patternDropdown.click();
        await expect(this.dropdownOptions).toBeVisible();
        await this.columnDropdownOption.first().click();
        await expect(this.patternDropdown).toHaveValue('HH:mm (e.g. 12:30)')
        await expect(this.continueButton).toBeEnabled();
        await this.continueButton.click();
        await expect(this.continueButton).toBeEnabled();
        await this.continueButton.click();
        await expect(this.continueButton).toBeEnabled();
        await this.continueButton.click();
        await expect(this.columnAddedPopup).toBeVisible();
        await this.gotItButton.click();
        await expect(this.columnAddedPopup).not.toBeVisible();
        await expect(this.columnTypeSection).toHaveText('Time')
    }

    async selectingDateTypeColumn(){
        await expect(this.addColumnButton).toBeVisible();
        await this.addColumnButton.click();
        await expect(this.addColumnPopup).toBeVisible();
        await expect(this.internalKeyField).toBeVisible();
        await this.internalKeyField.fill(importerData.input);
        await expect(this.internalKeyField).toHaveValue(importerData.input);
        await expect(this.columnLabel).toBeVisible();
        await this.columnLabel.fill(importerData.columnInput);
        await expect(this.columnLabel).toHaveValue(importerData.columnInput);
        await expect(this.columnTypeDField).toBeVisible();
        await this.columnTypeDField.click();
        await expect(this.dropdownOptions).toBeVisible();
        await this.dateTypeColumn.click();
        await expect(this.columnTypeDField.first()).toHaveValue('Date')
    }

    async finishingTheColumnCreation(){
        await expect(this.continueButton).toBeEnabled();
        await this.continueButton.click();
        await expect(this.continueButton).toBeEnabled();
        await this.continueButton.click();
        await expect(this.continueButton).toBeEnabled();
        await this.continueButton.click();
        await expect(this.columnAddedPopup).toBeVisible();
        await this.gotItButton.click();
        await expect(this.columnAddedPopup).not.toBeVisible();
    }

    async dateTypeColumnWithFormatMMDdYyyy(){
        await this.selectingDateTypeColumn();
        await this.patternDropdown.click();
        await expect(this.dropdownOptions).toBeVisible();
        await this.columnDropdownOption.first().click();
        await expect(this.patternDropdown).toHaveValue('MM/dd/yyyy (e.g. 08/31/2023)')
        await this.finishingTheColumnCreation();
    }

    async dateTypeColumnWithFormatMMMDdYyyy(){
        await this.selectingDateTypeColumn();
        await this.patternDropdown.click();
        await expect(this.dropdownOptions).toBeVisible();
        await this.columnDropdownOption.nth(1).click();
        await expect(this.patternDropdown).toHaveValue('MMM dd yyyy (e.g. Jan 15 1990)')
        await this.finishingTheColumnCreation();
    }

    async dateTypeColumnWithFormatYyyyMMDd(){
        await this.selectingDateTypeColumn();
        await this.patternDropdown.click();
        await expect(this.dropdownOptions).toBeVisible();
        await this.columnDropdownOption.nth(2).click();
        await expect(this.patternDropdown).toHaveValue('yyyy-MM-dd (e.g. 2023-08-31)')
        await this.finishingTheColumnCreation();
    }

    async dateTypeColumnWithFormatDdMMYyyy(){
        await this.selectingDateTypeColumn();
        await this.patternDropdown.click();
        await expect(this.dropdownOptions).toBeVisible();
        await this.columnDropdownOption.nth(3).click();
        await expect(this.patternDropdown).toHaveValue('dd/MM/yyyy (e.g. 31/08/2023)')
        await this.finishingTheColumnCreation();
    }

    async dateTypeColumnWithFormatMMDdYyyy(){
        await this.selectingDateTypeColumn();
        await this.patternDropdown.click();
        await expect(this.dropdownOptions).toBeVisible();
        await this.columnDropdownOption.nth(4).click();
        await expect(this.patternDropdown).toHaveValue('MM-dd-yyyy (e.g. 08-31-2023)')
        await this.finishingTheColumnCreation();
    }

    async dateTypeColumnWithFormatYyyyMMDd(){
        await this.selectingDateTypeColumn();
        await this.patternDropdown.click();
        await expect(this.dropdownOptions).toBeVisible();
        await this.columnDropdownOption.nth(5).click();
        await expect(this.patternDropdown).toHaveValue('yyyy/MM/dd (e.g. 2023/08/31)')
        await this.finishingTheColumnCreation();
    }

    async dateTypeColumnWithFormatDdMMMMYyyy(){
        await this.selectingDateTypeColumn();
        await this.patternDropdown.click();
        await expect(this.dropdownOptions).toBeVisible();
        await this.columnDropdownOption.nth(6).click();
        await expect(this.patternDropdown).toHaveValue('dd-MMMM-yyyy (e.g. 31-August-2023)')
        await this.finishingTheColumnCreation();
    }

    async dateTypeColumnWithFormatMMMMDdCommaYyyy(){
        await this.selectingDateTypeColumn();
        await this.patternDropdown.click();
        await expect(this.dropdownOptions).toBeVisible();
        await this.columnDropdownOption.nth(7).click();
        await expect(this.patternDropdown).toHaveValue('MMMM dd, yyyy (e.g. August 31, 2023)')
        await this.finishingTheColumnCreation();
    }

    async dateTypeColumnWithFormatDdMMYy(){
        await this.selectingDateTypeColumn();
        await this.patternDropdown.click();
        await expect(this.dropdownOptions).toBeVisible();
        await this.columnDropdownOption.nth(8).click();
        await expect(this.patternDropdown).toHaveValue('dd/MM/yy (e.g. 31/08/23)')
        await this.finishingTheColumnCreation();
    }

    async dateTypeColumnWithFormatMMMMDdCommaYy(){
        await this.selectingDateTypeColumn();
        await this.patternDropdown.click();
        await expect(this.dropdownOptions).toBeVisible();
        await this.columnDropdownOption.nth(9).click();
        await expect(this.patternDropdown).toHaveValue('MMMM dd, yy (e.g. August 31, 23)')
        await this.finishingTheColumnCreation();
    }

    async dateTypeColumnWithFormatYyMMDd(){
        await this.selectingDateTypeColumn();
        await this.patternDropdown.click();
        await expect(this.dropdownOptions).toBeVisible();
        await this.columnDropdownOption.nth(10).click();
        await expect(this.patternDropdown).toHaveValue('yy/MM/dd (e.g. 23/08/31)')
        await this.finishingTheColumnCreation();
    }

    async dateTypeColumnWithFormatMMDdYy(){
        await this.selectingDateTypeColumn();
        await this.patternDropdown.click();
        await expect(this.dropdownOptions).toBeVisible();
        await this.columnDropdownOption.nth(11).click();
        await expect(this.patternDropdown).toHaveValue('MM-dd-yy (e.g. 01-15-90)')
        await this.finishingTheColumnCreation();
    }

    async dateTypeColumnWithFormatMDdYy(){
        await this.selectingDateTypeColumn();
        await this.patternDropdown.click();
        await expect(this.dropdownOptions).toBeVisible();
        await this.columnDropdownOption.nth(12).click();
        await expect(this.patternDropdown).toHaveValue('M-dd-yy (e.g. 1-15-90)')
        await this.finishingTheColumnCreation();
    }

    async dateTypeColumnWithFormatDdMMYy(){
        await this.selectingDateTypeColumn();
        await this.patternDropdown.click();
        await expect(this.dropdownOptions).toBeVisible();
        await this.columnDropdownOption.nth(13).click();
        await expect(this.patternDropdown).toHaveValue('dd-MM-yy (e.g. 15-01-90)')
        await this.finishingTheColumnCreation();
    }

    async dateTypeColumnWithFormatDdMMYyyy(){
        await this.selectingDateTypeColumn();
        await this.patternDropdown.click();
        await expect(this.dropdownOptions).toBeVisible();
        await this.columnDropdownOption.nth(14).click();
        await expect(this.patternDropdown).toHaveValue('dd-MM-yyyy (e.g. 15-01-1990)')
        await this.finishingTheColumnCreation();
    }

    async dateTypeColumnWithFormatDdMYy(){
        await this.selectingDateTypeColumn();
        await this.patternDropdown.click();
        await expect(this.dropdownOptions).toBeVisible();
        await this.columnDropdownOption.nth(15).click();
        await expect(this.patternDropdown).toHaveValue('dd-M-yy (e.g. 15-1-90)')
        await this.finishingTheColumnCreation();
    }

    async dateTypeColumnWithFormatMMDdYy(){
        await this.selectingDateTypeColumn();
        await this.patternDropdown.click();
        await expect(this.dropdownOptions).toBeVisible();
        await this.columnDropdownOption.nth(16).click();
        await expect(this.patternDropdown).toHaveValue('MM/dd/yy (e.g. 01/15/90)')
        await this.finishingTheColumnCreation();
    }

    async dateTypeColumnWithFormatMDdYy(){
        await this.selectingDateTypeColumn();
        await this.patternDropdown.click();
        await expect(this.dropdownOptions).toBeVisible();
        await this.columnDropdownOption.nth(17).click();
        await expect(this.patternDropdown).toHaveValue('M/dd/yy (e.g. 1/15/90)')
        await this.finishingTheColumnCreation();
    }

    async dateTypeColumnWithFormatMMDotDdDotYy(){
        await this.selectingDateTypeColumn();
        await this.patternDropdown.click();
        await expect(this.dropdownOptions).toBeVisible();
        await this.columnDropdownOption.nth(18).click();
        await expect(this.patternDropdown).toHaveValue('MM.dd.yy (e.g. 01.15.90)')
        await this.finishingTheColumnCreation();
    }

    async dateTypeColumnWithFormatMDotDdDotYy(){
        await this.selectingDateTypeColumn();
        await this.patternDropdown.click();
        await expect(this.dropdownOptions).toBeVisible();
        await this.columnDropdownOption.nth(19).click();
        await expect(this.patternDropdown).toHaveValue('M.dd.yy (e.g. 1.15.90)')
        await this.finishingTheColumnCreation();
    }

    async dateTypeColumnWithFormatMMMDdYy(){
        await this.selectingDateTypeColumn();
        await this.patternDropdown.click();
        await expect(this.dropdownOptions).toBeVisible();
        await this.columnDropdownOption.nth(20).click();
        await expect(this.patternDropdown).toHaveValue('MMM-dd-yy (e.g. Jan-15-90)')
        await this.finishingTheColumnCreation();
    }

    async dateTypeColumnWithFormatMMMMDdYy(){
        await this.selectingDateTypeColumn();
        await this.patternDropdown.click();
        await expect(this.dropdownOptions).toBeVisible();
        await this.columnDropdownOption.nth(21).click();
        await expect(this.patternDropdown).toHaveValue('MMMM-dd-yy (e.g. January-15-90)')
        await this.finishingTheColumnCreation();
    }

    async dateTypeColumnWithFormatDdMMMYy(){
        await this.selectingDateTypeColumn();
        await this.patternDropdown.click();
        await expect(this.dropdownOptions).toBeVisible();
        await this.columnDropdownOption.nth(22).click();
        await expect(this.patternDropdown).toHaveValue('dd-MMM-yy (e.g. 15-Jan-90)')
        await this.finishingTheColumnCreation();
    }

    async dateTypeColumnWithFormatYyyyDashMDashDd(){
        await this.selectingDateTypeColumn();
        await this.patternDropdown.click();
        await expect(this.dropdownOptions).toBeVisible();
        await this.columnDropdownOption.nth(23).click();
        await expect(this.patternDropdown).toHaveValue('yyyy-M-dd (e.g. 1990-1-15)')
        await this.finishingTheColumnCreation();
    }

    async dateTypeColumnWithFormatMDashDdDashYyyy(){
        await this.selectingDateTypeColumn();
        await this.patternDropdown.click();
        await expect(this.dropdownOptions).toBeVisible();
        await this.columnDropdownOption.nth(24).click();
        await expect(this.patternDropdown).toHaveValue('M-dd-yyyy (e.g. 1-15-1990)')
        await this.finishingTheColumnCreation();
    }

    async dateTypeColumnWithFormatMDdYyyy(){
        await this.selectingDateTypeColumn();
        await this.patternDropdown.click();
        await expect(this.dropdownOptions).toBeVisible();
        await this.columnDropdownOption.nth(25).click();
        await expect(this.patternDropdown).toHaveValue('M/dd/yyyy (e.g. 1/15/1990)')
        await this.finishingTheColumnCreation();
    }

    async dateTypeColumnWithFormatDdMYyyy(){
        await this.selectingDateTypeColumn();
        await this.patternDropdown.click();
        await expect(this.dropdownOptions).toBeVisible();
        await this.columnDropdownOption.nth(26).click();
        await expect(this.patternDropdown).toHaveValue('dd/M/yyyy (e.g. 15/1/1990)')
        await this.finishingTheColumnCreation();
    }

    async dateTypeColumnWithFormatYyyyMDd(){
        await this.selectingDateTypeColumn();
        await this.patternDropdown.click();
        await expect(this.dropdownOptions).toBeVisible();
        await this.columnDropdownOption.nth(27).click();
        await expect(this.patternDropdown).toHaveValue('yyyy/M/dd (e.g. 1990/1/15)')
        await this.finishingTheColumnCreation();
    }   

    async dateTypeColumnWithFormatDdDotMMDotYyyy(){
        await this.selectingDateTypeColumn();
        await this.patternDropdown.click();
        await expect(this.dropdownOptions).toBeVisible();
        await this.columnDropdownOption.nth(28).click();
        await expect(this.patternDropdown).toHaveValue('dd.MM.yyyy (e.g. 15.01.1990)')
        await this.finishingTheColumnCreation();
    }

    async dateTypeColumnWithFormatDdDotMDotYyyy(){
        await this.selectingDateTypeColumn();
        await this.patternDropdown.click();
        await expect(this.dropdownOptions).toBeVisible();
        await this.columnDropdownOption.nth(29).click();
        await expect(this.patternDropdown).toHaveValue('dd.M.yyyy (e.g. 15.1.1990)')
        await this.finishingTheColumnCreation();
    }

    async dateTypeColumnWithFormatYyyyDotMMDotDd(){
        await this.selectingDateTypeColumn();
        await this.patternDropdown.click();
        await expect(this.dropdownOptions).toBeVisible();
        await this.columnDropdownOption.nth(30).click();
        await expect(this.patternDropdown).toHaveValue('yyyy.MM.dd (e.g. 1990.01.15)')
        await this.finishingTheColumnCreation();
    }

    async dateTypeColumnWithFormatYyyyDotMDotDd(){
        await this.selectingDateTypeColumn();
        await this.patternDropdown.click();
        await expect(this.dropdownOptions).toBeVisible();
        await this.columnDropdownOption.nth(31).click();
        await expect(this.patternDropdown).toHaveValue('yyyy.M.dd (e.g. 1990.1.15)')
        await this.finishingTheColumnCreation();
    }

    async dateTypeColumnWithFormatMMMDotDdCommaYyyy(){
        await this.selectingDateTypeColumn();
        await this.patternDropdown.click();
        await expect(this.dropdownOptions).toBeVisible();
        await this.columnDropdownOption.nth(32).click();
        await expect(this.patternDropdown).toHaveValue('MMM. dd, yyyy (e.g. Jan. 15, 1990)')
        await this.finishingTheColumnCreation();
    }

    async dateTypeColumnWithFormatDdMMMDotYyyy(){
        await this.selectingDateTypeColumn();
        await this.patternDropdown.click();
        await expect(this.dropdownOptions).toBeVisible();
        await this.columnDropdownOption.nth(33).click();
        await expect(this.patternDropdown).toHaveValue('dd MMM. yyyy (e.g. 15 Jan. 1990)')
        await this.finishingTheColumnCreation();
    }

    async dateTypeColumnWithFormatMMMDd(){
        await this.selectingDateTypeColumn();
        await this.patternDropdown.click();
        await expect(this.dropdownOptions).toBeVisible();
        await this.columnDropdownOption.nth(34).click();
        await expect(this.patternDropdown).toHaveValue('MMM dd (e.g. Jan 15)')
        await this.finishingTheColumnCreation();
    }

    async dateTypeColumnWithFormatMMMMDd(){
        await this.selectingDateTypeColumn();
        await this.patternDropdown.click();
        await expect(this.dropdownOptions).toBeVisible();
        await this.columnDropdownOption.nth(35).click();
        await expect(this.patternDropdown).toHaveValue('MMMM dd (e.g. January 15)')
        await this.finishingTheColumnCreation();
    }

    async dateTypeColumnWithFormatMMMD(){
        await this.selectingDateTypeColumn();
        await this.patternDropdown.click();
        await expect(this.dropdownOptions).toBeVisible();
        await this.columnDropdownOption.nth(36).click();
        await expect(this.patternDropdown).toHaveValue('MMM d (e.g. Jan 5)')
        await this.finishingTheColumnCreation();
    }

    async dateTypeColumnWithFormatMMMMD(){
        await this.selectingDateTypeColumn();
        await this.patternDropdown.click();
        await expect(this.dropdownOptions).toBeVisible();
        await this.columnDropdownOption.nth(37).click();
        await expect(this.patternDropdown).toHaveValue('MMMM d (e.g. January 5)')
        await this.finishingTheColumnCreation();
    }

    async dateTypeColumnWithFormatDdDotSpaceMMMDotSpaceYyyy(){
        await this.selectingDateTypeColumn();
        await this.patternDropdown.click();
        await expect(this.dropdownOptions).toBeVisible();
        await this.columnDropdownOption.nth(38).click();
        await expect(this.patternDropdown).toHaveValue('dd. MMM. yyyy (e.g. 15. Jan. 1990)')  //here is a space between the dot and the MMM
        await this.finishingTheColumnCreation();
    }

    async dateTypeColumnWithFormatEEECommaMMMDdCommaYyyy(){
        await this.selectingDateTypeColumn();
        await this.patternDropdown.click();
        await expect(this.dropdownOptions).toBeVisible();
        await this.columnDropdownOption.nth(39).click();
        await expect(this.patternDropdown).toHaveValue('EEE, MMM dd, yyyy (e.g. Mon, Jan 15, 1990)')
        await this.finishingTheColumnCreation();
    }
        
    async dateTypeColumnWithFormatDayDayOfMonthMonthYear(){
        await this.selectingDateTypeColumn();
        await this.patternDropdown.click();
        await expect(this.dropdownOptions).toBeVisible();
        await this.columnDropdownOption.last().click();
        await expect(this.patternDropdown).toHaveValue('Day Day-of-Month Month Year (e.g. Tuesday 08 August 2023)')
        await this.finishingTheColumnCreation();
    }

    async fileImportFunctionality(){
        await expect(this.importFileButton).toBeVisible();
        await expect(this.importFileButton).toBeEnabled();
        await this.importFileButton.click();
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
        const readyToSubmitPopup = importerFrame.getByTestId('submit-modal-title');
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
        
    }
          
}