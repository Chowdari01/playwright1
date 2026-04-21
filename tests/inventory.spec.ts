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
//     await page.screenshot({ path: 'screenshots/navigation-menu.png' });
//   });

//   test('Check products are visible', async ({ page }) => {
//     const inventoryPage = new InventoryPage(page);
//     const productNames = await inventoryPage.getProductNames();
//     expect(productNames.length).toBeGreaterThan(0);
//     await page.screenshot({ path: 'screenshots/products.png' });
//   });
// });

import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test.describe('Authenticated User Flow', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test('Verify navigation menu options', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.openMenu();

    await expect(page.getByText('All Items')).toBeVisible();
    await expect(page.getByText('About')).toBeVisible();
    await expect(page.getByText('Logout')).toBeVisible();
    await expect(page.getByText('Reset App State')).toBeVisible();

    console.log('Navigation menu options verified');

    const screenshot = await page.screenshot();
    await test.info().attach('navigation-menu', {
      body: screenshot,
      contentType: 'image/png',
    });
  });

  test('Check products are visible', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const productNames = await inventoryPage.getProductNames();

    productNames.forEach((name, index) => {
      console.log(`Product ${index + 1}: ${name}`);
    });

    expect(productNames.length).toBeGreaterThan(0);

    const screenshot = await page.screenshot();
    await test.info().attach('products-list', {
      body: screenshot,
      contentType: 'image/png',
    });
  });
});
