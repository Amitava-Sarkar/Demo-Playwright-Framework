import { expect } from '@playwright/test';
import { clickWebElement, visibilityOfElement, inputField } from '../Utils/generalPlaywrightMethods';
import billingData from '../TestData/Signuptestdata/billing.json' with { type: 'json' };
export class Billing {
    constructor(page) {
        this.page = page;
        this.menuIcon = page.locator('.eJpXAL');
        this.menuPopupOptions = page.locator('[data-popper-placement="right-end"]')
        this.billingTab = page.getByTestId('billingPlansText')
        this.billingPageTitle = page.getByTestId('billingPlanTitle')
        this.yourPlanSection = page.locator('.eNgFZw')
        this.paymentMethodsSection = page.locator('.sc-gmAFnh')
        this.invoiceTable = page.locator('[data-test-id="table-view-wrapper"]')
        this.plansSection = page.getByTestId('plan-heading-text')
        this.standardPlanSection = page.locator('.sc-eYErWf').first()
        this.professionalPlanSection = page.locator('.sc-eYErWf').nth(1)
        this.customPlanSection = page.locator('.sc-eYErWf').last()
        this.cardHolderInput = page.locator('#cardHolder')
        this.emailInput = page.locator('#email')
        this.phoneNumberInput = page.locator('#phone')
        this.cardNumberInput = page.getByTestId('cardField')
        this.updatePlanButton = page.getByRole('button', { name: 'Upgrade Plan' })
        this.changeCardButton = page.getByRole('button', { name: 'Change Card' })
        this.changeCardLink = page.getByTestId('addedCardLink')
        this.changePaymentMethodPopup = page.locator('div form').first()
        this.popupTitle = page.getByText('Change Payment Method')
        this.successMessage = page.getByText(billingData.successMessage.paymentMethodChangeSuccessMessage)
        this.cardHolderRequiredValidation = page.getByText(billingData.errorMessage.cardHolderRequired)
        this.emailRequiredValidation = page.getByText(billingData.errorMessage.emailRequired)
        this.phoneNumberRequiredValidation = page.getByText(billingData.errorMessage.phoneNumberRequired)
        this.cardInformationRequiredValidation = page.getByText(billingData.errorMessage.cardInformationRequired)
        this.closePopupButton = page.getByTestId('close-icon')
        this.chooseStandardPlanButton = page.getByTestId('planButton').first()
        this.chooseProfessionalPlanButton = page.getByTestId('planButton').nth(1)
        this.planUpgradedValidation = page.getByText(billingData.successMessage.planUpgradedSuccessMessage) 
        this.invoiceNumberColumn = page.locator('#tableHeaderId').filter({ hasText: 'Invoice number' })
        this.invoiceDateColumn = page.locator('#tableHeaderId').filter({ hasText: 'Invoice date' })
        this.invoiceAmountColumn = page.locator('#tableHeaderId').filter({ hasText: 'Amount' })
        this.invoiceStatusColumn = page.locator('#tableHeaderId').filter({ hasText: 'Status' })
        this.invoiceActionColumn = page.locator('#tableHeaderId').last()
        this.paidStatusColumn = page.locator('#row-id-0').getByTestId('cell-column').nth(2)

    }

    async navigateToBillingPage() {
        await this.page.goto('/');
        await clickWebElement(this.menuIcon);
        await expect(this.menuPopupOptions).toBeVisible();
        await clickWebElement(this.billingTab);
        await expect(this.page).toHaveURL(/\/account\/billing\/?$/, {timeout: 6000})
        await expect(this.billingPageTitle).toBeVisible();
    }

    async verifyVisibilityOfAllElementsInBillingPage() {
        const elements = [
            this.billingPageTitle, this.yourPlanSection, this.paymentMethodsSection, this.invoiceTable, this.plansSection, 
            this.standardPlanSection, this.professionalPlanSection, this.customPlanSection
        ]

        for (const element of elements) {
            await visibilityOfElement(element)
        }
    }

    async changeCardDetails() {
        await expect(this.changeCardLink).toBeVisible();
        await clickWebElement(this.changeCardLink)
        await expect(this.changePaymentMethodPopup).toBeVisible();
        await this.verifyFillupCardDetailsForm()  
        await clickWebElement(this.changeCardButton)
        await expect(this.successMessage).toBeVisible();
        await expect(this.successMessage).toHaveText(billingData.successMessage.paymentMethodChangeSuccessMessage);
    }

    async verifyVisibilityOfPaymentMethodPopup(){
        await expect(this.changeCardLink).toBeVisible();
        await clickWebElement(this.changeCardLink)
        await expect(this.changePaymentMethodPopup).toBeVisible();
        const elements = [
            this.cardHolderInput, this.emailInput, this.phoneNumberInput, this.cardNumberInput, this.changeCardButton
        ]

        for (const element of elements) {
            await visibilityOfElement(element);
        }
    }

