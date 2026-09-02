import { test } from '../../support/Fixture/testFixture';

test.describe('Importer Table Actions Feature, "Search Functionality for columns"', () => {

    test.beforeEach('Verify that user is able to navigate to review page', async ({ tableAction }) => {
        await tableAction.navigateToReviewPage()
    })

    test('Verify functionality of search icon', async ({ tableAction }) => {
        await tableAction.verifyFunctionalityOfSearchIcon();
    })

    test('Verify user is able to search', async ({ tableAction }) => {
        await tableAction.verifyFunctionalityOfSearchIcon();
        await tableAction.verifyUserIsAbleToSearch('William');
    })

    test('Verify search functionality with column value which is not exist', async ({ tableAction }) => {
        await tableAction.verifyFunctionalityOfSearchIcon();
        await tableAction.verifyUserIsAbleToSearch('Automation');
        await tableAction.verifyNoRowsFound();
    })

    test('Verify search functionality with column value which is exist', async ({ tableAction }) => {
        await tableAction.verifyFunctionalityOfSearchIcon();
        await tableAction.verifyUserIsAbleToSearch('William');
        await tableAction.verifyRowsFound('William');
    })
})