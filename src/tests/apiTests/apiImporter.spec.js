import { test, expect } from "../../support/Fixture/testFixture";
import apiTestData from "../../support/TestData/apiTestData.json" with { type: "json" };

test.describe('API Importer', () => {

    test('Create API Importer', async ({ authApi }) => {
        const response = await authApi.createImporter();
        expect(response.status()).toBe(apiTestData.success.statusCode);
        expect(response.statusText()).toBe(apiTestData.success.statusText);
        console.log(response)

        const responseBody = await response.json();
        console.log(responseBody);

        expect(responseBody.slug).toBeTruthy();
        expect(responseBody.name).toBe(apiTestData.importer.name);
        expect(responseBody.created_at).toBeTruthy();

    });

    test('Edit API Importer', async ({ authApi }) => {

        const createResponse = await authApi.createImporter();
        expect(createResponse.status()).toBe(apiTestData.success.statusCode);
        expect(createResponse.statusText()).toBe(apiTestData.success.statusText);

        const createResponseBody = await createResponse.json();

        const slug = createResponseBody.slug;

        console.log('Created Importer Slug:', slug);

        const editResponse = await authApi.editImporter(slug);
        expect(editResponse.status()).toBe(apiTestData.success.statusCode);
        expect(editResponse.statusText()).toBe(apiTestData.success.statusText);

        const editResponseBody = await editResponse.json();

        console.log('Edit Importer Response:', editResponseBody);

        expect(editResponseBody.slug).toBe(slug);
        expect(editResponseBody.name).toBe(apiTestData.importer.editedName);
        expect(editResponseBody.archived).toBe(apiTestData.importer.archived);

    });

    test('Delete API Importer', async ({ authApi }) => {

        const createResponse = await authApi.createImporter();

        expect(createResponse.status()).toBe(apiTestData.success.statusCode);
        expect(createResponse.statusText()).toBe(apiTestData.success.statusText);

        const createResponseBody = await createResponse.json();

        const slug = createResponseBody.slug;

        console.log('Created Importer Slug:', slug);

        const deleteResponse = await authApi.deleteImporter(slug);

        expect(deleteResponse.status()).toBe(apiTestData.success.statusCode);
        expect(deleteResponse.statusText()).toBe(apiTestData.success.statusText);

        const deleteResponseBody = await deleteResponse.json();

        console.log('Delete Importer Response:', deleteResponseBody);

        expect(deleteResponseBody.slug).toBe(slug);
        expect(deleteResponseBody.archived).toBe(apiTestData.importer.deletedArchived);
    });

    test('Add column to API Importer', async ({ authApi }) => {

        const createResponse = await authApi.createImporter();
        expect(createResponse.status()).toBe(apiTestData.success.statusCode);
        expect(createResponse.statusText()).toBe(apiTestData.success.statusText);

        const createResponseBody = await createResponse.json();
        const slug = createResponseBody.slug;

        console.log('Created Importer Slug:', slug);
        const columnResponse = await authApi.addColumn(slug);
        expect(columnResponse.status()).toBe(apiTestData.success.statusCode);
        expect(columnResponse.statusText()).toBe(apiTestData.success.statusText);

        const columnResponseBody = await columnResponse.json();
        console.log('Created Column:', columnResponseBody);

        expect(columnResponseBody.column_type).toBe(apiTestData.importer.stringColumn.column_type);
        expect(columnResponseBody.label).toBe(apiTestData.importer.stringColumn.label);
        expect(columnResponseBody.internal_key).toBe(apiTestData.importer.stringColumn.internal_key);
        expect(columnResponseBody.description).toBe(apiTestData.importer.stringColumn.description);
        expect(columnResponseBody.required).toBe(apiTestData.importer.stringColumn.required);
        expect(columnResponseBody.unique).toBe(apiTestData.importer.stringColumn.unique);
        expect(columnResponseBody.archived).toBe(apiTestData.importer.stringColumn.archived);
    });

    test('Edit column to API Importer', async ({ authApi }) => {
        const createResponse = await authApi.createImporter();
        expect(createResponse.status()).toBe(apiTestData.success.statusCode);
        expect(createResponse.statusText()).toBe(apiTestData.success.statusText);

        const createResponseBody = await createResponse.json();
        const slug = createResponseBody.slug;

        console.log('Created Importer Slug:', slug);
        const columnResponse = await authApi.addColumn(slug);
        expect(columnResponse.status()).toBe(apiTestData.success.statusCode);
        expect(columnResponse.statusText()).toBe(apiTestData.success.statusText);

        const columnResponseBody = await columnResponse.json();
        console.log('Created Column:', columnResponseBody);

        expect(columnResponseBody.column_type).toBe(apiTestData.importer.stringColumn.column_type);
        expect(columnResponseBody.label).toBe(apiTestData.importer.stringColumn.label);
        expect(columnResponseBody.internal_key).toBe(apiTestData.importer.stringColumn.internal_key);

        const editColumnResponse = await authApi.editColumn(slug, columnResponseBody.id);
        expect(editColumnResponse.status()).toBe(apiTestData.success.statusCode);
        expect(editColumnResponse.statusText()).toBe(apiTestData.success.statusText);

        const editResponseBody = await editColumnResponse.json();

        console.log('Edit Column Response:', editResponseBody);

        const { integerColumnPayload } = apiTestData.importer;

        expect(editResponseBody.id).toBe(columnResponseBody.id);
        expect(editResponseBody.column_type).toBe(integerColumnPayload.column_type);
        expect(editResponseBody.internal_key).toBe(integerColumnPayload.internal_key);
        expect(editResponseBody.label).toBe(integerColumnPayload.label);
        expect(editResponseBody.required).toBe(integerColumnPayload.required);
        expect(editResponseBody.unique).toBe(integerColumnPayload.unique);
        expect(editResponseBody.archived).toBe(apiTestData.importer.archived);

        expect(editResponseBody.validations).toEqual(
            expect.arrayContaining([
                expect.objectContaining(integerColumnPayload.validations[0])
            ])
        );
    })

    test('Delete column from API Importer', async ({ authApi }) => {
        const createResponse = await authApi.createImporter();
        expect(createResponse.status()).toBe(apiTestData.success.statusCode);
        expect(createResponse.statusText()).toBe(apiTestData.success.statusText);

        const createResponseBody = await createResponse.json();
        const slug = createResponseBody.slug;

        console.log('Created Importer Slug:', slug);
        const columnResponse = await authApi.addColumn(slug);
        expect(columnResponse.status()).toBe(apiTestData.success.statusCode);
        expect(columnResponse.statusText()).toBe(apiTestData.success.statusText);

        const columnResponseBody = await columnResponse.json();
        console.log('Created Column:', columnResponseBody);

        expect(columnResponseBody.column_type).toBe(apiTestData.importer.stringColumn.column_type);
        expect(columnResponseBody.label).toBe(apiTestData.importer.stringColumn.label);
        expect(columnResponseBody.internal_key).toBe(apiTestData.importer.stringColumn.internal_key);

        const deleteColumnResponse = await authApi.deleteColumn(slug, columnResponseBody.id);
        expect(deleteColumnResponse.status()).toBe(apiTestData.success.statusCode);
        expect(deleteColumnResponse.statusText()).toBe(apiTestData.success.statusText);

        const deleteColumnResponseBody = await deleteColumnResponse.json();
        console.log('Deleted Column:', deleteColumnResponseBody);

        expect(deleteColumnResponseBody.id).toBe(columnResponseBody.id);
        expect(deleteColumnResponseBody.archived).toBe(apiTestData.importer.deletedArchived);
        expect(deleteColumnResponseBody.column_type).toBe(apiTestData.importer.stringColumn.column_type);
        expect(deleteColumnResponseBody.label).toBe(apiTestData.importer.stringColumn.label);
        expect(deleteColumnResponseBody.internal_key).toBe(apiTestData.importer.stringColumn.internal_key);
    })

    test('Creating multiple columns to API Importer', async ({ authApi }) => {
        const createResponse = await authApi.createImporter();
        expect(createResponse.status()).toBe(apiTestData.success.statusCode);
        expect(createResponse.statusText()).toBe(apiTestData.success.statusText);

        const createResponseBody = await createResponse.json();
        const slug = createResponseBody.slug;

        console.log('Created Importer Slug:', slug);
        const columnResponse1 = await authApi.addColumn(slug);
        expect(columnResponse1.status()).toBe(apiTestData.success.statusCode);
        expect(columnResponse1.statusText()).toBe(apiTestData.success.statusText);

        const columnResponse1Body = await columnResponse1.json();
        console.log('Created Column:', columnResponse1Body);

        expect(columnResponse1Body.column_type).toBe(apiTestData.importer.stringColumn.column_type);
        expect(columnResponse1Body.label).toBe(apiTestData.importer.stringColumn.label);
        expect(columnResponse1Body.internal_key).toBe(apiTestData.importer.stringColumn.internal_key);

        const { integerColumnPayload, booleanColumnPayload } = apiTestData.importer;

        const columnResponse2 = await authApi.addColumn(slug, integerColumnPayload);
        expect(columnResponse2.status()).toBe(apiTestData.success.statusCode);
        expect(columnResponse2.statusText()).toBe(apiTestData.success.statusText);

        const columnResponse2Body = await columnResponse2.json();
        console.log('Created Column:', columnResponse2Body);

        expect(columnResponse2Body.column_type).toBe(integerColumnPayload.column_type);
        expect(columnResponse2Body.label).toBe(integerColumnPayload.label);
        expect(columnResponse2Body.internal_key).toBe(integerColumnPayload.internal_key);
        expect(columnResponse2Body.validations).toEqual(
            expect.arrayContaining([
                expect.objectContaining(integerColumnPayload.validations[0])
            ])
        );

        const columnResponse3 = await authApi.addColumn(slug, booleanColumnPayload);
        expect(columnResponse3.status()).toBe(apiTestData.success.statusCode);
        expect(columnResponse3.statusText()).toBe(apiTestData.success.statusText);

        const columnResponse3Body = await columnResponse3.json();
        console.log('Created Column:', columnResponse3Body);

        expect(columnResponse3Body.column_type).toBe(booleanColumnPayload.column_type);
        expect(columnResponse3Body.label).toBe(booleanColumnPayload.label);
        expect(columnResponse3Body.internal_key).toBe(booleanColumnPayload.internal_key);
        expect(columnResponse3Body.validations).toEqual(
            expect.arrayContaining([
                expect.objectContaining(booleanColumnPayload.validations[0])
            ])
        );
    })

    test('Reorder API Importer Column', async ({ authApi }) => {

        const createResponse = await authApi.createImporter();
        expect(createResponse.status()).toBe(apiTestData.success.statusCode);
        expect(createResponse.statusText()).toBe(apiTestData.success.statusText);

        const createResponseBody = await createResponse.json();
        const slug = createResponseBody.slug;
        const { stringColumnPayload, integerColumnPayload, booleanColumnPayload, reorderPosition } = apiTestData.importer;
        const firstColumnResponse = await authApi.addColumn(slug, stringColumnPayload);
        expect(firstColumnResponse.status()).toBe(apiTestData.success.statusCode);

        const firstColumn = await firstColumnResponse.json();
        const secondColumnResponse = await authApi.addColumn(slug, integerColumnPayload);
        expect(secondColumnResponse.status()).toBe(apiTestData.success.statusCode);
      
        const secondColumn = await secondColumnResponse.json();
        const thirdColumnResponse = await authApi.addColumn(slug, booleanColumnPayload);
        expect(thirdColumnResponse.status()).toBe(apiTestData.success.statusCode);
      
        const thirdColumn = await thirdColumnResponse.json();
        const reorderResponse = await authApi.reorderColumn(
          slug,
          thirdColumn.id,
          reorderPosition
        );
      
        expect(reorderResponse.status()).toBe(apiTestData.success.statusCode);
        expect(reorderResponse.statusText()).toBe(apiTestData.success.statusText);
        const reorderResponseBody = await reorderResponse.json();
        expect(reorderResponseBody.id).toBe(thirdColumn.id);
        expect(reorderResponseBody.position).toBe(reorderPosition);
    });

    test('cerate importer without payload', async ({ authApi }) => {
        const { statusCode, statusText, nameBlankError } = apiTestData.importer.unprocessable;
        const response = await authApi.createImporterWithoutPayload();
        expect(response.status()).toBe(statusCode);
        expect(response.statusText()).toBe(statusText);

        const responseBody = await response.json();
        expect(responseBody.errors).toBeTruthy();
        expect(responseBody.errors).toBe(nameBlankError);
    })

    test('add column to importer without payload', async ({ authApi }) => {
        const { statusCode, statusText, columnTypeNotInList, requiredNotInList, labelBlank, internalKeyBlank1 } = apiTestData.importer.unprocessable;

        const createResponse = await authApi.createImporter();
        expect(createResponse.status()).toBe(apiTestData.success.statusCode);
        expect(createResponse.statusText()).toBe(apiTestData.success.statusText);

        const createResponseBody = await createResponse.json();
        const slug = createResponseBody.slug;

        const columnResponse = await authApi.addColumnWithoutPayload(slug);
        expect(columnResponse.status()).toBe(statusCode);
        expect(columnResponse.statusText()).toBe(statusText);

        const columnResponseBody = await columnResponse.json();
        expect(columnResponseBody.errors).toBeTruthy();
        expect(columnResponseBody.errors).toContain(columnTypeNotInList);
        expect(columnResponseBody.errors).toContain(requiredNotInList);
        expect(columnResponseBody.errors).toContain(labelBlank);
        expect(columnResponseBody.errors).toContain(internalKeyBlank1);
    })

    test('add column to importer without column type in payload', async ({ authApi }) => {
        const { statusCode, statusText, columnTypeNotInList, nullColumnTypePayload } = apiTestData.importer.unprocessable;

        const createResponse = await authApi.createImporter();
        expect(createResponse.status()).toBe(apiTestData.success.statusCode);
        expect(createResponse.statusText()).toBe(apiTestData.success.statusText);

        const createResponseBody = await createResponse.json();
        const slug = createResponseBody.slug;

        const columnResponse = await authApi.addColumn(slug, nullColumnTypePayload);
        expect(columnResponse.status()).toBe(statusCode);
        expect(columnResponse.statusText()).toBe(statusText);

        const columnResponseBody = await columnResponse.json();
        expect(columnResponseBody.errors).toBeTruthy();
        expect(columnResponseBody.errors).toContain(columnTypeNotInList);
    })

    test('add column to importer without label in payload', async ({ authApi }) => {
        const { statusCode, statusText, labelBlank, nullLabelPayload } = apiTestData.importer.unprocessable;

        const createResponse = await authApi.createImporter();
        expect(createResponse.status()).toBe(apiTestData.success.statusCode);
        expect(createResponse.statusText()).toBe(apiTestData.success.statusText);

        const createResponseBody = await createResponse.json();
        const slug = createResponseBody.slug;

        const columnResponse = await authApi.addColumn(slug, nullLabelPayload);
        expect(columnResponse.status()).toBe(statusCode);
        expect(columnResponse.statusText()).toBe(statusText);

        const columnResponseBody = await columnResponse.json();
        expect(columnResponseBody.errors).toBeTruthy();
        expect(columnResponseBody.errors).toContain(labelBlank);
    })

    test('add column to importer without internal key in payload', async ({ authApi }) => {
        const { statusCode, statusText, internalKeyBlank, nullInternalKeyPayload } = apiTestData.importer.unprocessable;

        const createResponse = await authApi.createImporter();
        expect(createResponse.status()).toBe(apiTestData.success.statusCode);
        expect(createResponse.statusText()).toBe(apiTestData.success.statusText);

        const createResponseBody = await createResponse.json();
        const slug = createResponseBody.slug;

        const columnResponse = await authApi.editColumn(slug, nullInternalKeyPayload);
        console.log(columnResponse);
        expect(columnResponse.status()).toBe(404);
        expect(columnResponse.statusText()).toBe('Not Found');

        const columnResponseBody = await columnResponse.json();
        console.log(columnResponseBody);
        expect(columnResponseBody.message).toBeTruthy();
        expect(columnResponseBody.message).toContain(internalKeyBlank);
    })

    test('add column to importer where validation message is missing', async ({ authApi }) => {
        const { statusCode, statusText, validationsInvalid } = apiTestData.importer.unprocessable;

        const createResponse = await authApi.createImporter();
        expect(createResponse.status()).toBe(apiTestData.success.statusCode);
        expect(createResponse.statusText()).toBe(apiTestData.success.statusText);

        const createResponseBody = await createResponse.json();
        const slug = createResponseBody.slug;

        const columnResponse = await authApi.addColumnWithoutValidationMessage(slug);
        expect(columnResponse.status()).toBe(statusCode);
        expect(columnResponse.statusText()).toBe(statusText);

        const columnResponseBody = await columnResponse.json();
        expect(columnResponseBody.errors).toBeTruthy();
        expect(columnResponseBody.errors).toContain(validationsInvalid);
    })

    test.skip('create importer via file uploading', async ({ authApi }) => {
        const response = await authApi.createImporterViaFileUploading();
        expect(response.status()).toBe(apiTestData.success.statusCode);
        expect(response.statusText()).toBe(apiTestData.success.statusText);

        const responseBody = await response.json();
        console.log(responseBody);
        expect(responseBody.slug).toBeTruthy();
        expect(responseBody.name).toBe(apiTestData.importer.name);
        expect(responseBody.created_at).toBeTruthy();
    })

});
