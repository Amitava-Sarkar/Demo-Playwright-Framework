import { expect } from '../support/Fixture/testFixture';

export class Authentication {
  constructor(request) {
    this.request = request;
    this.loginEndpoint = '/users/sessions';
    this.signupEndpoint = '/users/registrations';
    this.resendEmailEndpoint = '/user_confirmation_emails';
    this.teamInvitationEndpoint = '/users/invitation';
    this.organizationInvitationEndpoint = '/api/v1/organizations/invitations';
    this.getInvitationsEndpoint = '/api/v1/organizations/invitations';
    this.webhookEndpoint = '/api/v1/organizations/webhooks';
    this.apiKeyEndpoint = '/api/v1/organizations/1008/api_credentials'
    this.importerEndpoint = '/api/v1/templates'
    this.allTemplatesEndpoint = '/api/v1/templates/all'
    this.webappSessionEndpoint = '/api/v1/importer/webapp_sessions'
    this.columnMappingsEndpoint = '/api/v1/importer/templates';
    this.userEndpoint = '/users';
    this.passwordEndpoint = '/users/password'
  }

  async login(email, password) {
    return this.request.post(this.loginEndpoint, {
      data: {
        user: {
          email,
          password,
        },
      },
    });
  }
  async loginWithoutPayload() {
    return this.request.post(this.loginEndpoint);
  }

  async signup(payload = {}) {
    const signupPayload = {
      company_name: 'APITesting',
      email: `manpreet+${Date.now()}@swovo.com`,
      first_name: 'API',
      last_name: 'Automation',
      password: 'Admin@123',
      ...payload
    };

    return this.request.post(this.signupEndpoint, {
      data: signupPayload
    });
  }

  async signupWithoutPayload() {
    return this.request.post(this.signupEndpoint);
  }

  async resendEmail(payload = {}) {
    const resendEmailPayload = {
      email: 'manpreet+12356@flatirons.com',
      ...payload
    };
    return this.request.post(this.resendEmailEndpoint, {
      data: resendEmailPayload
    });
  }

  async inviteTeamMember(payload = {}) {

    const loginResponse = await this.login(
      process.env.USERNAME,
      process.env.PASSWORD
    );

    expect(loginResponse.status()).toBe(200);

    const authorization =
      loginResponse.headers()['authorization'];

    const teamInvitationPayload = {
      email: `manpreet+${Date.now()}@swovo.com`,
      organization_id: '1008',
      ...payload
    };

    return this.request.post(this.teamInvitationEndpoint, {
      headers: {
        Authorization: authorization
      },
      data: teamInvitationPayload
    });
  }
  async getInvitations() {
    const loginResponse = await this.login(
      process.env.USERNAME,
      process.env.PASSWORD
    );

    expect(loginResponse.status()).toBe(200);

    const authorization =
      loginResponse.headers()['authorization'];

    return this.request.get(this.getInvitationsEndpoint, {
      headers: {
        Authorization: authorization
      },
      params: {
        query: '',
        page: 1,
        per_page: 50,
        sort: '',
        sort_direction: ''
      }
    });
  }

  async deleteInvitation(invitationId) {
    const loginResponse = await this.login(
      process.env.USERNAME,
      process.env.PASSWORD
    );

    const authorization =
      loginResponse.headers()['authorization'];

    const endpoint =
      `${this.organizationInvitationEndpoint}/${invitationId}`;

    return this.request.put(endpoint, {
      headers: {
        Authorization: authorization
      },
      data: {
        archived: true
      }
    });
  }

  async resendInvitation(email) {
    const loginResponse = await this.login(
      process.env.USERNAME,
      process.env.PASSWORD
    );

    const authorization =
      loginResponse.headers()['authorization'];

    const resendInvitationPayload = {
      email,
      organization_id: '1008'
    };

    return this.request.post(this.teamInvitationEndpoint, {
      headers: {
        Authorization: authorization
      },
      data: resendInvitationPayload
    });
  }

