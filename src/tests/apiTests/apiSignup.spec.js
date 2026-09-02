import { test, expect } from '../../support/Fixture/testFixture.js';
import apiTestData from '../../support/TestData/apiTestData.json' with { type: 'json' };

test.describe('Signup API', () => {

    test('User should sign up successfully with valid credentials', async ({ authApi }) => {

        const response = await authApi.signup();
        expect(response.status()).toBe(apiTestData.success.statusCode);
        expect(response.statusText()).toBe(apiTestData.success.statusText);
        const responseBody = await response.json();
        expect(responseBody.id).toEqual(expect.any(Number));
        expect(responseBody.first_name).toBe(apiTestData.signup.firstName);
        expect(responseBody.last_name).toBe(apiTestData.signup.lastName);
        expect(responseBody.email).toContain(apiTestData.signup.emailContains);

        expect(responseBody.created_at).toBeTruthy();
        expect(responseBody.updated_at).toBeTruthy();

        expect(responseBody.onboarding_create_a_template_step).toBe(apiTestData.signup.onboardingCreateTemplateStep);
        expect(responseBody.onboarding_try_it_out_step).toBe(apiTestData.signup.onboardingTryItOutStep);
        expect(responseBody.onboarding_customize_import_step).toBe(apiTestData.signup.onboardingCustomizeImportStep);

        expect(responseBody).not.toHaveProperty('password');
    });

    test('User try to create account without company', async ({ authApi }) => {

        const response = await authApi.signup({
            company_name: undefined
        });

        expect(response.status()).toBe(apiTestData.errorWithoutPayload.statusCode);
        expect(response.statusText()).toBe(apiTestData.errorWithoutPayload.error);
        expect(response.headers()['content-type']).toContain(apiTestData.errorWithoutPayload.contentType);

        const responseBody = await response.text();

        expect(responseBody).toContain(apiTestData.errorWithoutPayload.htmlDoctype);
    });

    test('User try to signup with existing email', async ({ authApi }) => {

        const { email, statusCode, statusText, contentType, message } = apiTestData.existingEmail;
        const response = await authApi.signup({ email });

        expect(response.ok()).toBeFalsy();
        expect(response.status()).toBe(statusCode);
        expect(response.statusText()).toBe(statusText);
        expect(response.headers()['content-type']).toContain(contentType);

        const responseBody = await response.json();

        expect(responseBody.message).toBe(message);
    });

    test('Verify response message when user enters password which does not satisfy password validation', async ({ authApi }) => {

        const { password, statusCode, statusText, messages } = apiTestData.weakPassword;
        const response = await authApi.signup({ password });

        expect(response.ok()).toBeFalsy();
        expect(response.status()).toBe(statusCode);
        expect(response.statusText()).toBe(statusText);

        const responseBody = await response.json();

        for (const message of messages) {
            expect(responseBody.message).toContain(message);
        }
    });

    test('Verify response when user enters invalid email', async ({ authApi }) => {

        const response = await authApi.signup({
            email: apiTestData.signupInvalidEmail.email
        });

        expect(response.ok()).toBeFalsy();

        expect(response.status()).toBe(apiTestData.errorWithoutPayload.statusCode);
        expect(response.statusText()).toBe(apiTestData.errorWithoutPayload.error);
        expect(response.headers()['content-type']).toContain(apiTestData.errorWithoutPayload.contentType);

        const responseBody = await response.text();

        expect(responseBody).toContain(apiTestData.errorWithoutPayload.htmlDoctype);
    });

    test('Verify response of resend email', async ({ authApi }) => {
        const response = await authApi.resendEmail();
        expect(response.status()).toBe(apiTestData.success.statusCode);
        expect(response.statusText()).toBe(apiTestData.success.statusText);
        expect(response.headers()['content-type']).toContain(apiTestData.resendEmail.contentType);

        const responseBody = await response.json();
        expect(responseBody.message).toBe(apiTestData.resendEmail.message);
    })
})
