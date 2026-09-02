import { test } from '../support/Fixture/testFixture';

test.describe('Imports File Feature', () => {

    test.beforeEach('Verify that user is able to navigate to imports file page', async ({ importsFile }) => {
        await importsFile.navigateToImportsFilePage();
    })

    test.skip('Verify the elements visibility in imports file page when no files are imported', async ({ importsFile }) => {
        await importsFile.verifyElementsVisibilityInImportsFilePageWhenNoFilesAreImported();
    })

    test('Verify the Functionality of importFileButton', async ({ importsFile }) => {
        await importsFile.verifyFunctionalityOfImportFileButton();
    })

    test('Verify elements visibility in import file popup', async ({ importsFile }) => {
        await importsFile.verifyFunctionalityOfImportFileButton();
        await importsFile.verifyElementsVisibilityInImportFilePopup();
    })

    test('Verify the functionality of cancel button in import file popup', async ({ importsFile }) => {
        await importsFile.verifyFunctionalityOfImportFileButton();
        await importsFile.verifyFunctionalityOfCancelButtonInImportFilePopup();
    })

    test('Verify the functionality of cross icon in import file popup', async ({ importsFile }) => {
        await importsFile.verifyFunctionalityOfImportFileButton();
        await importsFile.verifyFunctionalityOfCrossIconInImportFilePopup();
    })  

    test('Verify launch importer button is disable without selecting an importer', async ({ importsFile }) => {
        await importsFile.verifyFunctionalityOfImportFileButton();
        await importsFile.verifyFunctionalityOfLaunchImporterButtonIsDisabledWithoutSelectingAnImporter();
    })

    test('Verify user is able to select an importer from the dropdown', async ({ importsFile }) => {
        await importsFile.verifyFunctionalityOfImportFileButton();
        await importsFile.verifyUserIsAbleToSelectAnImporterFromTheDropdown();
    })

    test('Verify the functionality of launch importer button when an importer is selected', async ({ importsFile }) => {
        await importsFile.verifyFunctionalityOfImportFileButton();
        await importsFile.verifyUserIsAbleToSelectAnImporterFromTheDropdown();
        await importsFile.verifyFunctionalityOfLaunchImporterButtonWhenAnImporterIsSelected();
    })

    test('Verify user is able to import a file', async ({ importsFile }) => {
        await importsFile.verifyFunctionalityOfImportFileButton();
        await importsFile.verifyUserIsAbleToSelectAnImporterFromTheDropdown();
        await importsFile.verifyFunctionalityOfLaunchImporterButtonWhenAnImporterIsSelected();
        await importsFile.verifyUserIsAbleToImportAFile();
    })

    test('Verify the all column name in file imported data table', async ({ importsFile }) => {
        await importsFile.verifyColumnNameInFileImportedDataTable();
    })

    test('Verify user is able to copy the slug of the file imported', async ({ importsFile }) => {
        await importsFile.verifyUserIsAbleToCopyTheSlugOfTheFileImported();
    })

    test('Verify the functionality of cross icon in copied success message', async ({ importsFile }) => {
        await importsFile.verifyFunctionalityOfCrossIconInCopiedSuccessMessage();
    })

    test('Verify on hovering slug column, tooltip text is displayed', async ({ importsFile }) => {
        await importsFile.verifyOnHoveringSlugColumnTooltipTextIsDisplayed();
    })

    test('Verify the "Hand cursor" is displayed when user click on dropdown icon', async ({ importsFile }) => {
        await importsFile.verifyFunctionalityOfImportFileButton();
        await importsFile.verifyTheHandCursorIsDisplayedWhenUserClickOnDropdownIcon();
    })

    test('Verify user is able to download the imported file', async ({ importsFile }) => {
        await importsFile.verifyUserIsAbleToDownloadTheImportedFile();
    })


    test('Verify the all the rows count in the downloaded files', async ({ importsFile }) => {
        await importsFile.verifyAllTheRowsCountInTheDownloadedFiles();
    })

    test('Verify the functionality of Delete button', async ({ importsFile }) => {
        await importsFile.verifyFunctionalityOfDeleteButton();
    })

    test('Verify the elements visibility in delete popup', async ({ importsFile }) => {
        await importsFile.verifyFunctionalityOfDeleteButton();
        await importsFile.verifyElementsVisibilityInDeletePopup();
    })

    test('Functionality of cancel button in delete popup', async ({ importsFile }) => {
        await importsFile.verifyFunctionalityOfDeleteButton();
        await importsFile.verifyFunctionalityOfCancelButtonInDeletePopup();
    })

    test('Functionality of cross icon in delete popup', async ({ importsFile }) => {
        await importsFile.verifyFunctionalityOfDeleteButton();
        await importsFile.verifyFunctionalityOfCrossIconInDeletePopup();
    })

    test('Functionality of yes delete button in delete popup', async ({ importsFile }) => {
        await importsFile.verifyFunctionalityOfDeleteButton();
        await importsFile.verifyFunctionalityOfYesDeleteButtonInDeletePopup();
    })
})
