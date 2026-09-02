import { test as setup, expect } from '@playwright/test';

setup('authenticate', async ({ page }) => {
  await page.goto(process.env.BASE_URL);

  await page.fill('#email', process.env.USERNAME);
  await page.fill('#password', process.env.PASSWORD);
  await page.click('[data-cy="SignIn"]');

  await expect(page).toHaveURL(/account\/importers/);
  await expect(page.getByTestId('importerTitle')).toBeVisible();

  await page.context().storageState({
    path: 'src/auth/user.json'
  });
});