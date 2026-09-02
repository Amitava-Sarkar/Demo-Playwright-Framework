import { expect } from '@playwright/test';
import { visibilityOfElement } from '../Utils/generalPlaywrightMethods';
import webhookData from '../TestData/webhook.json' with { type: 'json' };

export class Developers {
    constructor(page) {
        this.page = page;
        this.developersTab = page.getByTestId('developerLink');
        this.developersPageTitle = page.getByTestId('developer-title');
        this.webhookTab = page.getByRole('tab', { name: 'Webhooks' });
        this.apiKeyTab = page.getByRole('tab', { name: 'API keys' });
        this.webhookHeaderText = page.getByTestId('webhooks-text')
        this.webhookDescriptionText = page.getByTestId('description')
        this.viewlogButton = page.getByTestId('view-webhook-logs-header-button')
        this.createWebhookHeaderButton = page.getByTestId('create-webhook-header-button')
        this.webhookPageIcon = page.getByTestId('text-info').locator('svg')
        this.webhookInfoSection = page.getByTestId('text-info')
        this.createWebhookButton = page.getByTestId('createWebhook')
        this.apiKeyHeaderText = page.getByTestId('api-key-text')
        this.apiKeyDescriptionText = page.getByTestId('api-key-description')
        this.generateApiKeyHeaderButton = page.getByTestId('generate-api-header-button')
        this.apiInfoIcon = page.getByTestId('api-text-info').locator('svg')
        this.apiInfoSection = page.getByTestId('api-text-info')
        this.createApiKeyButton = page.getByTestId('generate-api-empty-button')
        this.createWebhookPopup = page.getByTestId('webhooks-pop-up')
        this.createWebhookHeaderText = page.getByTestId('webhooks-pop-up-title')
        this.webhookDescriptionTextUnderCreateWebhookPopup = page.getByTestId('webhooks-pop-up-description')
        this.recordsTypeRadioButton = this.page.getByTestId('records-radio-button')
        this.statusRadioButton = this.page.getByTestId('status-radio-button')
        this.selectImporterDropdown = this.page.locator('#select-template')
        this.webhookNameField = page.locator('[placeholder="Name your webhook"]')
        this.webhookUrlField = page.locator('#url')
        this.secretKeyField = page.locator('#secret_token')
        this.rateLimitDropdown = page.locator('[placeholder="Maximum number of requests sent in parallel to the webhook"]')
        this.rateLimitDropdownOptions = page.locator('.kSIuag')
        this.rateLimitDropdownOption = page.locator('[data-test-id="autocomplete-menu-item"]').first()
        this.cancelButton = page.getByRole('button', { name: 'Cancel' })
        this.createWebhookButtonUnderCreateWebhookPopup = page.getByTestId('create-webhook-submit-button')
        this.importerDropdownOption = page.locator('[data-test-id="autocomplete-menu-item"]').first()
        this.webhookCreationSuccessMessage = page.getByText(webhookData.validation.webhookCreationSuccessMessage)
        this.webhookDeleteButton = page.locator('[data-test-id="delete-button"]').first()
        this.webhookDeletePopup = page.getByTestId('delete-pop-up')
        this.yesDeleteButton = page.getByTestId('webhook-yes-delete-button')
        this.webhookDeletionSuccessMessage = page.getByText(webhookData.validation.webhookDeletionSuccessMessage)
        this.webhookEditButton = page.getByTestId('table-edit-button')
        this.editWebhookPopup = page.getByTestId('webhooks-pop-up')
        this.webhookEditingSuccessMessage = page.getByText(webhookData.validation.webhookEditingSuccessMessage)
        this.goBackButton = page.getByTestId('go-back')
        this.logsPageTitle = page.getByTestId('log-text')
        this.allImportersDropdown = page.getByTestId('label-importers')
        this.allFileImportSlugsDropdown = page.getByTestId('label-file imports')
        this.noLogsMessage = page.locator('.eUehNL')
        this.logsTable = page.locator('[data-test-id="table-view-wrapper"]')
        this.firstRowOfLogsTable = this.logsTable.locator('[data-test-id="row-0"]')
        this.logDetailsSideDrawer = page.getByTestId('log-details-modal')
        this.statusLable = page.getByTestId('status-label')
        this.responseLable = page.getByTestId('response-label')
        this.urlHeader = page.getByTestId('url')
        this.urlInfo = page.getByTestId('url-info')
        this.webhookType = page.getByTestId('webhook-type')
        this.webhookTypeInfo = page.getByTestId('type-value')
        this.importSlug = page.getByTestId('import-slug')
        this.importSlugInfo = page.getByTestId('import-slug-info')
        this.importerDetails = page.getByTestId('importer-name')
        this.importerDetailsInfo = page.getByTestId('importer-name-info')
        this.logDetailsCloseButton = page.getByTestId('close-detail-model')
        this.whatIsThisLink = page.getByTestId('secret-key-documentation')
        this.sendTestWebhookButton = page.getByTestId('test-webhook-button')
        this.testSendSuccessMessage = page.getByText(webhookData.validation.testSendSuccessMessage)
        this.cancelButton = page.getByTestId('webhook-pop-up-cancel-button')
        this.crossIcon = page.getByTestId('close-icon')
        this.webhookNameRequiredValidation = page.getByText(webhookData.errorValidation.webhookNameRequired)
        this.webhookUrlRequiredValidation = page.getByText(webhookData.errorValidation.webhookUrlRequired)
        this.learnMoreLinkRecordsTypes = page.getByTestId('record-link')
        this.learnMoreLinkStatusTypes = page.getByTestId('status-link')
        this.generateApiKeyPopup = page.getByTestId('generate-api-key-pop-up')
        this.generateApiKeyPopupTitle = page.getByTestId('pop-up-title')
        this.generateApiKeyPopupDescription = page.getByTestId('pop-up-description')
        this.apiDescriptionText = page.getByTestId('generated-api-description')
        this.apiKeyNameField = page.locator('[placeholder="e.g. Staging or Production"]')
        this.apiKeyCancelButton = page.getByTestId('generate-api-cancel-button')
        this.generateApiKeyPopupButton = page.getByTestId('generate-api-submit-button')
        this.apiKeyCreationSuccessMessage = page.getByText(webhookData.apiKeyValidation.apiKeyCreationSuccessMessage)
        this.apiToken = page.getByTestId('api-key-token')
        this.copyApiKeyIcon = page.getByTestId('generate-api-copytoclipboard-button')
        this.apiKeyCloseButton = page.getByTestId('generate-api-close-modal-button')
        this.deleteApiKeyButton = page.locator('[data-test-id="delete-button"]')
        this.apiKeyDeletePopup = page.getByTestId('delete-credential-pop-up')
        this.yesDeleteButtonUnderApiKeyDeletePopup = page.getByTestId('delete-credential-confirmed')
        this.apiKeyDeletionSuccessMessage = page.getByText(webhookData.apiKeyValidation.apiKeyDeletionSuccessMessage)
    }

