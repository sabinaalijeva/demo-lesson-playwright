import { Page } from '@playwright/test'
import { BasePage } from './base-page'
import { Button } from '../atoms/Button'
import { StatusPopupPage } from './status-popup-page'
import { LoginPage } from './login-page'

export class AuthorizedPage extends BasePage {
  readonly statusButton: Button
  readonly logoutButton: Button

  constructor(page: Page) {
    super(page)
    this.statusButton = new Button(page.getByTestId('openStatusPopup-button'))
    this.logoutButton = new Button(page.getByTestId('logout-button'))
  }

  async openStatusPopup(): Promise<StatusPopupPage> {
    await this.statusButton.click()
    return new StatusPopupPage(this.page)
  }

  async logout(): Promise<LoginPage> {
    await this.logoutButton.click()
    return new LoginPage(this.page)
  }
}
