import {test} from '../support/Fixture/testFixture' ; 
import data from '../support/TestData/LoginTestdata.json' with { type: 'json' };

test.describe('Test scripts of Signin page', () => {

  test.beforeEach('Navigate to loginpage ', async ({ loginPage }) => {

    await loginPage.navigateToLoginPage();

  })

  test('Verify that user is able to Login with valid credentials', async ({ loginPage }) => {

    await loginPage.loginWithValidCredential();
    await loginPage.verifyLoginSuccess(data.validationURL);

  })

  test('Verify that user is not able to Login with invalid credentials', async ({ loginPage }) => {

    await loginPage.loginWithInvalidCredential(data.email, data.invalidPassword);

  })

  test('Verify the visibility of all elements present in Signin page', async ({ loginPage }) => {

    await loginPage.elementVisibility();

  })

  test('Verify the functionality of "signup" link text under signin page', async ({ loginPage }) => {
    
    await loginPage.functionalityOfSignupLinktext(data.signupURL);
  
  })

  test('Verify the functionality of "forgot password" link text under signin page', async ({ loginPage }) => {

    await loginPage.functionalityOfForgoPasswordLinktext(data.forgotPasswordURL);

  })


  test('Verify the functionality of Forgot password button', async ({ loginPage }) => {
    
    await loginPage.submitForgotPassword(data.email); 

  });

  test('Verify the validation message for empty email input field', async ({ loginPage }) => {
    await loginPage.verifyValidationMessageForEmptyEmailInputField();
  })

  test('Verify the validation message for invalid email input field', async ({ loginPage }) => {
    await loginPage.verifyValidationMessageForInvalidEmailInputField();
  })

  test('Verify the validation message for empty password input field', async ({ loginPage }) => {
    await loginPage.verifyValidationMessageForEmptyPasswordInputField();
  })

  test('Verify the sign in button is disabled when email and password input fields are empty', async ({ loginPage }) => {
    await loginPage.verifySignInButtonIsDisabledWhenEmailAndPasswordInputFieldsAreEmpty();
  })

  test(`verify the functionality of the eye icon w.r.t Password field`, async ({ loginPage }) => {
    await loginPage.verifyFunctionalityOfTheEyeIconWRTPasswordField();
  })

  test('Verify user is able to logout from the application', async ({ loginPage }) => {
    await loginPage.loginWithValidCredential(data.email, data.password);
    await loginPage.verifyUserIsAbleToLogoutFromTheApplication();
  })

})