    async navigateToDevelopersPage() {
        await this.page.goto('/');
        await expect(this.developersTab).toBeVisible();
        await this.developersTab.click();
        await expect(this.page).toHaveURL(/account\/developers/, { timeout: 6000 });
        await expect(this.developersPageTitle).toBeVisible();
    }

    async visibilityOfAllElementsInDevelopersPage() {
        const elements = [
            this.developersPageTitle, this.webhookTab, this.apiKeyTab, this.webhookHeaderText, this.webhookDescriptionText, 
            this.viewlogButton, this.createWebhookHeaderButton, this.webhookPageIcon, this.webhookInfoSection, this.createWebhookButton
        ]

        for (const element of elements) {
            await visibilityOfElement(element)
        }
    }

    async verifyFunctionalityOfWebhookTab() {
        await expect(this.webhookTab).toBeVisible();
        await this.webhookTab.click();
        await expect(this.webhookHeaderText).toBeVisible();
        await expect(this.webhookDescriptionText).toBeVisible();
    }

    async verifyFunctionalityOfApiKeyTab() {
        await expect(this.apiKeyTab).toBeVisible();
        await this.apiKeyTab.click();
        await expect(this.apiKeyHeaderText).toBeVisible();
        await expect(this.apiKeyDescriptionText).toBeVisible();
    }

