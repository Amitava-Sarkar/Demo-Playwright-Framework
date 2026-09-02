import { test } from '../../support/Fixture/testFixture';

test.describe('Importer Apply Filters Feature, "Apply Filters Functionality for columns"', () => {

    test.beforeEach('Verify that user is able to navigate to review page', async ({ applyFilters }) => {
        await applyFilters.navigateToReviewPage()
    })

    test('Verify functionality of add condition button', async ({ conditionGroup }) => {
        await conditionGroup.verifyFunctionalityOfAddConditionButton();
    })

    test('Verify functionality of add condition group button', async ({ conditionGroup }) => {
        await conditionGroup.verifyFunctionalityOfAddConditionGroupButton();
    })

    test('Verify functionality of delete condition button', async ({ conditionGroup }) => {
        await conditionGroup.deleteCondition();
    })

    test('Verify functionality of delete condition group button', async ({ conditionGroup }) => {
        await conditionGroup.deleteConditionGroup();
    })

    test('Verify functionality of applying condition filters for string and integer columns', async ({ conditionGroup }) => {
        await conditionGroup.applyingConditionFiltersForStringAndIntegerColumns();
    })

    test('Verify functionality of applying condition filters for string and boolean columns', async ({ conditionGroup }) => {
        await conditionGroup.applyingConditionFiltersForStringAndBooleanColumns();
    })

    test('Verify functionality of applying condition filters for string and dropdown columns', async ({ conditionGroup }) => {
        await conditionGroup.applyingConditionFiltersForStringAndDropdownColumns();
    })

    test('Verify functionality of applying condition filters for string and email columns', async ({ conditionGroup }) => {
        await conditionGroup.applyingConditionFiltersForStringAndEmailColumns();
    })

    test('Verify functionality of applying condition filters for string and time columns', async ({ conditionGroup }) => {
        await conditionGroup.applyingConditionFiltersForStringAndTimeColumns();
    })

    test('Verify functionality of applying condition filters for integer and boolean columns', async ({ conditionGroup }) => {
        await conditionGroup.applyingConditionFiltersForIntegerAndBooleanColumns();
    })

    test('Verify functionality of applying condition filters for integer and email columns', async ({ conditionGroup }) => {
        await conditionGroup.applyingConditionFiltersForIntegerAndEmailColumns();
    })

    test('Verify functionality of applying condition filters for integer and dropdown columns', async ({ conditionGroup }) => {
        await conditionGroup.applyingConditionFiltersForIntegerAndDropdownColumns();
    })

    test('Verify functionality of applying condition filters for integer and time columns', async ({ conditionGroup }) => {
        await conditionGroup.applyingConditionFiltersForIntegerAndTimeColumns();
    })

    test('Verify functionality of applying condition filters for boolean and dropdown columns', async ({ conditionGroup }) => {
        await conditionGroup.applyingConditionFiltersForBooleanAndDropdownColumns();
    })

    test('Verify functionality of applying condition filters for boolean and email columns', async ({ conditionGroup }) => {
        await conditionGroup.applyingConditionFiltersForBooleanAndEmailColumns();
    })

    test('Verify functionality of applying condition filters for boolean and date columns', async ({ conditionGroup }) => {
        await conditionGroup.applyingConditionFiltersForBooleanAndDateColumns();
    })

    test('Verify functionality of applying condition filters for boolean and time columns', async ({ conditionGroup }) => {
        await conditionGroup.applyingConditionFiltersForBooleanAndTimeColumns();
    })

    test('Verify functionality of applying condition filters for string and url columns', async ({ conditionGroup }) => {
        await conditionGroup.applyingConditionFiltersForStringAndUrlColumns();
    })

    test('Verify functionality of applying condition filters for integer and url columns', async ({ conditionGroup }) => {
        await conditionGroup.applyingConditionFiltersForIntegerAndUrlColumns();
    })

    test('Verify functionality of applying condition filters for boolean and url columns', async ({ conditionGroup }) => {
        await conditionGroup.applyingConditionFiltersForBooleanAndUrlColumns();
    })

    test('Verify functionality of applying condition filters for url and dropdown columns', async ({ conditionGroup }) => {
        await conditionGroup.applyingConditionFiltersForUrlAndDropdownColumns();
    })

    test('Verify functionality of applying condition filters for url and time columns', async ({ conditionGroup }) => {
        await conditionGroup.applyingConditionFiltersForUrlAndTimeColumns();
    })
})
