import { test } from '../support/Fixture/testFixture';
import loginData from '../support/TestData/LoginTestdata.json' with { type: 'json' };

test.describe('Branding Feature when user on standard / trial plan', () => {
    test.use({
        storageState: {cookies:[], origins : []}
      })    // Kept storageState at describe level for only this spec because this spec contains both Standard/Trial and Professional user scenarios.
            // Playwright config can target only test files/projects, not individual describe blocks.

    test.beforeEach('Verify that user is able to navigate to branding page', async ({ branding, loginPage }) => {
        await loginPage.navigateToLoginPage();
        await loginPage.loginwithstandardplanID('manpreet+12@swovo.com', 'Admin@123');
        await loginPage.verifyLoginSuccess(loginData.validationURL);
        await branding.navigateToBrandingPage();
    })

    test('Verify the visibility of all elements present in branding page when user on standard / trial plan', async ({ branding }) => {
        await branding.visibilityOfAllElementsInBrandingPage();

    })

    test('Verify the functionality of upgrade link on branding page when user on standard / trial plan', async ({ branding }) => {
        await branding.verifyFunctionalityOfUpgradeLink();
    })

    test('Verify upload image button is disable when user on standard plan/trial plan', async ({ branding }) => {
        await branding.verifyUploadImageButtonIsDisableWhenUserOnStandardPlanTrialPlan();
    })

    test('Verify Save button is disable when user on standard plan/trial plan', async ({ branding }) => {
        await branding.verifySaveButtonIsDisableWhenUserOnStandardPlanTrialPlan();
    })

    test('Verify functionality of revert to original button on branding page when user on standard / trial plan', async ({ branding }) => {
        await branding.verifyFunctionalityOfRevertToOriginalButton();
    })

    test('Verify the functionality of Background Color Options w.r.t Trial/Standard Plan', async ({ branding }) => {
        await branding.verifyFunctionalityOfBackgroundColorOptionsWRTTrialStandardPlan();
    })

    test('Verify the validation when try to change color style on standard / trial plan', async ({ branding }) => {
        await branding.verifyValidationWhenTryToChangeColorStyleOnStandardTrialPlan();
    })


})

test.describe('Branding Feature when user on Professional plan', () => {

    test.beforeEach('Verify that user is able to navigate to branding page', async ({ branding }) => {
       
        await branding.navigateToBrandingPage();
    })

    test('Verify that upload image button is enabled when user on Professional plan', async ({ branding }) => {
        await branding.verifyUploadImageButtonIsEnabledWhenUserOnProfessionalPlan();
    })

    test('Verify user is not able to upload image more than 1 MB', async ({ branding }) => {
        await branding.verifyUserIsNotAbleToUploadImageMoreThan1Mb();
    })

    test('Verify user is able to upload image less than 1 MB', async ({ branding }) => {
        await branding.verifyUserIsAbleToUploadImageLessThan1Mb();
    })

    test('Verify user is able to remove uploaded image', async ({ branding }) => {
        await branding.verifyUserIsAbleToRemoveUploadedImage();
    })
})