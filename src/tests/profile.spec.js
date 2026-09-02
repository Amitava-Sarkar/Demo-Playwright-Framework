import { test } from '../support/Fixture/testFixture';

test.describe('Profile Feature', () => {

    test.beforeEach('Verify that user is able to navigate to profile page', async ({ profile }) => {
        await profile.navigateToProfilePage();
    })

    test('Verify the visibility of all elements present in personal information section', async ({ profile }) => {
        await profile.visibilityOfPersonalInformationSection();
    })

    test('Verify save changes button is disabled without any changes', async ({ profile }) => {
        await profile.verifySaveChangesButtonIsDisabledWithoutAnyChanges()
    })

    test('Verify user is able to change their first name', async ({ profile }) => {
        await profile.verifyUserIsAbleToChangeTheirFirstName()
    })

    test('Verify user is able to change their last name', async ({ profile }) => {
        await profile.verifyUserIsAbleToChangeTheirLastName()
    })

    test('Verify required validation message in error state', async ({ profile }) => {
        await profile.verifyRequiredValidationMessageInErrorState()
    })

    test('Verify error message for empty old password input field', async ({ profile }) => {
        await profile.verifyErrorMessageForEmptyOldPasswordInputField()
    })

    test('Verify the error message when new password and confirm password do not match', async ({ profile }) => {
        await profile.verifyErrorMessageForPasswordMismatch()
    })

    test('Verify the error message when new password is the same as the old password', async ({ profile }) => {
        await profile.verifyErrorMessageForPasswordSameAsCurrent()
    })

    test('Verify the error message when new password is too short', async ({ profile }) => {
        await profile.verifyErrorMessageForPasswordTooShort()
    })

    test('Verify the error message when new password is too weak', async ({ profile }) => {
        await profile.verifyErrorMessageForPasswordTooWeak()
    })

    test('Verify the Functionality of checkout button', async ({ profile }) => {
        await profile.verifyFunctionalityOfCheckoutButton()
    })

}); 