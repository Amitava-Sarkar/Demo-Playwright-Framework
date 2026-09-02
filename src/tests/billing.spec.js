import { test } from '../support/Fixture/testFixture';


test.describe('Billing Feature', () => {

    test.beforeEach('Verify that user is able to navigate to billing page', async ({ billing }) => {
        await billing.navigateToBillingPage();
    })

    test('Verify the visibility of all elements present in billing page', async ({ billing }) => {

        await billing.verifyVisibilityOfAllElementsInBillingPage();
    })

    test('Verify the visibility of all elements present in payment method popup', async ({ billing }) => {
        await billing.verifyVisibilityOfPaymentMethodPopup();
    })

    test('Verify user is able to change card details', async ({ billing }) => {
        await billing.changeCardDetails();
    })

    test('Verify required validation message in error state', async ({ billing }) => {
        await billing.verifyRequiredValidationMessageInErrorStateForChangeCardDetails()
    })

    test('Verify change card button is disabled without any changes', async ({ billing }) => {
        await billing.verifyChangeCardButtonIsDisabledWithoutAnyChanges()
    })

    test('Verify change card button is enabled with valid details', async ({ billing }) => {
        await billing.verifyChangeCardButtonIsEnabledWithValidDetails()
    })

    test('Verify user is able to close the payment method popup', async ({ billing }) => {
        await billing.verifyUserIsAbleToCloseThePaymentMethodPopup()
    })

    test.skip('Verify user is able to upgrade plan', async ({ billing }) => {  //currently blocked deu to an error 
        await billing.planPurchase()
    })

    test('Verify the element visibility of invoice table', async ({ billing }) => {
        await billing.verifyVisibilityOfInvoiceTable()
    })

    test('Verify that "paid" status and amount is displayed under status column after successfully buying the standard plan for monthly subscription', async ({ billing }) => {
        await billing.verifyPaidStatusIsDisplayedInGreenColor()
        
    })  
})      