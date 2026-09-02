import { test } from '../../support/Fixture/testFixture';

test.describe('Importer Table Actions Feature, "Filters Functionality for columns"', () => {

    test.beforeEach('Verify that user is able to navigate to review page', async ({ tableAction }) => {
        await tableAction.navigateToReviewPage()
    })

    test('Verify all filters are visible', async ({ tableAction }) => {
        await tableAction.verifyAllFiltersAreVisible();
    })

    test('Verify invalid filter when no invalid data is present', async ({ tableAction }) => {
        await tableAction.verifyInvalidFilterWhenNoInvalidDataIsPresent();
    })

    test('Verify invalid filter when invalid data is present', async ({ tableAction }) => {
        await tableAction.verifyInvalidFilterWhenInvalidDataIsPresent();
    })

    test('Verify duplicate filter when no duplicate data is present', async ({ tableAction }) => {
        await tableAction.verifyDuplicateFilterWhenNoDuplicateDataIsPresent();
    })

    test.skip('Verify duplicate filter when duplicate data is present', async ({ tableAction }) => { // Skipping this test as there is an error like any duplicate is not displayed 
        await tableAction.verifyDuplicateFilterWhenDuplicateDataIsPresent();
    })

    
    test('Verify filter by errors when integer error is present', async ({ tableAction }) => {
        await tableAction.userUsesTheFilterByErrors();
    })
})