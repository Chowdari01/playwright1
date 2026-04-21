// import { test, expect } from '@playwright/test';
// import { LoginPage } from '../pages/LoginPage';
// import { CartPage } from '../pages/CartPage';
// import { CheckoutPage } from '../pages/CheckoutPage';

// test.describe('Cart Tests', () => {
//   test.beforeEach(async ({ page }) => {
//     const loginPage = new LoginPage(page);
//     await loginPage.goto();
//     await loginPage.login('standard_user', 'secret_sauce');

//     const cartPage = new CartPage(page);
//     await cartPage.addBackpack();
//     await cartPage.addTShirt();
//   });

//   test('Verify products added to cart', async ({ page }) => {
//     const cartPage = new CartPage(page);
//     await cartPage.openCart();
//     const cartItems = await cartPage.getCartItems();
//     expect(cartItems).toContain('Sauce Labs Backpack');
//     expect(cartItems).toContain('Sauce Labs Bolt T-Shirt');
//     await page.screenshot({ path: 'screenshots/cart-items.png' });
//   });

//   test('Remove product from cart', async ({ page }) => {
//     const cartPage = new CartPage(page);
//     await cartPage.openCart();
//     await cartPage.removeBackpack();
//     const remainingItems = await cartPage.getCartItems();
//     expect(remainingItems).toContain('Sauce Labs Bolt T-Shirt');
//     await page.screenshot({ path: 'screenshots/cart-remove.png' });
//   });

//   test('Checkout the product in cart', async ({ page }) => {
//     const cartPage = new CartPage(page);
//     await cartPage.openCart();
//     const checkoutPage = new CheckoutPage(page);
//     await checkoutPage.checkout('standard', 'user', '600010');
//     await checkoutPage.assertOrderComplete();
//     await page.screenshot({ path: 'screenshots/checkout-complete.png' });
//   });
// });

import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('Cart Tests', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    const cartPage = new CartPage(page);
    await cartPage.addBackpack();
    await cartPage.addTShirt();
  });

  test('Verify products added to cart', async ({ page }) => {
    const cartPage = new CartPage(page);
    await cartPage.openCart();
    const cartItems = await cartPage.getCartItems();

    console.log('Cart Items:', cartItems);

    expect(cartItems).toContain('Sauce Labs Backpack');
    expect(cartItems).toContain('Sauce Labs Bolt T-Shirt');

    const screenshot = await page.screenshot();
    await test.info().attach('cart-items', {
      body: screenshot,
      contentType: 'image/png',
    });
  });

  test('Remove product from cart', async ({ page }) => {
    const cartPage = new CartPage(page);
    await cartPage.openCart();
    await cartPage.removeBackpack();
    const remainingItems = await cartPage.getCartItems();

    console.log('Remaining Items:', remainingItems);

    expect(remainingItems).toContain('Sauce Labs Bolt T-Shirt');

    const screenshot = await page.screenshot();
    await test.info().attach('cart-remove', {
      body: screenshot,
      contentType: 'image/png',
    });
  });

  test('Checkout the product in cart', async ({ page }) => {
    const cartPage = new CartPage(page);
    await cartPage.openCart();
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.checkout('standard', 'user', '600010');
    await checkoutPage.assertOrderComplete();

    console.log('Checkout completed successfully');

    const screenshot = await page.screenshot();
    await test.info().attach('checkout-complete', {
      body: screenshot,
      contentType: 'image/png',
    });
  });
});
