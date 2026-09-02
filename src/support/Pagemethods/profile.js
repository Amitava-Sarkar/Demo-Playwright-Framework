import { clickWebElement, inputField, visibilityOfElement } from '../Utils/generalPlaywrightMethods';
import { expect } from '@playwright/test';
import profileData from '../TestData/profile.json' with { type: 'json' };

export class Profile {
    constructor(page) {
        this.page = page;
        this.menuIcon = page.locator('.eJpXAL');
        this.menuPopupOptions = page.locator('[data-popper-placement="right-end"]')
        this.profileTab = page.getByText('My Account');
        this.personalInformationSection = page.getByTestId('section-title').first()
        this.passwordInformationSection = page.getByTestId('section-title').nth(1)
        this.customizationSection = page.getByTestId('section-title').last()
        this.firstNameInput = page.locator('#first_name')
        this.lastNameInput = page.locator('#last_name')
        this.emailInput = page.locator('#email')
        this.saveChangesButton = page.locator('[type="submit"]').first() 
        this.firstNameToastMessage = page.getByText(profileData.successValidation.firstNameUpdated)
        this.lastNameToastMessage = page.getByText(profileData.successValidation.lastNameUpdated)
        this.firstNameRequiredValidation = page.getByText(profileData.errorValidation.firstNameRequired)
        this.lastNameRequiredValidation = page.getByText(profileData.errorValidation.lastNameRequired)
        this.emailRequiredValidation = page.getByText(profileData.errorValidation.emailRequired)
        this.currentPasswordInput = page.locator('#current_password')
        this.newPasswordInput = page.locator('#password')
        this.confirmPasswordInput = page.locator('#password_confirmation')
        this.currentPasswordRequiredValidation = page.getByText(profileData.passwordValidation.currentPasswordRequired)
        this.resetPasswordButton = page.getByRole('button', { name: 'Reset Password' })
        this.passwordMismatchValidation = page.getByText(profileData.passwordValidation.passwordMismatch)
        this.passwordSameAsCurrentValidation = page.getByText(profileData.passwordValidation.passwordSameAsCurrent)
        this.passwordTooShortValidation = page.getByText(profileData.passwordValidation.passwordTooShortForm)
        this.passwordMissingUppercaseValidation = page.getByText(profileData.passwordValidation.passwordMissingUppercaseForm)
        this.checkoutButton = page.getByTestId('checkout')
        this.brandingPageTitle = page.getByTestId('brandingTitle')
    }

    generateRandomName(prefix) {
        const randomSuffix = Math.random().toString(36).slice(2, 8);
        return `${prefix}${randomSuffix}`;
    }