  async createWebhook(payload = {}) {

    const loginResponse = await this.login(
      process.env.USERNAME,
      process.env.PASSWORD
    );

    expect(loginResponse.status()).toBe(200);

    const authorization =
      loginResponse.headers()['authorization'];

    const webhookPayload = {
      name: 'API Webhook',
      url: 'https://webhook.site/7978a767-d2e9-4c93-8d6b-8e86a945a897',
      secret_token: 'Admin@123',
      rate_limit: 1,
      template_id: 33028,
      webhook_type: 'records',
      ...payload
    };

    console.log('Webhook payload:', webhookPayload);
    console.log('Authorization exists:', !!authorization);

    return this.request.post(this.webhookEndpoint, {
      headers: {
        Authorization: authorization
      },
      data: webhookPayload
    });
  }

  async deleteWebhook(webhookId) {
    const loginResponse = await this.login(
      process.env.USERNAME,
      process.env.PASSWORD
    );

    expect(loginResponse.status()).toBe(200);

    const authorization =
      loginResponse.headers()['authorization'];

    return this.request.put(
      `${this.webhookEndpoint}/${webhookId}`,
      {
        headers: {
          Authorization: authorization
        },
        data: {
          archived: true
        }
      }
    )
  }

  async apiKeyCreation(payload = {}) {

    const loginResponse = await this.login(
      process.env.USERNAME,
      process.env.PASSWORD
    );

    expect(loginResponse.status()).toBe(200);

    const authorization =
      loginResponse.headers()['authorization'];

    const apiKeyPayload = {
      name: 'API Key Automation',
      ...payload
    };

    return this.request.post(this.apiKeyEndpoint, {
      headers: {
        Authorization: authorization
      },
      data: apiKeyPayload
    });
  }

  async getApiCredentials() {
    const loginResponse = await this.login(
      process.env.USERNAME,
      process.env.PASSWORD
    );

    expect(loginResponse.status()).toBe(200);

    const authorization =
      loginResponse.headers()['authorization'];

    return this.request.get(
      this.apiKeyEndpoint,
      {
        headers: {
          Authorization: authorization
        },
        params: {
          query: '',
          page: 1,
          per_page: 50,
          sort: '',
          sort_direction: ''
        }
      }
    );
  }

  async deleteApiKey(apiKeyId) {
    const loginResponse = await this.login(
      process.env.USERNAME,
      process.env.PASSWORD
    );

    expect(loginResponse.status()).toBe(200);

    const authorization =
      loginResponse.headers()['authorization'];

    return this.request.delete(
      `${this.apiKeyEndpoint}/${apiKeyId}`,
      {
        headers: {
          Authorization: authorization
        }
      });
  }

  async createImporter(payload = {}) {
    const loginResponse = await this.login(
      process.env.USERNAME,
      process.env.PASSWORD
    );

    expect(loginResponse.status()).toBe(200);

    const authorization = loginResponse.headers()['authorization'];

    const importerPayload = {
      name: 'API Importer',
      ...payload
    };
    return this.request.post(this.importerEndpoint, {
      headers: {
        Authorization: authorization
      },
      data: importerPayload
    });
  }

  async createImporterWithoutPayload() {
    const loginResponse = await this.login(
      process.env.USERNAME,
      process.env.PASSWORD
    );

    expect(loginResponse.status()).toBe(200);

    const authorization = loginResponse.headers()['authorization'];
    return this.request.post(this.importerEndpoint, {
      headers: {
        Authorization: authorization
      }
    });
  }

  async editImporter(slug, payload = {}) {
    const loginResponse = await this.login(
      process.env.USERNAME,
      process.env.PASSWORD
    );

    expect(loginResponse.status()).toBe(200);

    const authorization =
      loginResponse.headers()['authorization'];

    const editPayload = {
      slug,
      name: 'API Automation',
      persistence: false,
      archived: false,
      ...payload
    };

    return this.request.put(`${this.importerEndpoint}/${slug}`, {
      headers: {
        Authorization: authorization
      },
      data: editPayload
    });
  }

  async deleteImporter(slug) {
    const loginResponse = await this.login(
      process.env.USERNAME,
      process.env.PASSWORD
    );

    expect(loginResponse.status()).toBe(200);

    const authorization =
      loginResponse.headers()['authorization'];

    return this.request.put(`${this.importerEndpoint}/${slug}`, {
      headers: {
        Authorization: authorization
      },
      data: {
        archived: true
      }
    });
  }

