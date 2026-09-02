import { test, expect } from '../../support/Fixture/testFixture';
import apiTestData from '../../support/TestData/apiTestData.json' with { type: 'json' };

test.describe('API Team Invitation', () => {

    test('Create a new team invitation', async ({ authApi }) => {

        const response = await authApi.inviteTeamMember();

        expect(response.status()).toBe(apiTestData.success.statusCode);
        expect(response.statusText()).toBe(apiTestData.success.statusText);

        const responseBody = await response.json();

        expect(responseBody).toBeTruthy();
        expect(responseBody.id).toBeTruthy();
        expect(responseBody.invited_by).toBeTruthy();
        expect(responseBody.invited_by.id).toBeTruthy();
        expect(responseBody.invited_by.email).toBe(process.env.USERNAME);
        expect(responseBody.was_recently_created).toBe(apiTestData.teamInvitation.wasRecentlyCreated);

    })


    test('Delete team invitation', async ({ authApi }) => {

        const createResponse = await authApi.inviteTeamMember();
        expect(createResponse.status()).toBe(apiTestData.success.statusCode);
        const createdUser = await createResponse.json();

        const invitationsResponse = await authApi.getInvitations();

        expect(invitationsResponse.status()).toBe(apiTestData.success.statusCode);
        const invitationsBody = await invitationsResponse.json();

        const invitation = invitationsBody.data.find(
            item => item.user_id === createdUser.id
        );

        expect(invitation).toBeTruthy();
        const invitationId = invitation.id;

        const deleteResponse =
            await authApi.deleteInvitation(invitationId);

        expect(deleteResponse.status()).toBe(apiTestData.success.statusCode);
        expect(deleteResponse.statusText()).toBe(apiTestData.success.statusText);

        const deleteResponseBody =
            await deleteResponse.json();

        expect(deleteResponseBody.id).toBe(invitationId);
        expect(deleteResponseBody.user_id).toBe(createdUser.id);
        expect(deleteResponseBody.archived).toBe(apiTestData.teamInvitation.archived);
        expect(deleteResponseBody.status).toBe(apiTestData.teamInvitation.status);
    });


    test('Resend team invitation', async ({ authApi }) => {

        const createResponse = await authApi.inviteTeamMember();

        expect(createResponse.status()).toBe(apiTestData.success.statusCode);

        const createResponseBody = await createResponse.json();
        const email = createResponseBody.email;
        const resendResponse = await authApi.resendInvitation(email);

        expect(resendResponse.status()).toBe(apiTestData.success.statusCode);
        expect(resendResponse.statusText()).toBe(apiTestData.success.statusText);

        const resendResponseBody = await resendResponse.json();

        expect(resendResponseBody.id).toBeTruthy();
        expect(resendResponseBody.email).toBe(email);
        expect(resendResponseBody.invited_by).toBeTruthy();
        expect(resendResponseBody.invited_by.id).toBe(apiTestData.teamInvitation.invitedById);
    });

});