    async navigateToProfilePage() {
        await this.page.goto('/');
        await clickWebElement(this.menuIcon);
        await expect(this.menuPopupOptions).toBeVisible({ timeout: 6000 });
        await clickWebElement(this.profileTab);
        await expect(this.page).toHaveURL(/\/account\//, { timeout: 6000 })
        await expect(this.personalInformationSection).toBeVisible();
    }

    async visibilityOfPersonalInformationSection() {
        const elements = [ this.personalInformationSection, this.firstNameInput, this.lastNameInput, this.emailInput, this.saveChangesButton ]
            for (const element of elements) {
              await visibilityOfElement(element);
            }
    }

    async verifySaveChangesButtonIsDisabledWithoutAnyChanges() {
        await expect(this.saveChangesButton).toBeDisabled()
    }

    async verifyUserIsAbleToChangeTheirFirstName() {
        const randomFirstName = this.generateRandomName('Test');
        await expect(this.firstNameInput).toBeVisible()
        await inputField(this.firstNameInput, randomFirstName)
        await expect(this.saveChangesButton).toBeEnabled()
        await clickWebElement(this.saveChangesButton)
        await expect(this.firstNameToastMessage).toBeVisible()
        await expect(this.firstNameToastMessage).toHaveText(profileData.successValidation.firstNameUpdated)
        await expect(this.saveChangesButton).toBeDisabled()
    }

    async verifyUserIsAbleToChangeTheirLastName() {
        const randomLastName = this.generateRandomName('Automation');
        await expect(this.lastNameInput).toBeVisible()
        await inputField(this.lastNameInput, randomLastName)
        await expect(this.saveChangesButton).toBeEnabled()
        await clickWebElement(this.saveChangesButton)
        await expect(this.lastNameToastMessage).toBeVisible()
        await expect(this.lastNameToastMessage).toHaveText(profileData.successValidation.lastNameUpdated)
        await expect(this.saveChangesButton).toBeDisabled()
    }
    
      async verifyRequiredValidationMessageInErrorState() {
        await expect(this.firstNameInput).toBeVisible()
        await this.firstNameInput.clear()
        await expect(this.firstNameRequiredValidation).toBeVisible()
        await expect(this.firstNameRequiredValidation).toHaveText(profileData.errorValidation.firstNameRequired)
        await expect(this.lastNameInput).toBeVisible()
        await this.lastNameInput.clear()
        await expect(this.lastNameRequiredValidation).toBeVisible()
        await expect(this.lastNameRequiredValidation).toHaveText(profileData.errorValidation.lastNameRequired)
        await expect(this.emailInput).toBeVisible()
        await this.emailInput.clear()
        await expect(this.emailRequiredValidation).toBeVisible()
        await expect(this.emailRequiredValidation).toHaveText(profileData.errorValidation.emailRequired)
        await expect(this.saveChangesButton).toBeDisabled()
      }

      async verifyErrorMessageForEmptyOldPasswordInputField() {
        await expect(this.currentPasswordInput).toBeVisible()
        await clickWebElement(this.currentPasswordInput)
        await clickWebElement(this.passwordInformationSection)
        await expect(this.currentPasswordRequiredValidation).toBeVisible()
        await expect(this.currentPasswordRequiredValidation).toContainText(profileData.passwordValidation.currentPasswordRequired)
        await expect(this.resetPasswordButton).toBeDisabled()
      }

      async verifyErrorMessageForPasswordMismatch() {
        await expect(this.newPasswordInput).toBeVisible()
        await this.newPasswordInput.fill(profileData.password.newPassword)
        await expect(this.newPasswordInput).toHaveValue(profileData.password.newPassword)
        await expect(this.confirmPasswordInput).toBeVisible()
        await this.confirmPasswordInput.fill(profileData.password.newPassword + '1')
        await expect(this.confirmPasswordInput).toHaveValue(profileData.password.newPassword + '1')
        await expect(this.passwordMismatchValidation).toBeVisible()
        await expect(this.passwordMismatchValidation).toHaveText(profileData.passwordValidation.passwordMismatch)
        await expect(this.resetPasswordButton).toBeDisabled()
      }

      async verifyErrorMessageForPasswordSameAsCurrent() {
        await expect(this.currentPasswordInput).toBeVisible()
        await this.currentPasswordInput.fill(profileData.password.newPassword)
        await expect(this.currentPasswordInput).toHaveValue(profileData.password.newPassword)
        await expect(this.newPasswordInput).toBeVisible()
        await this.newPasswordInput.fill(profileData.password.newPassword)
        await expect(this.confirmPasswordInput).toBeVisible()
        await this.confirmPasswordInput.fill(profileData.password.newPassword)
        await expect(this.confirmPasswordInput).toHaveValue(profileData.password.newPassword)
        await expect(this.resetPasswordButton).toBeEnabled()
        await this.resetPasswordButton.click()
        await expect(this.passwordSameAsCurrentValidation).toBeVisible()
        await expect(this.passwordSameAsCurrentValidation).toHaveText(profileData.passwordValidation.passwordSameAsCurrent)
      }

      async verifyErrorMessageForPasswordTooShort() {
        await expect(this.newPasswordInput).toBeVisible()
        await this.newPasswordInput.fill('Pa1!x')
        await expect(this.newPasswordInput).toHaveValue('Pa1!x')
        await expect(this.passwordTooShortValidation).toBeVisible()
        await expect(this.passwordTooShortValidation).toContainText(profileData.passwordValidation.passwordTooShortForm)
        await expect(this.resetPasswordButton).toBeDisabled()
      }

      async verifyErrorMessageForPasswordTooWeak() {
        await expect(this.newPasswordInput).toBeVisible()
        await this.newPasswordInput.fill('abcdefgh')
        await expect(this.newPasswordInput).toHaveValue('abcdefgh')
        await expect(this.passwordMissingUppercaseValidation).toBeVisible()
        await expect(this.passwordMissingUppercaseValidation).toContainText(profileData.passwordValidation.passwordMissingUppercaseForm)
        await expect(this.resetPasswordButton).toBeDisabled()
      }

      async verifyFunctionalityOfCheckoutButton() {
       await expect(this.checkoutButton).toBeVisible()
       await expect(this.checkoutButton).toBeEnabled()
       await this.checkoutButton.click()
      await expect(this.page).toHaveURL(/importer-style-preferences$/, { timeout: 6000 });
      await expect(this.brandingPageTitle).toBeVisible();
      }
}