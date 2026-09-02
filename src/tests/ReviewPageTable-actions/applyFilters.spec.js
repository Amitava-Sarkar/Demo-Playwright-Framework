import { test } from '../../support/Fixture/testFixture';

test.describe('Importer Apply Filters Feature, "Apply Filters Functionality for columns"', () => {

    test.beforeEach('Verify that user is able to navigate to review page', async ({ applyFilters }) => {
        await applyFilters.navigateToReviewPage()
    })

    test('Verify functionality of apply filter icon and visibility of elements in apply filter popup', async ({ applyFilters }) => {
        await applyFilters.verifyFunctionalityOfApplyFilterIcon();
        await applyFilters.visibilityOfElementsInApplyFilterPopup();
    })

    test('Verify functionality of apply filter for boolean column with is operator', async ({ applyFilters }) => {

        await applyFilters.applyFilterForBooleanColumnWithIsOperator();
    })

    test('Verify functionality of apply filter for boolean column with is empty operator', async ({ applyFilters }) => {
        await applyFilters.applyFilterForBooleanColumnWithIsEmptyOperator();
    })

    test('Verify functionality of apply filter for boolean column with is not empty operator', async ({ applyFilters }) => {

        await applyFilters.applyFilterForBooleanColumnWithIsNotEmptyOperator();
    })

    test('Verify the operators for string column', async ({ applyFilters }) => {

        await applyFilters.verifyAvailableOperatorsForStringColumn();
    })

    test('Verify functionality of apply filter for string column with contains operator', async ({ applyFilters }) => {

        await applyFilters.applyFilterForStringColumnWithContainsOperator();
    })

    test('Verify functionality of apply filter for string column with does not contain operator', async ({ applyFilters }) => {
        await applyFilters.applyFilterForStringColumnWithDoesNotContainOperator();
    })

    test('Verify functionality of apply filter for string column with is operator', async ({ applyFilters }) => {
        await applyFilters.applyFilterForStringColumnWithIsOperator();
    })

    test('Verify functionality of apply filter for string column with is empty operator', async ({ applyFilters }) => {

        await applyFilters.applyFilterForStringColumnWithIsEmptyOperator();
    })

    test('Verify functionality of apply filter for string column with is not empty operator', async ({ applyFilters }) => {

        await applyFilters.applyFilterForStringColumnWithIsNotEmptyOperator();
    })

    test('Verify the operators for integer and float column', async ({ applyFilters }) => {

        await applyFilters.verifyAvailableOperatorsForIntegerAndFloatColumn();
    })

    test('Verify functionality of apply filter for integer column with is operator', async ({ applyFilters }) => {
        await applyFilters.applyFilterForIntegerColumnWithIsOperator();
    })

    test('Verify functionality of apply filter for integer column with is not operator', async ({ applyFilters }) => {
        await applyFilters.applyFilterForIntegerColumnWithIsNotOperator();
    })

    test('Verify functionality of apply filter for integer column with is greater than operator', async ({ applyFilters }) => {
        await applyFilters.applyFilterForIntegerColumnWithIsGreaterThanOperator();
    })

    test('Verify functionality of apply filter for integer column with is Greater than operator when no data is greater than the value', async ({ applyFilters }) => {
        await applyFilters.applyFilterForIntegerColumnWithIsGreaterThanOperatorWhenNoDataIsGreaterThanTheValue();
    })

    test('Verify functionality of apply filter for integer column with is less than operator', async ({ applyFilters }) => {
        await applyFilters.applyFilterForIntegerColumnWithIsLessThanOperator();
    })

    test('Verify functionality of apply filter for integer column with is less than operator when no data is less than the value', async ({ applyFilters }) => {
        await applyFilters.applyFilterForIntegerColumnWithIsLessThanOperatorWhenNoDataIsLessThanTheValue();
    })

    test('Verify the operators for email and url column', async ({ applyFilters }) => {
        await applyFilters.verifyAvailableOperatorsForEmailAndUrlColumn();
    })

    test('Verify functionality of apply filter for email column with contains operator', async ({ applyFilters }) => {
        await applyFilters.applyFilterForEmailColumnWithContainsOperator();
    })

    test('Verify functionality of apply filter for email column with does not contain operator', async ({ applyFilters }) => {
        await applyFilters.applyFilterForEmailColumnWithDoesNotContainOperator();
    })

    test('Verify functionality of apply filter for email column with is operator', async ({ applyFilters }) => {
        await applyFilters.applyFilterForEmailColumnWithIsOperator();
    })

    test('Verify functionality of apply filter for email column with is not operator', async ({ applyFilters }) => {
        await applyFilters.applyFilterForEmailColumnWithIsNotOperator();
    })

    test('Verify functionality of apply filter for email column with is empty operator', async ({ applyFilters }) => {
        await applyFilters.applyFilterForEmailColumnWithIsEmptyOperator();
    })

    test('Verify functionality of apply filter for email column with is not empty operator', async ({ applyFilters }) => {
        await applyFilters.applyFilterForEmailColumnWithIsNotEmptyOperator();
    })

    test('Verify functionality of apply filter for url column with contains operator', async ({ applyFilters }) => {
        await applyFilters.applyFilterForUrlColumnWithContainsOperator();
    })

    test('Verify functionality of apply filter for url column with does not contain operator', async ({ applyFilters }) => {
        await applyFilters.applyFilterForUrlColumnWithDoesNotContainOperator();
    })

    test('Verify functionality of apply filter for url column with is operator', async ({ applyFilters }) => {
        await applyFilters.applyFilterForUrlColumnWithIsOperator();
    })

    test('Verify functionality of apply filter for url column with is not operator', async ({ applyFilters }) => {
        await applyFilters.applyFilterForUrlColumnWithIsNotOperator();
    })

    test('Verify functionality of apply filter for url column with is empty operator', async ({ applyFilters }) => {
        await applyFilters.applyFilterForUrlColumnWithIsEmptyOperator();
    })

    test('Verify functionality of apply filter for url column with is not empty operator', async ({ applyFilters }) => {
        await applyFilters.applyFilterForUrlColumnWithIsNotEmptyOperator();
    })

    test('Verify the operators for date column', async ({ applyFilters }) => {
        await applyFilters.verifyAvailableOperatorsForDateColumn();
    })

    test('Verify functionality of apply filter for date column with is operator', async ({ applyFilters }) => {
        await applyFilters.applyFilterForDateColumnWithIsOperator();
    })

    test('Verify functionality of apply filter for date column with is not operator', async ({ applyFilters }) => {
        await applyFilters.applyFilterForDateColumnWithIsNotOperator();
    })

    test('Verify the operators for time column', async ({ applyFilters }) => {
        await applyFilters.verifyAvailableOperatorsForTimeColumn();
    })

    test('Verify functionality of apply filter for time column with is operator', async ({ applyFilters }) => {
        await applyFilters.applyFilterForTimeColumnWithIsOperator()
    })

    test('Verify functionality of apply filter for time column with isNot operator', async ({ applyFilters }) => {
        await applyFilters.applyFilterForTimeColumnWithIsNotOperator()
    })

    test('Verify functionality of apply filter for time column with contains operator', async ({ applyFilters }) => {
        await applyFilters.applyFilterForTimeColumnWithContainsOperator()
    })

    test('Verify functionality of apply filter for time column with Does not contain operator', async ({ applyFilters }) => {
        await applyFilters.applyFilterForTimeColumnWithDoesNotContainOperator()
    })

    test('Verify functionality of apply filter for time column with IsEmpty operator', async ({ applyFilters }) => {
        await applyFilters.applyFilterForTimeColumnWithIsEmptyOperator()
    })

    test('Verify functionality of apply filter for time column with IsNotEmpty operator', async ({ applyFilters }) => {
        await applyFilters.applyFilterForTimeColumnWithIsNotEmptyOperator()
    })

    test('Verify the operators for dropdown column', async ({ applyFilters }) => {
        await applyFilters.verifyAvailableOperatorsForDropdownColumn();
    })

    test('Verify functionality of apply filter for dropdown column with is operator', async ({ applyFilters }) => {
        await applyFilters.applyFilterForDropdownColumnWithIsOperator();
    })

    test('Verify functionality of apply filter for dropdown column with is not operator', async ({ applyFilters }) => {
        await applyFilters.applyFilterForDropdownColumnWithIsNotOperator();
    })

    test('Verify functionality of apply filter for dropdown column with is empty operator', async ({ applyFilters }) => {
        await applyFilters.applyFilterForDropdownColumnWithIsEmptyOperator();
    })

    test('Verify functionality of apply filter for dropdown column with is not empty operator', async ({ applyFilters }) => {
        await applyFilters.applyFilterForDropdownColumnWithIsNotEmptyOperator();
    })

    test('Verify functionality of cross icon in dropdown column', async ({ applyFilters }) => {
        await applyFilters.verifyFunctionalityOfCrossIconInDropdownColumn();
    })

    test('Verify functionality of change dropdown option', async ({ applyFilters }) => {
        await applyFilters.verifyFunctionalityOfChangeDropdownOption();
    })

    test('Verify functionality of deleting applied filter', async ({ applyFilters }) => {
        await applyFilters.deletingAppliedFilter();
    })
})