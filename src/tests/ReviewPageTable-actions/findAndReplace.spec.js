import { test } from '../../support/Fixture/testFixture';

test.describe('Importer Table Actions Feature, "Find and Replace Functionality for columns"', () => {

    test.beforeEach('Verify that user is able to navigate to review page', async ({ tableAction }) => {
        await tableAction.navigateToReviewPage()
    })

    test('Verify functionality of find and replace icon', async ({ tableAction }) => {
        await tableAction.verifyFunctionalityOfFindAndReplaceIcon();
    })

    test('Elements visibility in find and replace popup', async ({ tableAction }) => {
        await tableAction.verifyFunctionalityOfFindAndReplaceIcon();
        await tableAction.verifyElementsVisibilityInFindAndReplacePopup();
    })

    test('Finds and replaces using case insensitive search with regex value replaced', async ({ tableAction }) => {
        await tableAction.fillingInputAndReplaceValue('John');
        await tableAction.findReplaceInsensitiveCaseSearchWithRegex('John');
    })

    test('Finds and replaces using case sensitive search with regex value replaced', async ({ tableAction }) => {
        await tableAction.fillingInputAndReplaceValue('JOHN');
        await tableAction.findReplaceSensitiveCaseSearchWithRegex('JOHN');
    })

    test('Verify functionality of cancel button and close icon in find and replace popup', async ({ tableAction }) => {
        await tableAction.verifyFunctionalityOfFindAndReplaceIcon();
        await tableAction.verifyFunctionalityOfCancelButtonInFindAndReplacePopup();
        await tableAction.verifyFunctionalityOfFindAndReplaceIcon();
        await tableAction.verifyFunctionalityOfCloseIconInFindAndReplacePopup();
    })

    test('Verify the validation when any value not matched with cells', async ({ tableAction }) => {
        await tableAction.fillingInputAndReplaceValue('Automation')
        await tableAction.verifyValidationWhenAnyValueNotMatchedWithCells();
    })

    

})
