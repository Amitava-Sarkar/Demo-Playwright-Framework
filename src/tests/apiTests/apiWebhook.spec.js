import { test, expect } from '../../support/Fixture/testFixture';
import apiTestData from '../../support/TestData/apiTestData.json' with { type: 'json' };

test.describe.skip('API Webhook', () => { //Currently skipping this tests due to Bug 

    test('Create a new webhook', async ({ authApi }) => {

        const response = await authApi.createWebhook();
        console.log(response);

        expect(response.status()).toBe(apiTestData.success.statusCode);
        expect(response.statusText()).toBe(apiTestData.success.statusText);

        const responseBody = await response.json();
        console.log(responseBody);
        expect(responseBody.id).toBeTruthy();
        expect(responseBody.name).toBe(apiTestData.webhook.name);
        expect(responseBody.url).toBe(apiTestData.webhook.url);
        expect(responseBody.template_id).toBe(apiTestData.webhook.templateId);
        expect(responseBody.archived).toBe(apiTestData.webhook.archived);
        expect(responseBody.rate_limit).toBe(apiTestData.webhook.rateLimit);
        expect(responseBody.secret_token).toBe(apiTestData.webhook.secretTokenMasked);
        expect(responseBody.template_name).toBe(apiTestData.webhook.templateName);
        expect(responseBody.webhook_type).toBe(apiTestData.webhook.webhookType);
    });

    test('Delete webhook', async ({ authApi }) => {

        const createResponse = await authApi.createWebhook();

        expect(createResponse.status()).toBe(apiTestData.success.statusCode);
        expect(createResponse.statusText()).toBe(apiTestData.success.statusText);

        const createResponseBody = await createResponse.json();
        const webhookId = createResponseBody.id;

        expect(webhookId).toBeTruthy();

        const archiveResponse = await authApi.deleteWebhook(webhookId);

        expect(archiveResponse.status()).toBe(apiTestData.success.statusCode);
        expect(archiveResponse.statusText()).toBe(apiTestData.success.statusText);

        const archiveResponseBody = await archiveResponse.json();

        expect(archiveResponseBody.id).toBe(webhookId);
        expect(archiveResponseBody.name).toBe(apiTestData.webhook.name);
        expect(archiveResponseBody.archived).toBe(apiTestData.webhook.deleted.archived);
        expect(archiveResponseBody.template_id).toBe(apiTestData.webhook.deleted.templateId);
        expect(archiveResponseBody.rate_limit).toBe(apiTestData.webhook.rateLimit);
        expect(archiveResponseBody.webhook_type).toBe(apiTestData.webhook.webhookType);
        expect(archiveResponseBody.url).toBe(apiTestData.webhook.url);
        expect(archiveResponseBody.secret_token).toBe(apiTestData.webhook.secretTokenMasked);
    });
});
