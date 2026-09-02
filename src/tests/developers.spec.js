import { test } from '../support/Fixture/testFixture';

test.describe('Developers Feature', () => {

    test.beforeEach('Verify that user is able to navigate to developers page', async ({ developers }) => {
       
        await developers.navigateToDevelopersPage();
    })

    test.skip('Verify the visibility of all elements present in developers page', async ({ developers }) => { //Currently skipping this test due to Bug 
        await developers.visibilityOfAllElementsInDevelopersPage();

    })

    test('Verify the functionality of webhook tab and api key tab', async ({ developers }) => {
        await developers.verifyFunctionalityOfApiKeyTab()
        await developers.verifyFunctionalityOfWebhookTab()

    })

    test('Verify the elements visibility present under api keys tab', async ({ developers }) => {
        await developers.verifyFunctionalityOfApiKeyTab()
        await developers.visibilityOfElementsPresentUnderApiKeysTab()

    })

    test('Verify the functionality of create webhook button', async ({ developers }) => {
        
        await developers.verifyFunctionalityOfCreateWebhookButton()
    })

    test('Verify the elements visibility present under create webhook popup', async ({ developers }) => {
        await developers.verifyFunctionalityOfCreateWebhookButton()
        await developers.visibilityOfElementsPresentUnderCreateWebhookPopup()
    })

    test('Verify that user is able to create a status type webhook', async ({ developers }) => {
        await developers.verifyFunctionalityOfCreateWebhookButton()
        await developers.verifyStatusTypeWebhookCreation()
        await developers.verifyWebhookDeletion()
    })

    test('Verify that user is able to create a records type webhook', async ({ developers }) => {
        await developers.verifyFunctionalityOfCreateWebhookButton()
        await developers.verifyRecordsTypeWebhookCreation()
            await developers.verifyWebhookDeletion()
    })

    test('Verify that user is able to delete a webhook', async ({ developers }) => {
        await developers.verifyFunctionalityOfCreateWebhookButton()
        await developers.verifyStatusTypeWebhookCreation()
        await developers.verifyWebhookDeletion()
    })

    test('Verify that user is able to edit any webhook', async ({ developers }) => {
        await developers.verifyFunctionalityOfCreateWebhookButton()
        await developers.verifyStatusTypeWebhookCreation()
        await developers.verifyWebhookEditing()
        await developers.verifyWebhookDeletion()
    })

    test.skip('Verify the functionality of what is this link under webhook popup', async ({ developers }) => { //Currently skipping this test due to Bug 
        await developers.verifyFunctionalityOfCreateWebhookButton()
        await developers.verifyStatusTypeWebhookCreation()
        await developers.verifyWhatIsThisLinkFunctionality()
        await developers.verifyWebhookDeletion()
    })

    test('Verify the functionality of send test webhook button', async ({ developers }) => {
        await developers.verifyFunctionalityOfCreateWebhookButton()
        await developers.verifyStatusTypeWebhookCreation()
        await developers.verifyFunctionalityOfSendTestWebhookButton()
        await developers.verifyWebhookDeletion()
    })

    test('Verify the functionality of cancel button under webhook popup', async ({ developers }) => {
        await developers.verifyFunctionalityOfCreateWebhookButton()
        await developers.verifyFunctionalityOfCancelButton()
    })

    test('Verify the functionality of cross icon under webhook popup', async ({ developers }) => {
        await developers.verifyFunctionalityOfCreateWebhookButton()
        await developers.verifyFunctionalityOfCrossIconUnderWebhookPopup()
    })

    test('Verify that create webhook popup is disable without filling any data', async ({ developers }) => {
        await developers.verifyFunctionalityOfCreateWebhookButton()
        await developers.verifyFunctionalityOfCreateWebhookButtonWithoutFillingAnyData()
    })

    test('Verify the required validation message in error state', async ({ developers }) => {
        await developers.verifyFunctionalityOfCreateWebhookButton()
        await developers.verifyRequiredValidationMessageInErrorState()
    })

    test('Verify the functionality of learn more link under records and status types webhook', async ({ developers }) => {
        await developers.verifyFunctionalityOfCreateWebhookButton()
        await developers.verifyFunctionalityOfLearnMoreLinkUnderRecordsAndStatusTypesWebhook()
    })
})

