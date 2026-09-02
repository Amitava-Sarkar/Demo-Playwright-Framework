import { test, expect } from "../../support/Fixture/testFixture";

test.describe('File Import', () => {

    test('Get all templates', async ({ authApi }) => {

        const response = await authApi.getAllTemplates();

        expect(response.status()).toBe(200);
        expect(response.statusText()).toBe('OK');

        const responseBody = await response.json();

        console.log('Templates:', responseBody);

        expect(Array.isArray(responseBody)).toBeTruthy();

        const template = responseBody.find(
            template => template.name === 'Unmatch_Column'
        );
        expect(template).toBeDefined();
        console.log('Template ID:', template.id);
        console.log('Template Slug:', template.slug);
    });

    test('Create importer webapp session', async ({ authApi }) => {

        const templatesResponse = await authApi.getAllTemplates();
        expect(templatesResponse.status()).toBe(200);
        const templates = await templatesResponse.json();
        const importer = templates.find(
            template => template.name === 'xyzPractice'
        );

        expect(importer).toBeDefined();
        const response = await authApi.createWebappSession(
            importer.slug
        );

        expect(response.status()).toBe(201);
        expect(response.statusText()).toBe('Created');

        const responseBody = await response.json();

        expect(responseBody.token).toBeTruthy();
    });

    test('File import column mappings', async ({ authApi }) => { 

        const templatesResponse = await authApi.getAllTemplates();
        expect(templatesResponse.status()).toBe(200);

        const templates = await templatesResponse.json();
        const importer = templates.find( 
            template => template.name === 'xyzPractice'
        );

        expect(importer).toBeDefined();

        console.log('Importer ID:', importer.id);
        console.log('Importer Slug:', importer.slug);

        const fileHeaders = [
            'string',
            'integer',
            'boolean',
            'float',
            'email',
            'dropdown',
            'url',
            'date',
            'datetime',
            'time'
        ];
        const response =
            await authApi.createColumnMappings(
                importer.slug,
                fileHeaders
            );

        expect(response.status()).toBe(200);
        expect(response.statusText()).toBe('OK');

        const responseBody =
            await response.json();

        console.log(
            'Column mappings response:',
            responseBody
        );

        expect(responseBody).toHaveProperty('mappings');
        expect(responseBody.mappings).toBeDefined();
        expect(responseBody.mappings.String.matched_headers)
            .toContain('string');

        expect(responseBody.mappings.Integer.matched_headers)
            .toContain('integer');

        expect(responseBody.mappings.Boolean.matched_headers)
            .toContain('boolean');

        expect(responseBody.mappings.Float.matched_headers)
            .toContain('float');

        expect(responseBody.mappings.Email.matched_headers)
            .toContain('email');

        expect(responseBody.mappings.Dropdown.matched_headers)
            .toContain('dropdown');

        expect(responseBody.mappings.Url.matched_headers)
            .toContain('url');

        expect(responseBody.mappings.Date.matched_headers)
            .toContain('date');

        expect(responseBody.mappings.Datetime.matched_headers)
            .toContain('datetime');

        expect(responseBody.mappings.Time.matched_headers)
            .toContain('time');
    });

    test('File import value mappings', async ({ authApi }) => {

        const templatesResponse = await authApi.getAllTemplates();
    
        expect(templatesResponse.status()).toBe(200);
    
        const templates = await templatesResponse.json();
    
        const importer = templates.find(
            template => template.name === 'xyzPractice'
        );
    
        expect(importer).toBeDefined();
    
        console.log('Importer ID:', importer.id);
        console.log('Importer Slug:', importer.slug);
    
        const fileValues = {
            Dropdown: ['FIRST', 'THIRD', 'SECOND']
        };
    
        const response = await authApi.createValueMappings(
            importer.slug,
            fileValues
        );
    
        expect(response.status()).toBe(200);
        expect(response.statusText()).toBe('OK');
    
        const responseBody = await response.json();
    
        console.log('Value mappings response:', responseBody);
    
        expect(responseBody).toHaveProperty('mappings');
        expect(responseBody.mappings).toHaveProperty('Dropdown');
    
        expect(responseBody.mappings.Dropdown).toEqual({
            FIRST: 'FIRST',
            THIRD: 'THIRD',
            SECOND: 'SECOND'
        });
    });
})