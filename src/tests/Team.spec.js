import { test } from '../support/Fixture/testFixture';
import teamData from '../support/TestData/team.json' with { type: 'json' };

test.describe('Team Feature', () => {

  test.beforeEach('Verify that user is able to navigate to team page', async ({ team }) => {

    await team.navigateToTeamPage();

  });

  test('Verify the Visibility of all elements present in Team page', async ({ team }) => {

    await team.elementVisibilityOfTeamPage()

  });

  test('Verify that user is able to invite a member', async ({ team }) => {

    await team.verifyMemberInvitation(teamData.email)
    await team.memberInvitationDeletion()

  });

  test('verify user is able remove a member invitation from the team', async ({ team }) => {

    await team.verifyMemberInvitation(teamData.email)
    await team.memberInvitationDeletion()

  });

  test('Verify that invited user status is "Pending"', async ({ team }) => {

    await team.verifyMemberInvitation(teamData.email)
    await team.verifyInvitedUserStatusIsPending()
    await team.memberInvitationDeletion()

  })

  test('Verify that user is able to resend an invitation', async ({ team }) => {

    await team.verifyMemberInvitation(teamData.email)
    await team.performingResendingInvitation()
    await team.memberInvitationDeletion()

  })

  test('Verify cancel button and cross icon functionality wrt invite pop up', async ({ team }) => {

    await team.cancelButtonAndCrossIconFunctionality()

  })

  test('Verify the error message when email is not valid', async ({ team }) => {

    await team.verifyErrorMessageWhenEmailIsNotValid()

  })

  test('Verify the error message for empty email input field', async ({ team }) => {

    await team.verifyErrorMessageForEmptyEmailInputField()

  })

})