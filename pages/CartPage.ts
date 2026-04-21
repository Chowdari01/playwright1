import { Page, expect } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  async addBackpack() {
    await this.page.locator('#add-to-cart-sauce-labs-backpack').click();
  }

  async addTShirt() {
    await this.page.locator('#add-to-cart-sauce-labs-bolt-t-shirt').click();
  }

  async openCart() {
    await this.page.locator('[data-test="shopping-cart-link"]').click();
  }

  async getCartItems() {
    return await this.page.locator('.inventory_item_name').allTextContents();
  }

  async removeBackpack() {
    await this.page.locator('[data-test="remove-sauce-labs-backpack"]').click();
  }
}
