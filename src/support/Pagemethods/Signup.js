import { expect } from '@playwright/test';
import {
  clickWebElement,
  inputField,
  visibilityOfElement
} from '../Utils/generalPlaywrightMethods.js';
import SignupData from '../TestData/Signuptestdata/signUp.json' with { type: 'json' };

export class SignupPage {

  constructor(page) {
    this.page = page;
    this.signupLink = page.locator('.hZKgdz');
    this.companyLogo = page.getByRole('img').first();
    this.headingText = page.getByText(SignupData.labels.heading);
    this.firstNameLabel = page.getByText(SignupData.labels.firstName);
    this.firstNameField = page.locator('#first_name');
    this.firstNameValidation = page.getByText(SignupData.Validations.firstNameRequired);
    this.lastNameLabel = page.getByText(SignupData.labels.lastName);
    this.lastNameField = page.locator('#last_name');
    this.lastNameValidation = page.getByText(SignupData.Validations.lastNameRequired);
    this.companyNameLabel = page.getByText(SignupData.labels.companyName);
    this.companyNameField = page.locator('#company_name');
    this.companyNameValidation = page.getByText(SignupData.Validations.companyNameRequired);
    this.emailLabel = page.getByText(SignupData.labels.emailAddress);
    this.emailField = page.locator('#email');
    this.emailValidation = page.getByText(SignupData.Validations.emailRequired);
    this.passwordLabel = page.getByText(SignupData.labels.password);
    this.passwordField = page.locator('#password');
    this.eyeIcon = page.locator('.cIAenl');
    this.passwordValidationList = page.locator('.iIqMyw');
    this.passwordValidation = page.getByText(SignupData.labels.passwordRule);
    this.passwordNegativeValidation = page.getByText(SignupData.Validations.passwordRequired);
    this.signupButton = page.locator("[type='submit']");
    this.signupWithGithubButton = page.getByText(SignupData.labels.signUpWithGithub);
    this.termsLink = page.getByText(SignupData.labels.terms);
    this.policyLink = page.getByText(SignupData.labels.privacyPolicy);
    this.signinLink = page.getByTestId('sign-in');
    this.text1 = page.getByText(SignupData.labels.agreeToTerms);
    this.text2 = page.getByText(SignupData.labels.alreadyHaveAnAccount);
    this.checkMailValidation = page.getByText(SignupData.labels.checkYourEmail);
    this.githubText = page.getByText(SignupData.labels.githubText);


  }

  async navigateToSignupPage() {
    await this.page.goto('/');
    await clickWebElement(this.signupLink);
  }

  async elementVisibility() {
    const elements = [ this.companyLogo,this.headingText,this.firstNameLabel,this.firstNameField,this.lastNameLabel,this.lastNameField,
      this.companyNameLabel,this.companyNameField,this.emailLabel,this.emailField,this.passwordLabel,this.passwordField,this.passwordValidationList,
      this.signupButton,this.signupWithGithubButton,this.termsLink,this.policyLink,this.signinLink,this.text1,this.text2];

    for (const element of elements) {
      await visibilityOfElement(element);
    }
  }

  async validSignup(firstName, lastName, companyName, email, password, validation) {
    await inputField(this.firstNameField, firstName);
    await inputField(this.lastNameField, lastName);
    await inputField(this.companyNameField, companyName);
    await inputField(this.emailField, email);
    await inputField(this.passwordField, password);
    await clickWebElement(this.signupButton);
    await expect(this.checkMailValidation).toHaveText(validation);
  }

  async functionalityOfSignupWithGithubButton(githubValidationText) {
    await clickWebElement(this.signupWithGithubButton)
    await expect(this.githubText).toHaveText(githubValidationText);
  }

  async functionalityOfSigninLinkText(validationURL) {
    await clickWebElement(this.signinLink);
    await expect(this.page).toHaveURL(validationURL);
  }

  async verifyThePasswordValidationList(password) {
    await expect(this.passwordField).toBeVisible();
    await this.passwordField.fill(password);
    await expect(this.passwordValidation).toHaveCSS('color', SignupData.styles.passwordValidationColor);

  }

  async functionalityOfEyeIcon(password) {
    await expect(this.passwordField).toBeVisible();
    await this.passwordField.fill(password);
    await expect(this.passwordField).toHaveAttribute('type', SignupData.inputTypes.password);
    await clickWebElement(this.eyeIcon);
    await expect(this.passwordField).toHaveAttribute('type', SignupData.inputTypes.text);
  }

  async visibilityOfValidations() {
    await clickWebElement(this.signupButton);

    const validations = [
      this.firstNameValidation,
      this.lastNameValidation,
      this.companyNameValidation,
      this.emailValidation,
      this.passwordNegativeValidation
    ];

    for (const validation of validations) {
      await visibilityOfElement(validation);
    }
  }

}
