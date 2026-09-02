import { test } from '../support/Fixture/testFixture.js'
import { generateRandomEmail } from '../support/Utils/generalPlaywrightMethods.js';
import signupTestData from '../support/TestData/Signuptestdata/signUp.json' with { type: 'json' };
import validationMsg from '../support/TestData/Signuptestdata/UIText.json' with { type: 'json' };


test.describe('Test scripts of Signup page', () => {

  test.beforeEach('Navigating to Signup Page', async ({ signupPage }) => {
    await signupPage.navigateToSignupPage();
  })


  test('Verify that user is able to Signup', async ({ signupPage }) => {

    const randomEmail = generateRandomEmail();
    await signupPage.validSignup(signupTestData.firstName,signupTestData.lastName,signupTestData.companyName,randomEmail,signupTestData.password,validationMsg.validation);
  })

  test('Verify the visibility of all elements present in Signup page', async ({ signupPage }) => {
    await signupPage.elementVisibility();
  })

  test('Verify the functionality "Sign up with GitHub" button w.r.t Create an Account page', async ({ signupPage }) => {
    await signupPage.functionalityOfSignupWithGithubButton(validationMsg.githubValidationText);
  })


  test('Verify the functionality of signin link-text under signup page', async ({ signupPage }) => {
    await signupPage.functionalityOfSigninLinkText(signupTestData.validationURL);

  })

  test('Verify the functionality "validation list" check icon  w.r.t Create an Account page', async ({ signupPage }) => {
    await signupPage.verifyThePasswordValidationList(signupTestData.password);
  })

  test('Verify the functionality Eye icon w.r.t Create an Account page', async ({ signupPage }) => {
    await signupPage.functionalityOfEyeIcon(signupTestData.password);

  })

  test('Verify the functionality of the "Sign up" button with out fill any data in the input fields', async ({ signupPage }) => {
    await signupPage.visibilityOfValidations();

  })

})