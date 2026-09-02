import { test, expect } from "../../support/Fixture/testFixture";
import apiTestData from "../../support/TestData/apiTestData.json" with { type: "json" };

test.describe('API Profile', () => {
    
    test('Update user first name and last name', async ({ authApi }) => {

        const userId = 952;
        const firstName = 'Test';
        const lastName = 'Automation';
    
        const response = await authApi.updateUser(
            userId,
            firstName,
            lastName
        );
    
        expect(response.status()).toBe(200);
        expect(response.statusText()).toBe('OK');
    
        const responseBody = await response.json();
    
        console.log('Update user response:', responseBody);
    
        expect(responseBody).toHaveProperty('id', userId);
        expect(responseBody.first_name).toBe(firstName);
        expect(responseBody.last_name).toBe(lastName);
    });

    test('Update password with invalid current password', async ({ authApi }) => {

        const response = await authApi.updatePassword(
            'WrongPassword@123',
            'Admin@123',
            'Admin@123'
        );
    
        expect(response.status()).toBe(422);
    
        const responseBody = await response.json();
    
        expect(responseBody).toHaveProperty('errors');
    
        expect(responseBody.errors).toContain(
            'Invalid current password'
        );
    });

    test('Update password with mismatched password confirmation', async ({ authApi }) => {

        const response = await authApi.updatePassword(
            process.env.PASSWORD,
            'NewPassword@123',
            'DifferentPassword@123'
        );
    
        expect(response.status()).toBe(422);
    
        const responseBody = await response.json();
    
        expect(responseBody).toHaveProperty('errors');
    
        expect(responseBody.errors).toContain(
            'password confirmation did not match'
        );
    });

    test('Update password with short password', async ({ authApi }) => {

        const response = await authApi.updatePassword(
            process.env.PASSWORD,
            '123',
            '123'
        );
    
        expect(response.status()).toBe(422);
    
        const responseBody = await response.json();
    
        expect(responseBody).toHaveProperty('errors');
    
        expect(responseBody.errors).toContain(
            'password is too short'
        );
    });

    test('Update user profile without payload', async ({ authApi }) => {

        const response = await authApi.updateUser(
            process.env.USER_ID,
            '',
            ''
        );

        expect(response.status()).toBe(422);

        const responseBody = await response.json();
        console.log('Update user profile without payload response:', responseBody);

        expect(responseBody).toHaveProperty('errors');

        expect(responseBody.errors).toContain(
            'First name can\'t be blank'
        );
    });

    test('Get importer style preferences', async ({ authApi }) => {
        const organizationId = 1008;

        const response = await authApi.getImporterStylePreferences(organizationId);
    
        expect(response.status()).toBe(200);
        expect(response.statusText()).toBe('OK');
    
        const responseBody = await response.json();
    
        console.log(
            'Importer style preferences:',
            responseBody
        );
        expect(responseBody).toHaveProperty('id');
        expect(responseBody).toHaveProperty('primary_color');
        expect(responseBody).toHaveProperty('secondary_color');
        expect(responseBody).toHaveProperty('highlight1');
        expect(responseBody).toHaveProperty('highlight2');
        expect(responseBody).toHaveProperty('background');
    })
  
})