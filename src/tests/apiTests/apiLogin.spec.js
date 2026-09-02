import { error } from 'node:console';
import { test, expect } from '../../support/Fixture/testFixture.js';
import apiTestData from '../../support/TestData/apiTestData.json' with { type: 'json' };


test.describe('Login API', () => {

    test('should login successfully with valid credentials', async ({ authApi }) => {

        const response = await authApi.login(process.env.USERNAME, process.env.PASSWORD);
        
        expect(response.status()).toBe(apiTestData.success.statusCode);
        expect(response.ok()).toBeTruthy();
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('id');
        expect(responseBody).toHaveProperty('email');
        expect(responseBody.email).toBe(process.env.USERNAME);
    });

    test('should reject sign in without payload', async ({ authApi }) => {

        const response = await authApi.loginWithoutPayload();
        expect(response.status()).toBe(apiTestData.errorWithoutPayload.statusCode);
        expect(response.statusText()).toBe(apiTestData.errorWithoutPayload.error);
        expect(response.ok()).toBeFalsy();
    });


    test('should reject login with wrong password', async ({ authApi }) => {

        const { email, password, statusCode } = apiTestData.wrongPassword;
        const response = await authApi.login(email, password);

        expect(response.status()).toBe(statusCode);
        expect(response.statusText()).toBe(apiTestData.unauthorized.message);
        expect(response.ok()).toBeFalsy();

        const jsonResponse = await response.json()
        expect(jsonResponse).toMatchObject({
            error: apiTestData.wrongPassword.error
        });
    });


    test('should reject login with wrong email', async ({ authApi }) => {

        const { email, password, statusCode } = apiTestData.wrongEmail;
        const response = await authApi.login(email, password);

        expect(response.status()).toBe(statusCode);
        expect(response.statusText()).toBe(apiTestData.unauthorized.message);
        expect(response.ok()).toBeFalsy();
    });


    test('should reject login with email which is not confirmed', async ({ authApi }) => {

        const { email, password, statusCode } = apiTestData.emailNotConfirmed;
        const response = await authApi.login(email, password);

        expect(response.status()).toBe(statusCode);
        expect(response.statusText()).toBe(apiTestData.unauthorized.message);
        expect(response.ok()).toBeFalsy();
    });


    test('should reject login with invalid email', async ({ authApi }) => {

        const { email, password, statusCode } = apiTestData.invalidEmail;
        const response = await authApi.login(email, password);

        expect(response.status()).toBe(statusCode);
        expect(response.statusText()).toBe(apiTestData.unauthorized.message);
        expect(response.ok()).toBeFalsy();
    });

});
