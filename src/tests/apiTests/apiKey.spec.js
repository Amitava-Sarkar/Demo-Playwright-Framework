import { test, expect } from "../../support/Fixture/testFixture";

test.describe('API Key', () => {

    test('Create API Key', async ({ authApi }) => {
        const response = await authApi.apiKeyCreation();

        expect(response.status()).toBe(200);
        expect(response.statusText()).toBe('OK');

        const responseBody = await response.json();
        console.log(responseBody);

        expect(responseBody.token).toBeTruthy();
        expect(typeof responseBody.token).toBe('string');

        expect(responseBody.token).toMatch(
            /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
    });

    test('Delete API Key', async ({ authApi }) => {
        const createResponse = await authApi.apiKeyCreation();

        expect(createResponse.status()).toBe(200);

        const createBody = await createResponse.json();
        const getResponse = await authApi.getApiCredentials();

        expect(getResponse.status()).toBe(200);

        const getBody = await getResponse.json();

        expect(getBody.data.length).toBeGreaterThan(0);

        const apiKey = getBody.data.find(
            credential => credential.token.endsWith(createBody.token.slice(-4))
        );

        expect(apiKey).toBeTruthy();

        const apiKeyId = apiKey.id;
        const deleteResponse = await authApi.deleteApiKey(apiKeyId);

        expect(deleteResponse.status()).toBe(204);

        const verifyResponse = await authApi.getApiCredentials();

        expect(verifyResponse.status()).toBe(200);

        const verifyBody = await verifyResponse.json();

        expect(verifyBody.data.some(credential => credential.id === apiKeyId)).toBeFalsy();

    });


})