    async verifyFillupCardDetailsForm() {
        await inputField(this.cardHolderInput, billingData.cardDetails.cardHolderName);
        await inputField(this.emailInput, billingData.cardDetails.email);
        await inputField(this.phoneNumberInput, billingData.cardDetails.phoneNumber);

        await expect(this.cardNumberInput).toBeVisible();

        const stripeFrame = this.cardNumberInput.frameLocator('iframe').first();
        const cardNumber = stripeFrame.getByRole('textbox', { name: 'Credit or debit card number' });
        const expiryDate = stripeFrame.getByPlaceholder('MM / YY');
        const cvc = stripeFrame.getByPlaceholder('CVC');

        await expect(cardNumber).toBeVisible();
        await cardNumber.fill(billingData.cardDetails.cardNumber);
        await expiryDate.fill(billingData.cardDetails.expiryDate);
        await cvc.fill(billingData.cardDetails.cvc);
    }

    async verifyRequiredValidationMessageInErrorStateForChangeCardDetails() {
        await expect(this.changeCardLink).toBeVisible();
        await clickWebElement(this.changeCardLink)
        await expect(this.changePaymentMethodPopup).toBeVisible();

        const validationFields = [
            {
                input: this.cardHolderInput,
                validation: this.cardHolderRequiredValidation,
                message: billingData.errorMessage.cardHolderRequired
            },
            {
                input: this.emailInput,
                validation: this.emailRequiredValidation,
                message: billingData.errorMessage.emailRequired
            },
            {
                input: this.phoneNumberInput,
                validation: this.phoneNumberRequiredValidation,
                message: billingData.errorMessage.phoneNumberRequired
            },
            {
                input: this.cardNumberInput,
                validation: this.cardInformationRequiredValidation,
                message: billingData.errorMessage.cardInformationRequired
            }
        ];

        for (const field of validationFields) {
            await expect(field.input).toBeVisible();
            await field.input.click();
            await this.popupTitle.click();
            await expect(field.validation).toBeVisible();
            await expect(field.validation).toHaveText(field.message);
        }
    }

    async verifyChangeCardButtonIsDisabledWithoutAnyChanges() {
        await expect(this.changeCardLink).toBeVisible();
        await clickWebElement(this.changeCardLink)
        await expect(this.changePaymentMethodPopup).toBeVisible();
        await expect(this.changeCardButton).toBeVisible();
        await expect(this.changeCardButton).toHaveAttribute('disabled', '');
    }

    async verifyChangeCardButtonIsEnabledWithValidDetails() {
        await expect(this.changeCardLink).toBeVisible();
        await clickWebElement(this.changeCardLink)
        await expect(this.changePaymentMethodPopup).toBeVisible();
        await this.verifyFillupCardDetailsForm()
        await expect(this.changeCardButton).toBeVisible();
        await expect(this.changeCardButton).toBeEnabled();
    }

    async verifyUserIsAbleToCloseThePaymentMethodPopup() {
        await expect(this.changeCardLink).toBeVisible();
        await clickWebElement(this.changeCardLink)
        await expect(this.changePaymentMethodPopup).toBeVisible();
        await expect(this.closePopupButton).toBeVisible();
        await clickWebElement(this.closePopupButton)
        await expect(this.changePaymentMethodPopup).toBeHidden();
    }

    async planPurchase() {
        const planText = await this.yourPlanSection.textContent();
    
        if (planText?.includes('Trial Mode')) {
            await this.chooseStandardPlanButton.click();
            await this.verifyFillupCardDetailsForm();
            await this.updatePlanButton.click();
    
        } else if (planText?.includes('Standard')) {
            await this.chooseProfessionalPlanButton.click();
            await expect(this.planUpgradedValidation).toBeVisible({ timeout: 6000 });
            await expect(this.planUpgradedValidation)
                .toHaveText(billingData.successMessage.planUpgradedSuccessMessage);
    
        } else if (planText?.includes('Professional')) {
            await this.chooseStandardPlanButton.click();
            await expect(this.planUpgradedValidation).toBeVisible({ timeout: 6000 });
            await expect(this.planUpgradedValidation)
                .toHaveText(billingData.successMessage.planUpgradedSuccessMessage);
        }
    }

    async verifyVisibilityOfInvoiceTable() {
        await expect(this.invoiceTable).toBeVisible();
        const elements = [
            this.invoiceNumberColumn, this.invoiceDateColumn, this.invoiceAmountColumn, this.invoiceStatusColumn, this.invoiceActionColumn
        ]

        for (const element of elements) {
            await visibilityOfElement(element);
        }
    }

    async verifyPaidStatusIsDisplayedInGreenColor() {
        await expect(this.invoiceStatusColumn).toBeVisible();
        await expect(this.paidStatusColumn).toBeVisible();
        await expect(this.paidStatusColumn).toHaveText('paid');
        const paidIcon = this.paidStatusColumn.locator('svg path');
        await expect(paidIcon).toHaveCSS('fill', 'rgb(0, 208, 133)');
    }

    async verifyAppropriateAmountDisplayedUnderAmountColumnWrtPlan() {
        await expect(this.invoiceAmountColumn).toBeVisible();
        await expect(this.invoiceAmountColumn).toHaveText('100');
    }
}