    async visibilityOfElementsPresentUnderApiKeysTab() {
        const elements = [
            this.generateApiKeyHeaderButton, this.apiInfoIcon, this.apiInfoSection, this.createApiKeyButton,
            this.apiKeyHeaderText, this.apiKeyDescriptionText
        ]

        for (const element of elements) {
            await visibilityOfElement(element)
        }
    }

    async verifyFunctionalityOfCreateWebhookButton() {
        await expect(this.createWebhookHeaderButton).toBeVisible();
        await this.createWebhookHeaderButton.click();
        await expect(this.createWebhookPopup).toBeVisible();
    }

    async visibilityOfElementsPresentUnderCreateWebhookPopup() {
        const elements = [
            this.createWebhookHeaderText, this.webhookDescriptionTextUnderCreateWebhookPopup, this.recordsTypeRadioButton,
            this.statusRadioButton, this.selectImporterDropdown, this.webhookNameField, this.webhookUrlField, this.secretKeyField,
            this.cancelButton, this.createWebhookButtonUnderCreateWebhookPopup
        ]

        for (const element of elements) {
            await visibilityOfElement(element)
        }
    }

    async verifyStatusTypeWebhookCreation() {
       await expect(this.statusRadioButton).toBeVisible();
       await this.statusRadioButton.click();
       await expect(this.statusRadioButton).toBeChecked();
       await expect(this.selectImporterDropdown).toBeVisible();
       await this.selectImporterDropdown.click();
       await expect(this.importerDropdownOption).toBeVisible();
       const importerName = (await this.importerDropdownOption.textContent())?.trim();
       await this.importerDropdownOption.click();
       await expect(this.selectImporterDropdown).toHaveValue(importerName);
       await expect(this.webhookNameField).toBeVisible();
       await this.webhookNameField.fill(webhookData.webhook.webhookName);
       await expect(this.webhookNameField).toHaveValue(webhookData.webhook.webhookName);   
       await expect(this.webhookUrlField).toBeVisible();
       await this.webhookUrlField.fill(webhookData.webhook.webhookUrl);
       await expect(this.webhookUrlField).toHaveValue(webhookData.webhook.webhookUrl);
       await expect(this.secretKeyField).toBeVisible();
       await this.secretKeyField.fill(webhookData.webhook.secretKey);
       await expect(this.secretKeyField).toHaveValue(webhookData.webhook.secretKey);
       await expect(this.createWebhookButtonUnderCreateWebhookPopup).toBeVisible();
       await expect(this.createWebhookButtonUnderCreateWebhookPopup).toBeEnabled();
       await this.createWebhookButtonUnderCreateWebhookPopup.click();
       await expect(this.createWebhookPopup).not.toBeVisible();
       await expect(this.webhookCreationSuccessMessage).toBeVisible();
       await expect(this.webhookCreationSuccessMessage).toContainText(webhookData.validation.webhookCreationSuccessMessage)
    }

