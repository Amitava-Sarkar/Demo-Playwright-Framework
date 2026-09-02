import { test as base, expect } from '@playwright/test';

import { LoginPage } from '../Pagemethods/Login.js';
import { SignupPage } from '../Pagemethods/Signup.js';
import { Importer } from '../Pagemethods/importer.js';
import { Team } from '../Pagemethods/team.js';
import {Profile} from '../Pagemethods/profile.js';
import {Billing} from '../Pagemethods/billing.js';
import {Developers} from '../Pagemethods/developers.js';
import {Branding} from '../Pagemethods/branding.js';
import {ImportsFile} from '../Pagemethods/importsFile.js';
import {MatchColumn} from '../Pagemethods/match-column.js';
import {TableAction} from '../Pagemethods/table-action.js';
import {ApplyFilters} from '../Pagemethods/applyFilters.js';
import {ConditionGroup} from '../Pagemethods/conditionGroup.js';
import { Authentication } from '../../api/authApi.js';

export const test = base.extend({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  signupPage: async ({ page }, use) => {
    await use(new SignupPage(page));
  },

  importer: async ({ page }, use) => {
    await use(new Importer(page));
  },

  team: async ({ page }, use) => {
    await use(new Team(page));
  },

  profile: async ({ page }, use) => {
    await use(new Profile(page));
  },
  
  billing: async ({ page }, use) => {
    await use(new Billing(page));
  },

  developers: async ({ page }, use) => {
    await use(new Developers(page));
  },

  branding: async ({ page }, use) => {
    await use(new Branding(page));
  },

  importsFile: async ({ page }, use) => {
    await use(new ImportsFile(page));
  },

  matchColumn: async ({ page }, use) => {
    await use(new MatchColumn(page));
  },

  tableAction: async ({ page }, use) => {
    await use(new TableAction(page));
  },
  
  applyFilters: async ({ page }, use) => {
    await use(new ApplyFilters(page));
  },

  conditionGroup: async ({ page }, use) => {
    await use(new ConditionGroup(page));
  },

  authApi: async ({ request }, use) => {
    const authApi = new Authentication(request);
    await use(authApi);
  },
});

export { expect };