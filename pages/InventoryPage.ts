import { Page, expect } from '@playwright/test';

export class InventoryPage {
  constructor(private page: Page) {}

  async assertOnInventoryPage() {
    await expect(this.page).toHaveURL(/inventory.html/);
  }

  async getProductNames() {
    return await this.page.locator('.inventory_item_name').allTextContents();
  }

  async openMenu() {
    await this.page.locator('#react-burger-menu-btn').click();
  }
}
