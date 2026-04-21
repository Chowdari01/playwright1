// import { test, expect } from '@playwright/test';
// import { LoginPage } from '../pages/LoginPage';

// test.describe('Authentication Tests', () => {
//   test('Verify login page loads', async ({ page }) => {
//     const loginPage = new LoginPage(page);
//     await loginPage.goto();
//     await loginPage.assertLoginPageLoaded();
//     await page.screenshot({ path: 'screenshots/login-page.png' });
//   });

//   test('Login with invalid credentials', async ({ page }) => {
//     const loginPage = new LoginPage(page);
//     await loginPage.goto();
//     await loginPage.login('standard_user', 'wrong_password');
//     await expect(page.locator('[data-test="error"]'))
//       .toHaveText('Epic sadface: Username and password do not match any user in this service');
//     await page.screenshot({ path: 'screenshots/invalid-login.png' });
//   });
// });

// import { test, expect } from '@playwright/test';
// import { LoginPage } from '../pages/LoginPage';
// import { InventoryPage } from '../pages/InventoryPage';

// test.describe('Authenticated User Flow', () => {
//   test.beforeEach(async ({ page }) => {
//     const loginPage = new LoginPage(page);
//     await loginPage.goto();
//     await loginPage.login('standard_user', 'secret_sauce');
//   });

//   test('Verify navigation menu options', async ({ page }) => {
//     const inventoryPage = new InventoryPage(page);
//     await inventoryPage.openMenu();

//     await expect(page.getByText('All Items')).toBeVisible();
//     await expect(page.getByText('About')).toBeVisible();
//     await expect(page.getByText('Logout')).toBeVisible();
//     await expect(page.getByText('Reset App State')).toBeVisible();

//     console.log('Navigation menu options verified');

//     const screenshot = await page.screenshot();
//     await test.info().attach('navigation-menu', {
//       body: screenshot,
//       contentType: 'image/png',
//     });
//   });

//   test('Check products are visible', async ({ page }) => {
//     const inventoryPage = new InventoryPage(page);
//     const productNames = await inventoryPage.getProductNames();

//     productNames.forEach((name, index) => {
//       console.log(`Product ${index + 1}: ${name}`);
//     });

//     expect(productNames.length).toBeGreaterThan(0);

//     const screenshot = await page.screenshot();
//     await test.info().attach('products-list', {
//       body: screenshot,
//       contentType: 'image/png',
//     });
//   });
// });

import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Authentication Tests', () => {
  test('Login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    await expect(page).toHaveURL(/inventory.html/);
    console.log('Valid login successful');

    const screenshot = await page.screenshot();
    await test.info().attach('valid-login', {
      body: screenshot,
      contentType: 'image/png',
    });
  });

  test('Login with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'wrong_password');

    await expect(page.locator('[data-test="error"]'))
      .toHaveText('Epic sadface: Username and password do not match any user in this service');

    console.log('Invalid login attempt displayed error message');

    const screenshot = await page.screenshot();
    await test.info().attach('invalid-login', {
      body: screenshot,
      contentType: 'image/png',
    });
  });
});