    async verifyRecordsTypeWebhookCreation() {
       await expect(this.recordsTypeRadioButton).toBeVisible();
       await this.recordsTypeRadioButton.click();
       await expect(this.recordsTypeRadioButton).toBeChecked();
       await expect(this.selectImporterDropdown).toBeVisible();
       await this.selectImporterDropdown.click();
       await expect(this.importerDropdownOption).toBeVisible();
       const importerName = (await this.importerDropdownOption.textContent())?.trim();
       await this.importerDropdownOption.click();
       await expect(this.selectImporterDropdown).toHaveValue(importerName);
       await expect(this.webhookNameField).toBeVisible();
       await this.webhookNameField.fill(webhookData.webhook.webhookName);
       await expect(this.webhookNameField).toHaveValue(webhookData.webhook.webhookName);
       await expect(this.webhookUrlField).toBeVisible();
       await this.webhookUrlField.fill(webhookData.webhook.webhookUrl);
       await expect(this.webhookUrlField).toHaveValue(webhookData.webhook.webhookUrl);
       await expect(this.secretKeyField).toBeVisible();
       await this.secretKeyField.fill(webhookData.webhook.secretKey);
       await expect(this.secretKeyField).toHaveValue(webhookData.webhook.secretKey);
       await expect(this.rateLimitDropdown).toBeVisible();
       await this.rateLimitDropdown.click();
       await expect(this.rateLimitDropdownOptions).toBeVisible();
       await this.rateLimitDropdownOption.click();
       await expect(this.rateLimitDropdown).toHaveValue(webhookData.webhook.rateLimit);
       await expect(this.createWebhookButtonUnderCreateWebhookPopup).toBeVisible();
       await expect(this.createWebhookButtonUnderCreateWebhookPopup).toBeEnabled();
       await this.createWebhookButtonUnderCreateWebhookPopup.click();
       await expect(this.createWebhookPopup).not.toBeVisible();
       await expect(this.webhookCreationSuccessMessage).toBeVisible();
       await expect(this.webhookCreationSuccessMessage).toContainText(webhookData.validation.webhookCreationSuccessMessage)
    }

    async verifyWebhookDeletion() {
        await expect(this.webhookDeleteButton).toBeVisible();
        await expect(this.webhookDeleteButton).toBeEnabled();
        await this.webhookDeleteButton.click();
        await expect(this.webhookDeletePopup).toBeVisible();
        await expect(this.yesDeleteButton).toBeVisible();
        await expect(this.yesDeleteButton).toBeEnabled();
        await this.yesDeleteButton.click();
        await expect(this.webhookDeletePopup).not.toBeVisible();
        await expect(this.webhookDeletionSuccessMessage).toBeVisible();
        await expect(this.webhookDeletionSuccessMessage).toContainText(webhookData.validation.webhookDeletionSuccessMessage)
    }

    async verifyWebhookEditing() {
        await expect(this.webhookEditButton.first()).toBeVisible();
        await expect(this.webhookEditButton.first()).toBeEnabled();
        await this.webhookEditButton.first().click();
        await expect(this.editWebhookPopup).toBeVisible();
        await expect(this.webhookNameField).toBeVisible();
        await this.webhookNameField.fill(webhookData.webhook.webhookNewName);
        await expect(this.webhookNameField).toHaveValue(webhookData.webhook.webhookNewName);
        await expect(this.createWebhookButtonUnderCreateWebhookPopup).toBeVisible();
        await expect(this.createWebhookButtonUnderCreateWebhookPopup).toBeEnabled();
        await this.createWebhookButtonUnderCreateWebhookPopup.click();
        await expect(this.editWebhookPopup).not.toBeVisible();
        await expect(this.webhookEditingSuccessMessage).toBeVisible();
        await expect(this.webhookEditingSuccessMessage).toContainText(webhookData.validation.webhookEditingSuccessMessage)
    }



    async verifyViewLogButtonFunctionality() {
        await expect(this.viewlogButton).toBeVisible();
        await expect(this.viewlogButton).toBeEnabled();
        await this.viewlogButton.click();
        await expect(this.page).toHaveURL(/account\/developers\/webhooks\/logs/, { timeout: 60000 });
        await expect(this.logsPageTitle).toBeVisible(); 
    }

    async visibilityOfLogsPageWhenNoLogsArePresent() {
        const elements = [
            this.goBackButton, this.logsPageTitle, this.allImportersDropdown, this.allFileImportSlugsDropdown, this.noLogsMessage
        ]

        for (const element of elements) {
            await visibilityOfElement(element)
        }  
    }

