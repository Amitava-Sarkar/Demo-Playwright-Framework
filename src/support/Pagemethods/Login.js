import { expect } from '@playwright/test';
import { clickWebElement, inputField, visibilityOfElement } from '../Utils/generalPlaywrightMethods.js';
import LoginData from '../TestData/LoginTestdata.json' with { type: 'json' };
export class LoginPage {
  constructor(page) {
    this.page = page;
    this.fuseLogo = page.getByRole('img').first();
    this.signinHeaderText = page.locator('.htXUIZ');
    this.subText = page.getByText(LoginData.labels.subText);
    this.emailLabel = page.getByText(LoginData.labels.emailAddress);
    this.emailInput = page.locator('#email');
    this.passwordLabel = page.getByText(LoginData.labels.password, { exact: true });
    this.passwordInput = page.locator('#password');
    this.eyeIcon = page.locator('.cIAenl');
    this.loginButton = page.getByRole('button', { name: LoginData.labels.signIn, exact: true });
    this.signinWithGithubButton = page.locator('.keiEGL');
    this.forgotPasswordLink = page.getByText(LoginData.labels.forgotPassword);
    this.signupLink = page.locator('.hZKgdz');
    this.doNotHaveAnAccountText = page.getByText(LoginData.labels.doNotHaveAnAccount);
    this.forgotPasswordEmailInput = page.locator('#email');
    this.sendMailButton = page.getByRole('button', { name: LoginData.labels.sendEmail });
    this.validationMessage = page.locator('[role="status"]')
    this.loginValidation = page.getByText(LoginData.labels.invalidEmailOrPassword);
    this.emptyEmailErrorMessage = page.getByText(LoginData.Validations.emptyEmailErrorMessage);
    this.invalidEmailErrorMessage = page.getByText(LoginData.Validations.invalidEmailErrorMessage);
    this.passwordRequiredErrorMessage = page.getByText(LoginData.Validations.passwordRequiredErrorMessage);
    this.userMenuIcon = page.getByTestId('open-user-menu');
    this.menuPopupOptions = page.locator('.bFfgCJ')
    this.logoutButton = page.getByTestId('logout')


  }

  async navigateToLoginPage() {
    await this.page.goto('/');
  }

  async loginWithValidCredential() {
    await inputField(this.emailInput, process.env.USERNAME);
    await inputField(this.passwordInput, process.env.PASSWORD);
    await clickWebElement(this.loginButton);
  }

  async loginwithstandardplanID(email, password) {
    await inputField(this.emailInput, email);
    await inputField(this.passwordInput, password);
    await clickWebElement(this.loginButton);

  }

  async verifyLoginSuccess(expectedUrl) {
    await expect(this.page).toHaveURL(expectedUrl);
  }

  async loginWithInvalidCredential(email, invalidPassword) {
    await inputField(this.emailInput, email);
    await inputField(this.passwordInput, invalidPassword);
    await clickWebElement(this.loginButton);
    await expect(this.loginValidation).toBeVisible();

  }

  async elementVisibility() {
    const elements = [this.fuseLogo, this.signinHeaderText, this.subText, this.emailLabel, this.emailInput, this.passwordLabel, this.passwordInput,
    this.eyeIcon, this.loginButton, this.signinWithGithubButton, this.forgotPasswordLink, this.signupLink, this.doNotHaveAnAccountText,];

    for (const element of elements) {
      await visibilityOfElement(element);
    }
  }

  async functionalityOfSignupLinktext(signupURL) {
    await clickWebElement(this.signupLink);
    await expect(this.page).toHaveURL(signupURL);
  }

  async functionalityOfForgoPasswordLinktext(forgotPasswordURL) {
    await clickWebElement(this.forgotPasswordLink);
    await expect(this.page).toHaveURL(forgotPasswordURL);
  }

  async submitForgotPassword(email) {
    await expect(this.forgotPasswordLink).toBeVisible();
    await this.forgotPasswordLink.click();
    await expect(this.page).toHaveURL(/users\/forgot-password\/?$/, { timeout: 6000 });
    await expect(this.forgotPasswordEmailInput).toBeVisible();
    await this.forgotPasswordEmailInput.fill(email);
    await expect(this.sendMailButton).toBeVisible();
    await expect(this.sendMailButton).toBeEnabled();
    await this.sendMailButton.click();
    await this.page.waitForTimeout(2000); //waiting for the validation message to be visible
    await expect(this.validationMessage).toBeVisible();
    await expect(this.validationMessage).toHaveText(LoginData.Validations.forgetPasswordValidation);
  }

  async verifyValidationMessageForEmptyEmailInputField() {
    await expect(this.emailInput).toBeVisible();
    await this.emailInput.click();
    await expect(this.loginButton).toBeVisible();
    await this.loginButton.click();
    await expect(this.loginButton).toHaveAttribute('disabled');
    await expect(this.emptyEmailErrorMessage).toBeVisible();
    await expect(this.emptyEmailErrorMessage).toHaveText(LoginData.Validations.emptyEmailErrorMessage);
  }

  async verifyValidationMessageForInvalidEmailInputField() {
    await expect(this.emailInput).toBeVisible();
    await inputField(this.emailInput, LoginData.invalidEmail);
    await this.signinHeaderText.click();
    //await expect(this.loginButton).toHaveAttribute('disabled');
    await expect(this.invalidEmailErrorMessage).toBeVisible();
    await expect(this.invalidEmailErrorMessage).toHaveText(LoginData.Validations.invalidEmailErrorMessage);
  }

  async verifyValidationMessageForEmptyPasswordInputField() {
    await this.passwordInput.click();
    await this.loginButton.click();
    await expect(this.loginButton).toHaveAttribute('disabled');
    await expect(this.passwordRequiredErrorMessage).toBeVisible();
    await expect(this.passwordRequiredErrorMessage).toHaveText(LoginData.Validations.passwordRequiredErrorMessage);
  }

  async verifySignInButtonIsDisabledWhenEmailAndPasswordInputFieldsAreEmpty() {
    await expect(this.emailInput).toBeVisible();
    await this.emailInput.click();
    await expect(this.passwordInput).toBeVisible();
    await this.passwordInput.click();
    await expect(this.loginButton).toHaveAttribute('disabled');
  }

  async verifyFunctionalityOfTheEyeIconWRTPasswordField() {
    await expect(this.passwordInput).toBeVisible();
    await this.passwordInput.fill(LoginData.password);
    await expect(this.passwordInput).toHaveValue(LoginData.password);
    await this.eyeIcon.click();
    await expect(this.passwordInput).toHaveAttribute('type', LoginData.inputTypes.text);
    await this.eyeIcon.click();
    await expect(this.passwordInput).toHaveAttribute('type', LoginData.inputTypes.password);

  }

  async verifyUserIsAbleToLogoutFromTheApplication() {
    await expect(this.userMenuIcon).toBeVisible();
    await expect(this.userMenuIcon).toBeEnabled();
    await this.userMenuIcon.click();
    await expect(this.menuPopupOptions).toBeVisible();
    await expect(this.logoutButton).toBeVisible();
    await expect(this.logoutButton).toBeEnabled();
    await this.logoutButton.click();
    await expect(this.page).toHaveURL(/users\/sign-in/, { timeout: 60000 });
  }

}
