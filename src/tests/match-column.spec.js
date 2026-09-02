import { test } from '../support/Fixture/testFixture';


test.describe('Importer Match Column Feature', () => {

    test.beforeEach('Verify that user is able to navigate to importer match column page', async ({ matchColumn }) => {
        await matchColumn.navigateToMatchColumnPage()
    })

    test('Verify the elements visibility in importer match column page', async ({ matchColumn }) => {
        await matchColumn.verifyElementsVisibilityInMatchColumnPage()
    })

    test('Verify match column page table headers', async ({ matchColumn }) => {
        await matchColumn.verifyMatchColumnPageTableHeaders()
    })

    test('Verify the functionality of marge column icon', async ({ matchColumn }) => {
        await matchColumn.functionalityOfMargeColumnIcon();
    })

    test('Verify that on hovering marge column icon, tooltip text is displayed', async ({ matchColumn }) => {
        await matchColumn.verifyOnHoveringMargeColumnIconTooltipTextIsDisplayed();
    })

    test('Verify the visibility of elements in combine data popup', async ({ matchColumn }) => {
        await matchColumn.functionalityOfMargeColumnIcon();
        await matchColumn.visibilityOfElementsInCombineDataPopup();
    })

    test('Verify the functionality of cancel button in combine data popup', async ({ matchColumn }) => {
        await matchColumn.functionalityOfMargeColumnIcon();
        await matchColumn.functionalityOfCancelButtonInCombineDataPopup();
    })

    test('Verify the functionality of close icon in combine data popup', async ({ matchColumn }) => {
        await matchColumn.functionalityOfMargeColumnIcon();
        await matchColumn.functionalityOfCloseIconInCombineDataPopup();
    })

    test('Verify the delimiter options in choose delimiter dropdown', async ({ matchColumn }) => {
        await matchColumn.functionalityOfMargeColumnIcon();
        await matchColumn.verifyDelimiterOptionsInChooseDelimiterDropdown();
    })

    test('Verify user is able to choose "None" as a delimiter', async ({ matchColumn }) => {
        await matchColumn.functionalityOfMargeColumnIcon();
        await matchColumn.verifyNoneAsADelimiter();
    })

    test('Verify user is able to choose "Space" as a delimiter', async ({ matchColumn }) => {
        await matchColumn.functionalityOfMargeColumnIcon();
        await matchColumn.verifySpaceAsADelimiter();
    })

    test('Verify user is able to choose "Comma" as a delimiter', async ({ matchColumn }) => {
        await matchColumn.functionalityOfMargeColumnIcon();
        await matchColumn.verifyCommaAsADelimiter();
    })

    test('Verify user is able to choose "Semicolon" as a delimiter', async ({ matchColumn }) => {
        await matchColumn.functionalityOfMargeColumnIcon();
        await matchColumn.verifySemicolonAsADelimiter();
    })

    test('Verify user is able to choose "Dash" as a delimiter', async ({ matchColumn }) => {
        await matchColumn.functionalityOfMargeColumnIcon();
        await matchColumn.verifyDashAsADelimiter();
    })

    test('Verify user is able to choose "Tab" as a delimiter', async ({ matchColumn }) => {
        await matchColumn.functionalityOfMargeColumnIcon();
        await matchColumn.verifyTabAsADelimiter();
    })

    test('Verify user is able to choose "Dot" as a delimiter', async ({ matchColumn }) => {
        await matchColumn.functionalityOfMargeColumnIcon();
        await matchColumn.verifyDotAsADelimiter();
    })


    test('Verify the functionality of plus icon', async ({ matchColumn }) => {
        await matchColumn.functionalityOfMargeColumnIcon();
        await matchColumn.verifyPlusIconFunctionality();
    })

    test('Verify the functionality of minus icon', async ({ matchColumn }) => {
        await matchColumn.functionalityOfMargeColumnIcon();
        await matchColumn.verifyMinusIconFunctionality();
    })

    test('Verify the functionality of add column for merge', async ({ matchColumn }) => {
        await matchColumn.functionalityOfMargeColumnIcon();
        await matchColumn.addColumnForMerge();
    })

    test('Verify the functionality of remove column for merge', async ({ matchColumn }) => {
        await matchColumn.functionalityOfMargeColumnIcon();
        await matchColumn.addColumnForMerge();
        await matchColumn.removeColumnForMerge();
    })

    test('Verify that combine your columns button is disabled without any columns selected', async ({ matchColumn }) => {
        await matchColumn.functionalityOfMargeColumnIcon();
        await matchColumn.verifyCombineYourColumnsButtonIsDisabledWithoutAnyColumnsSelected();
    })

    test('Verify the functionality of combine your columns button', async ({ matchColumn }) => {
        await matchColumn.functionalityOfMargeColumnIcon();
        await matchColumn.addColumnForMerge();
        await matchColumn.functionalityOfCombineYourColumnsButton();
    })

    test('verifyToolTipMessageOverPreviewSection', async ({ matchColumn }) => {
        await matchColumn.functionalityOfMargeColumnIcon();
        await matchColumn.addColumnForMerge();
        await matchColumn.verifyToolTipMessageOverPreviewSection();
    })

    test('verifyDeleteCombinedColumnIcon', async ({ matchColumn }) => {
        await matchColumn.functionalityOfMargeColumnIcon();
        await matchColumn.addColumnForMerge();
        await matchColumn.functionalityOfCombineYourColumnsButton();
        await matchColumn.verifyDeleteCombinedColumnIcon();
    })  

    test('Functionality of Go back button under importer match column page', async ({ matchColumn }) => {
        await matchColumn.functionalityOfGoBackButton();
    })

    test('Visibility of element present in close importer popup', async ({ matchColumn }) => {
        await matchColumn.functionalityOfCrossIcon();
        await matchColumn.visibilityOfElementsInCloseImporterPopup();
    })

    test('Verify the functionality of cancel button in close importer popup', async ({ matchColumn }) => {
        await matchColumn.functionalityOfCrossIcon();
        await matchColumn.functionalityOfCancelButtonInCloseImporterPopup();
    })   
    
    test('Verify the functionality of cross icon in close importer popup', async ({ matchColumn }) => {
        await matchColumn.functionalityOfCrossIcon();
        await matchColumn.functionalityOfCrossIconInCloseImporterPopup();
    })

    test('Verify the functionality of close button in close importer popup', async ({ matchColumn }) => {
        await matchColumn.functionalityOfCrossIcon();
        await matchColumn.functionalityOfCloseButtonInCloseImporterPopup();
    })

    test('Verify the functionality of Continue button in importer match column page', async ({ matchColumn }) => {
        await matchColumn.functionalityOfContinueButtonInImporterMatchColumnPage();
    })

    test('Verify the functionality of Continue button when the status of one column is unmatched', async ({ matchColumn }) => {
        await matchColumn.unmatchedColumnStatus();
    })

    test('Verify the visibility of elements in unmatched column popup', async ({ matchColumn }) => {
        await matchColumn.unmatchedColumnStatus();
        await matchColumn.visibilityOfElementsInUnmatchedColumnPopup();
    })

    test('Verify the functionality of skip button in unmatched column popup', async ({ matchColumn }) => {
        await matchColumn.unmatchedColumnStatus();
        await matchColumn.functionalityOfSkipButton()
    })

    test('Verify the functionality of assign header button in unmatched column popup', async ({ matchColumn }) => {
        await matchColumn.unmatchedColumnStatus();
        await matchColumn.functionalityOfAssignHeaderButton();
    })

    test('Verify user is able to assign headers to unmatched column', async ({ matchColumn }) => {
        await matchColumn.unmatchedColumnStatus();
        await matchColumn.functionalityOfAssignHeaderButton();
        await matchColumn.assignHeadersToUnmatchedColumn();
    })



})