    async visibilityOfLogsPageWhenLogsArePresent() {
        const elements = [
            this.goBackButton, this.logsPageTitle, this.allImportersDropdown, this.allFileImportSlugsDropdown, this.logsTable
        ]

        for (const element of elements) {
            await visibilityOfElement(element)
        }  
    }

    async verifyClickOnTheRowWhichContainsLogs() {
        await expect(this.logsTable).toBeVisible();
        await expect(this.firstRowOfLogsTable).toBeVisible()
        await this.firstRowOfLogsTable.click()
        await expect(this.logDetailsSideDrawer).toBeVisible()
    }

    async verifyResponseAndStatusUnderLogDetailModel() {
        await expect(this.logDetailsSideDrawer).toBeVisible()
        await expect(this.responseLable).toBeVisible()
        await expect(this.responseLable).toContainText(webhookData.log.successResponse)
        await expect(this.statusLable).toBeVisible()
        await expect(this.statusLable).toContainText(webhookData.log.successStatus)
    }

    async verifyImporterDetailsUnderLogDetailModel() {
        await expect(this.urlHeader).toBeVisible()
        await expect(this.urlInfo).toBeVisible()
        await expect(this.urlInfo).toContainText(webhookData.logDetails.url)
        await expect(this.webhookType).toBeVisible()
        await expect(this.webhookTypeInfo).toBeVisible()
        await expect(this.webhookTypeInfo).toContainText(webhookData.logDetails.webhookType)
        await expect(this.importSlug).toBeVisible()
        await expect(this.importSlugInfo).toBeVisible()
        await expect(this.importSlugInfo).toContainText(webhookData.logDetails.importSlug)
        await expect(this.importerDetails).toBeVisible()
        await expect(this.importerDetailsInfo).toBeVisible()
        await expect(this.importerDetailsInfo).toContainText(webhookData.logDetails.importerName)
    }

    async verifyClickOnTheLogDetailsCloseButton() {
        await expect(this.logDetailsCloseButton).toBeVisible();
        await expect(this.logDetailsCloseButton).toBeEnabled();
        await this.logDetailsCloseButton.click();
        await expect(this.logDetailsSideDrawer).not.toBeVisible();
    }

    async verifyFunctionalityOfGoBackButtonUnderLogsPage() {
        await expect(this.goBackButton).toBeVisible();
        await expect(this.goBackButton).toBeEnabled();
        await this.goBackButton.click();
        await expect(this.page).toHaveURL(/account\/developers/, { timeout: 60000 });
        await expect(this.developersPageTitle).toBeVisible();
    }

    async verifyFunctionalityOfAllImportersDropdown() {
        await expect(this.allImportersDropdown).toBeVisible();
        await expect(this.allImportersDropdown).toBeEnabled();
        await this.allImportersDropdown.click();
        await expect(this.importerDropdownOption).toBeVisible();
        await expect(this.importerDropdownOption).toBeEnabled();
        await this.importerDropdownOption.click();
        await expect(this.allImportersDropdown).toHaveValue(webhookData.logDetails.importerName);
    }

    async verifyWhatIsThisLinkFunctionality() {
        await expect(this.webhookEditButton.first()).toBeVisible();
        await expect(this.webhookEditButton.first()).toBeEnabled();
        await this.webhookEditButton.first().click();
        await expect(this.editWebhookPopup).toBeVisible();
        await expect(this.whatIsThisLink).toBeVisible();
        await expect(this.whatIsThisLink).toBeEnabled();
        await this.whatIsThisLink.click();
        const [newPage] = await Promise.all([
            this.page.waitForEvent('popup'),
            this.whatIsThisLink.click(),
          ]);
          await newPage.waitForLoadState();
          await expect(newPage).toHaveURL('https://fuse-docs.swovo.com/accessing-data/webhook-security');    
          
        await this.page.bringToFront();
        await expect(this.cancelButton).toBeVisible();
        await expect(this.cancelButton).toBeEnabled();
        await this.cancelButton.click();
        await expect(this.editWebhookPopup).not.toBeVisible();
    }