  async addColumn(slug, payload = {}) {
    const loginResponse = await this.login(
      process.env.USERNAME,
      process.env.PASSWORD
    );

    expect(loginResponse.status()).toBe(200);

    const authorization =
      loginResponse.headers()['authorization'];

    const columnPayload = {
      internal_key: 'String',
      label: 'String',
      description: 'Only accepts string value',
      column_type: 'string',
      pattern: null,
      required: false,
      transformations: [],
      unique: false,
      validations: [],
      values: [],
      ...payload
    };

    return this.request.post(
      `${this.importerEndpoint}/${slug}/columns`,
      {
        headers: {
          Authorization: authorization
        },
        data: columnPayload
      }
    );
  }

  async addColumnWithoutPayload(slug) {
    const loginResponse = await this.login(
      process.env.USERNAME,
      process.env.PASSWORD
    );

    expect(loginResponse.status()).toBe(200);

    const authorization = loginResponse.headers()['authorization'];
    return this.request.post(
      `${this.importerEndpoint}/${slug}/columns`,
      {
        headers: {
          Authorization: authorization
        }
      }
    );
  }

  async addColumnWithoutValidationMessage(slug, payload = {}) {
    const loginResponse = await this.login(
      process.env.USERNAME,
      process.env.PASSWORD
    );

    expect(loginResponse.status()).toBe(200);

    const authorization =
      loginResponse.headers()['authorization'];

    const columnPayload = {
      internal_key: 'Integer',
      label: 'Integer',
      description: '',
      column_type: 'integer',
      pattern: null,
      required: false,
      transformations: [],
      unique: false,
      validations: [
        {
          validation_type: 'integer',
          message: null,
          is_default: true
        }
      ],
      values: [],
      ...payload
    };

    return this.request.post(
      `${this.importerEndpoint}/${slug}/columns`,
      {
        headers: {
          Authorization: authorization
        },
        data: columnPayload
      }
    );
  }

  async editColumn(slug, columnId, payload = {}) {
    const loginResponse = await this.login(
      process.env.USERNAME,
      process.env.PASSWORD
    );

    expect(loginResponse.status()).toBe(200);

    const authorization =
      loginResponse.headers()['authorization'];

    const columnPayload = {
      internal_key: 'Integer',
      label: 'Integer',
      description: '',
      column_type: 'integer',
      pattern: null,
      required: false,
      transformations: [],
      unique: false,
      validations: [
        {
          validation_type: 'integer',
          message: 'Must be an integer',
          is_default: true
        }
      ],
      values: [],
      ...payload
    };

    return this.request.put(
      `${this.importerEndpoint}/${slug}/columns/${columnId}`,
      {
        headers: {
          Authorization: authorization
        },
        data: columnPayload
      }
    );
  }

  async deleteColumn(slug, columnId) {
    const loginResponse = await this.login(
      process.env.USERNAME,
      process.env.PASSWORD
    );

    expect(loginResponse.status()).toBe(200);

    const authorization =
      loginResponse.headers()['authorization'];

    return this.request.put(
      `${this.importerEndpoint}/${slug}/columns/${columnId}`,
      {
        headers: {
          Authorization: authorization
        },
        data: {
          archived: true
        }
      }
    );
  }

  async reorderColumn(slug, columnId, position) {
    const loginResponse = await this.login(
      process.env.USERNAME,
      process.env.PASSWORD
    );

    expect(loginResponse.status()).toBe(200);

    const authorization =
      loginResponse.headers()['authorization'];

    return this.request.patch(
      `${this.importerEndpoint}/${slug}/columns/${columnId}`,
      {
        headers: {
          Authorization: authorization
        },
        data: {
          position
        }
      }
    );
  }

  async getAllTemplates() {
    const loginResponse = await this.login(
      process.env.USERNAME,
      process.env.PASSWORD
    );

    expect(loginResponse.status()).toBe(200);

    const authorization =
      loginResponse.headers()['authorization'];

    return this.request.get(this.allTemplatesEndpoint, {
      headers: {
        Authorization: authorization
      }
    });
  }

