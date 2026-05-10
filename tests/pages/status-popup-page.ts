import { Locator, Page } from '@playwright/test'
import { Button } from '../atoms/Button'

export class StatusPopupPage {
  readonly page: Page
  readonly searchPopup: Locator
  readonly searchInput: Locator
  readonly searchButton: Button

  constructor(page: Page) {
    this.page = page
    this.searchPopup = page.getByTestId('searchOrder-popup')
    this.searchInput = this.searchPopup.getByTestId('searchOrder-input')
    this.searchButton = new Button(this.searchPopup.getByTestId('searchOrder-submitButton'))
  }

  async enterID(id: number) {
    await this.searchInput.fill(`${id}`)
    await this.searchButton.click()
  }
}
