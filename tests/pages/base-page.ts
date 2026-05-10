import { expect, Locator, Page } from '@playwright/test'

export class BasePage {
  readonly page: Page
  readonly footer: Locator
  readonly langBtnRU: Locator
  readonly langBtnEN: Locator
  readonly navFooter: Locator

  constructor(page: Page) {
    this.page = page
    this.footer = page.locator('.Footer')
    this.langBtnRU = this.footer.locator('.language__button').nth(1)
    this.langBtnEN = this.footer.locator('.language__button').nth(0)
    this.navFooter = this.footer.locator('.nav-footer')
  }

  async checkFooterComponents(): Promise<void> {
    await expect(this.navFooter).toBeVisible()
    await expect(this.langBtnRU).toBeVisible()
    await expect(this.langBtnEN).toBeVisible()
  }
}