    async verifyFunctionalityOfSendTestWebhookButton() {
        await expect(this.webhookEditButton.first()).toBeVisible();
        await expect(this.webhookEditButton.first()).toBeEnabled();
        await this.webhookEditButton.first().click();
        await expect(this.editWebhookPopup).toBeVisible();
        await expect(this.sendTestWebhookButton).toBeVisible();
        await expect(this.sendTestWebhookButton).toBeEnabled();
        await this.sendTestWebhookButton.click();
        await expect(this.testSendSuccessMessage).toBeVisible();
        await expect(this.testSendSuccessMessage).toContainText(webhookData.validation.testSendSuccessMessage)
        await expect(this.cancelButton).toBeVisible();
        await expect(this.cancelButton).toBeEnabled();
        await this.cancelButton.click();
        await expect(this.editWebhookPopup).not.toBeVisible();
        
    }

    async verifyFunctionalityOfCancelButton() {
        await expect(this.cancelButton).toBeVisible();
        await expect(this.cancelButton).toBeEnabled();
        await this.cancelButton.click();
        await expect(this.createWebhookPopup).not.toBeVisible();
    }

    async verifyFunctionalityOfCrossIconUnderWebhookPopup() {
        await expect(this.crossIcon).toBeVisible();
        await expect(this.crossIcon).toBeEnabled();
        await this.crossIcon.click();
        await expect(this.createWebhookPopup).not.toBeVisible();
    }

    async verifyFunctionalityOfCreateWebhookButtonWithoutFillingAnyData() {
        await expect(this.createWebhookButtonUnderCreateWebhookPopup).toBeVisible();
        await this.createWebhookButtonUnderCreateWebhookPopup.click();
        await expect(this.createWebhookButtonUnderCreateWebhookPopup).toHaveAttribute('disabled');
    }

    
    async verifyRequiredValidationMessageInErrorState() {
        const validationFields = [
            {
                input: this.webhookNameField,
                validation: this.webhookNameRequiredValidation,
                message: webhookData.errorValidation.webhookNameRequired
            },
            {
                input: this.webhookUrlField,
                validation: this.webhookUrlRequiredValidation,
                message: webhookData.errorValidation.webhookUrlRequired
            }
        ];
    
        for (const field of validationFields) {

            await expect(field.input).toBeVisible();
            await field.input.click();
            await this.createWebhookHeaderText.click();
            await expect(field.validation).toBeVisible();
            await expect(field.validation).toContainText(field.message);
        }
    }

    async verifyFunctionalityOfLearnMoreLinkUnderRecordsAndStatusTypesWebhook() {
        await expect(this.learnMoreLinkRecordsTypes).toBeVisible();
        await this.learnMoreLinkRecordsTypes.click();
        const [newPage] = await Promise.all([
            this.page.waitForEvent('popup'),
            this.learnMoreLinkRecordsTypes.click(),
          ]);
          await newPage.waitForLoadState();
          await expect(newPage).toHaveURL('https://fuse-docs.swovo.com/accessing-data/record-webhooks');

        await newPage.close();
        await this.page.bringToFront();

        await expect(this.learnMoreLinkStatusTypes).toBeVisible();
        await this.learnMoreLinkStatusTypes.click();
        const [newPage2] = await Promise.all([
            this.page.waitForEvent('popup'),
            this.learnMoreLinkStatusTypes.click(),
          ]);
          await newPage2.waitForLoadState();
          await expect(newPage2).toHaveURL('https://fuse-docs.swovo.com/accessing-data/status-webhooks');    
    }

    async verifyFunctionalityOfGenerateApiKeyButton() {
        await expect(this.generateApiKeyHeaderButton).toBeVisible();
        await expect(this.generateApiKeyHeaderButton).toBeEnabled();
        await this.generateApiKeyHeaderButton.click();
        await expect(this.generateApiKeyPopup).toBeVisible();
    }

