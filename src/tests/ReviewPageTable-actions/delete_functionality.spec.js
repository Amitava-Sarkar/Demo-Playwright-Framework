import { test } from '../../support/Fixture/testFixture';
import { csvHeadersForNewFile } from '../../support/Utils/generalPlaywrightMethods';


test.describe('Importer Table Actions Feature, "Delete Functionality for columns"', () => {

    test.beforeEach('Verify that user is able to navigate to review page', async ({ tableAction }) => {
        await tableAction.navigateToReviewPage()
    })

    test('Verify delete button is disable without selecting any column', async ({ tableAction }) => {
        await tableAction.matchRowDataReview(csvHeadersForNewFile);
        await tableAction.verifyDeleteButtonIsDisableWithoutSelectingAnyColumn();
    })

    test('Verify delete button functionality by deleting one row at a time', async ({ tableAction }) => {
        await tableAction.matchRowDataReview(csvHeadersForNewFile);
        await tableAction.deleteOneRowAtATime();
    })

    test('Verify delete button functionality by deleting all rows at a time', async ({ tableAction }) => {
        await tableAction.matchRowDataReview(csvHeadersForNewFile);
        await tableAction.deleteAllRowAtATime();
    })

    test('Verify one empty row left each time on deleting all row"', async ({ tableAction }) => {
        await tableAction.deleteAllRowAtATime();
        await tableAction.verifyOneRowAlwaysPresent();
    })

    test('Verify on adding data in empty row, one new row is added automatically', async ({ tableAction }) => {
        await tableAction.deleteAllRowAtATime();
        await tableAction.verifyOneRowAlwaysPresent();
        await tableAction.rowAddedAutomatically();
    })

    test('Functionality of cancel button under delete popup', async ({ tableAction }) => {

        await tableAction.cancelButtonUnderDeletePopup();
    })

    test('Functionality of cross icon under delete popup', async ({ tableAction }) => {
        await tableAction.crossIconUnderDeletePopup();
    })
})


    