  async createWebappSession(importerSlug, metadata = {}) {

    const loginResponse = await this.login(
      process.env.USERNAME,
      process.env.PASSWORD
    );
    expect(loginResponse.status()).toBe(200);
    const authorization =
      loginResponse.headers()['authorization'];

    const webappSessionPayload = {
      importer_slug: importerSlug,
      metadata: {
        user_id: 952,
        email: process.env.USERNAME,
        first_name: 'Test',
        last_name: 'Automation',
        ...metadata
      }
    };

    return this.request.post(this.webappSessionEndpoint, {
      headers: {
        Authorization: authorization
      },
      data: webappSessionPayload
    });
  }

  async createColumnMappings(importerSlug, fileHeaders, dynamicColumns = []) {

    const loginResponse = await this.login(
      process.env.USERNAME,
      process.env.PASSWORD
    );

    expect(loginResponse.status()).toBe(200);

    const authorization =
      loginResponse.headers()['authorization'];

    const webappSessionResponse = await this.createWebappSession(importerSlug);
    expect(webappSessionResponse.status()).toBe(201);

    const webappSessionBody = await webappSessionResponse.json();

    const sessionToken = webappSessionBody.token;
    const columnMappingsPayload = {
      dynamic_columns: dynamicColumns,
      file_headers: fileHeaders
    };

    console.log(
      'Column mappings payload:',
      columnMappingsPayload
    );

    const response = await this.request.post(
      `${this.columnMappingsEndpoint}/${importerSlug}/column_mappings`,
      {
        headers: {
          Authorization: `Bearer ${sessionToken}`,
          'Content-Type': 'application/json'
        },
        data: columnMappingsPayload
      }
    );
    return response;
  }

  async createValueMappings(importerSlug, fileValues, dynamicValues = {}) {

    const loginResponse = await this.login(
      process.env.USERNAME,
      process.env.PASSWORD
    );

    expect(loginResponse.status()).toBe(200);

    const authorization =
      loginResponse.headers()['authorization'];

    const webappSessionResponse = await this.createWebappSession(importerSlug);
    expect(webappSessionResponse.status()).toBe(201);
    const webappSessionBody = await webappSessionResponse.json();

    const sessionToken = webappSessionBody.token;

    const valueMappingsPayload = {
      file_values: fileValues,
      dynamic_values: dynamicValues
    };

    console.log('Value mappings payload:', valueMappingsPayload);

    const response = await this.request.post(
      `${this.columnMappingsEndpoint}/${importerSlug}/value_mappings`,
      {
        headers: {
          Authorization: `Bearer ${sessionToken}`,
          'Content-Type': 'application/json'
        },
        data: valueMappingsPayload
      }
    );
    return response;
  }

  async updateUser(userId, firstName, lastName) {
    const loginResponse = await this.login(
      process.env.USERNAME,
      process.env.PASSWORD
    );

    expect(loginResponse.status()).toBe(200);

    const authorization =
      loginResponse.headers()['authorization'];

    const payload = {
      first_name: firstName,
      last_name: lastName
    };

    console.log('Update user payload:', payload);

    return this.request.put(
      `${this.userEndpoint}/${userId}`,
      {
        headers: {
          Authorization: authorization,
          'Content-Type': 'application/json'
        },
        data: payload
      }
    );
  }

  async updatePassword(currentPassword, newPassword, passwordConfirmation) {

    const loginResponse = await this.login(
      process.env.USERNAME,
      process.env.PASSWORD
    );

    expect(loginResponse.status()).toBe(200);

    const authorization =
      loginResponse.headers()['authorization'];

    const payload = {
      current_password: currentPassword,
      password: newPassword,
      password_confirmation: passwordConfirmation
    };

    console.log('Update password payload:', payload);

    return this.request.put(
      this.passwordEndpoint,
      {
        headers: {
          Authorization: authorization,
          'Content-Type': 'application/json'
        },
        data: payload
      }
    );
  }

  async getImporterStylePreferences(organizationId) {

    const loginResponse = await this.login(
      process.env.USERNAME,
      process.env.PASSWORD
    );

    expect(loginResponse.status()).toBe(200);

    const authorization =
      loginResponse.headers()['authorization'];

    return this.request.get(
      `/api/v1/organizations/${organizationId}/importer_style_preferences`,
      {
        headers: {
          Authorization: authorization,
          'Content-Type': 'application/json'
        },
        params: {
          organization_id: organizationId
        }
      }
    );
  }
}