test.describe('Logs Page', () => {  

    test.beforeEach('Verify that user is able to navigate to developers page', async ({ developers }) => {
    
        await developers.navigateToDevelopersPage();
    })

    test('Verify the functionality of view log button', async ({ developers }) => {
        await developers.verifyViewLogButtonFunctionality()
    })

    test('Visibility of logs page when no logs are present', async ({ developers }) => { 
        await developers.verifyViewLogButtonFunctionality()
        await developers.visibilityOfLogsPageWhenNoLogsArePresent()
    })

    test.skip('Visibility of logs page when logs are present', async ({ developers }) => { // No logs are present in the database so it's skipped
        await developers.verifyViewLogButtonFunctionality()
        await developers.visibilityOfLogsPageWhenLogsArePresent()
    })

    test.skip('Verify success response and status by clicking on the row which contains logs', async ({ developers }) => { // No logs are present in the database so it's skipped
        await developers.verifyViewLogButtonFunctionality()
        await developers.verifyClickOnTheRowWhichContainsLogs() 
        await developers.verifyResponseAndStatusUnderLogDetailModel();
    })

    test.skip('Verify all logs details model is displayed by clicking on the row which contains logs', async ({ developers }) => { // No logs are present in the database so it's skipped
        await developers.verifyViewLogButtonFunctionality()
        await developers.verifyClickOnTheRowWhichContainsLogs()
        await developers.verifyImporterDetailsUnderLogDetailModel();
    })

    test.skip('Verify the functionality of log details close button', async ({ developers }) => { // No logs are present in the database so it's skipped
        await developers.verifyViewLogButtonFunctionality()
        await developers.verifyClickOnTheRowWhichContainsLogs()
        await developers.verifyClickOnTheLogDetailsCloseButton();
    })

    test('Verify the functionality of go back button under logs page', async ({ developers }) => {
        await developers.verifyViewLogButtonFunctionality()
        await developers.verifyFunctionalityOfGoBackButtonUnderLogsPage();
    })
   
})

test.describe('API keys Page', () => {

    test.beforeEach('Verify that user is able to navigate to api keys page', async ({ developers }) => {
      
        await developers.navigateToDevelopersPage();
        await developers.verifyFunctionalityOfApiKeyTab();
    })

    test('Verify the functionality of generate api key button', async ({ developers }) => {
        await developers.verifyFunctionalityOfGenerateApiKeyButton();
    })

    test('Visibility of all elements present under generate api key popup', async ({ developers }) => {
        await developers.verifyFunctionalityOfGenerateApiKeyButton();
        await developers.visibilityOfAllElementsPresentUnderGenerateApiKeyPopup();
    })

    test('Verify the functionality of cancel button under generate api key popup', async ({ developers }) => {
        await developers.verifyFunctionalityOfGenerateApiKeyButton();
        await developers.verifyFunctionalityOfCancelButtonUnderGenerateApiKeyPopup();
    })

    test('Verify the functionality of cross icon under generate api key popup', async ({ developers }) => {
        await developers.verifyFunctionalityOfGenerateApiKeyButton();
        await developers.verifyFunctionalityOfCrossIconUnderGenerateApiKeyPopup();
    })

    test('Verify that generate api key button is disable without filling name', async ({ developers }) => {
        await developers.verifyFunctionalityOfGenerateApiKeyButton();
        await developers.verifyFunctionalityOfGenerateApiKeyButtonWithoutFillingName();
    })

    test('Verify user is able to generate api key with valid name', async ({ developers }) => {
        await developers.verifyFunctionalityOfGenerateApiKeyButton();
        await developers.verifyFunctionalityOfGenerateApiKeyButtonWithValidName();
    })

    test('Verify that generate api key button is disable without filling name field', async ({ developers }) => {
        await developers.verifyFunctionalityOfGenerateApiKeyButton();
        await developers.verifyGenerateApiKeyButtonWithoutFillingNameField();
    })

    test('Verify that api key is generated successfully after clicking generate api key button', async ({ developers }) => {
        await developers.verifyFunctionalityOfGenerateApiKeyButton();
        await developers.verifyFunctionalityOfGenerateApiKeyButtonWithValidName();
       
    })

    test('Verify the functionality of copy api key icon under api key token', async ({ developers }) => {
        await developers.verifyFunctionalityOfGenerateApiKeyButton();
        await developers.verifyFunctionalityOfGenerateApiKeyButtonWithValidName();
    })

    test('Verify the close button functionality under api key token', async ({ developers }) => {   
        await developers.verifyFunctionalityOfGenerateApiKeyButton();
        await developers.verifyFunctionalityOfGenerateApiKeyButtonWithValidName();
        await developers.verifyFunctionalityOfCloseButtonUnderApiKeyToken();
    })

    test('Verify user is able to delete api key', async ({ developers }) => {
        await developers.verifyFunctionalityOfGenerateApiKeyButton();
        await developers.verifyFunctionalityOfGenerateApiKeyButtonWithValidName();
        await developers.verifyFunctionalityOfCloseButtonUnderApiKeyToken();
        await developers.verifyFunctionalityOfDeleteApiKey();
    })
})