    async visibilityOfAllElementsPresentUnderGenerateApiKeyPopup() {
        const elements = [
            this.generateApiKeyPopupTitle, this.generateApiKeyPopupDescription, this.apiKeyNameField, this.apiKeyCancelButton,
            this.generateApiKeyPopupButton , this.crossIcon
        ]

        for (const element of elements) {
            await expect(element).toBeVisible();
        }
    }

    async verifyFunctionalityOfCancelButtonUnderGenerateApiKeyPopup() {
        await expect(this.apiKeyCancelButton).toBeVisible();
        await expect(this.apiKeyCancelButton).toBeEnabled();
        await this.apiKeyCancelButton.click();
        await expect(this.generateApiKeyPopup).not.toBeVisible();
    }

    async verifyFunctionalityOfCrossIconUnderGenerateApiKeyPopup() {
        await expect(this.crossIcon).toBeVisible();
        await expect(this.crossIcon).toBeEnabled();
        await this.crossIcon.click();
        await expect(this.generateApiKeyPopup).not.toBeVisible();
    }

    async verifyFunctionalityOfGenerateApiKeyButtonWithoutFillingName() {
       await expect(this.generateApiKeyPopupButton).toBeVisible();
       await expect(this.generateApiKeyPopupButton).toHaveAttribute('disabled');
    }

    async verifyFunctionalityOfGenerateApiKeyButtonWithValidName() {
        await expect(this.apiKeyNameField).toBeVisible();
        await this.apiKeyNameField.fill(webhookData.apiKey.apiKeyName);
        await expect(this.apiKeyNameField).toHaveValue(webhookData.apiKey.apiKeyName);
        await expect(this.generateApiKeyPopupButton).toBeVisible();
        await expect(this.generateApiKeyPopupButton).toBeEnabled();
        await this.generateApiKeyPopupButton.click();
        await expect(this.apiKeyCreationSuccessMessage).toBeVisible();
        await expect(this.apiKeyCreationSuccessMessage).toContainText(webhookData.apiKeyValidation.apiKeyCreationSuccessMessage)
        await expect(this.apiToken).toBeVisible();
    }

    async verifyGenerateApiKeyButtonWithoutFillingNameField() {
        await expect(this.generateApiKeyPopupButton).toBeVisible();
        await expect(this.generateApiKeyPopupButton).toHaveAttribute('disabled');
    }

    async verifyFunctionalityOfCopyApiKeyIcon() {
        await expect(this.copyApiKeyIcon).toBeVisible();
        await expect(this.copyApiKeyIcon).toBeEnabled();
        await this.copyApiKeyIcon.click();
        const apiToken = (await this.apiToken.textContent())?.trim();
        const copiedMessage = this.page.getByText(
            `Copied ${apiToken} to clipboard`
        );
    
        await expect(copiedMessage).toBeVisible();
        await expect(copiedMessage).toContainText(`Copied ${apiToken} to clipboard`);
        
    }

    async verifyFunctionalityOfCloseButtonUnderApiKeyToken() {
        await expect(this.apiKeyCloseButton).toBeVisible();
        await expect(this.apiKeyCloseButton).toBeEnabled();
        await this.apiKeyCloseButton.click();
        await expect(this.generateApiKeyPopup).not.toBeVisible();
    }

    async verifyFunctionalityOfDeleteApiKey() {
        await expect(this.deleteApiKeyButton.first()).toBeVisible();
        await expect(this.deleteApiKeyButton.first()).toBeEnabled();
        await this.deleteApiKeyButton.first().click();
        await expect(this.apiKeyDeletePopup).toBeVisible();
        await expect(this.yesDeleteButtonUnderApiKeyDeletePopup).toBeVisible();
        await expect(this.yesDeleteButtonUnderApiKeyDeletePopup).toBeEnabled();
        await this.yesDeleteButtonUnderApiKeyDeletePopup.click();
        await expect(this.apiKeyDeletePopup).not.toBeVisible();
        await expect(this.apiKeyDeletionSuccessMessage).toBeVisible();
        await expect(this.apiKeyDeletionSuccessMessage).toContainText(webhookData.apiKeyValidation.apiKeyDeletionSuccessMessage)
    }


}