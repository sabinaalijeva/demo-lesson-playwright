import { expect, Locator, Page } from '@playwright/test'
import { faker } from '@faker-js/faker/locale/en'
import { BasePage } from './base-page'
import { Button } from '../atoms/Button'
import { NotFoundPage } from './order-not-found-page'
import { OrderDetailsPage } from './order-details-page'

export class OrderPage extends BasePage {
  readonly title: Locator
  readonly statusButton: Button
  readonly createOrderButton: Button
  readonly nameInput: Locator
  readonly phoneInput: Locator
  readonly commentInput: Locator
  readonly confirmationPopup: Locator
  readonly logoutButton: Button
  readonly userNameInputError: Locator
  readonly phoneInputError: Locator

  // search popup
  readonly searchPopup: Locator
  readonly searchInput: Locator
  readonly searchButton: Button

  constructor(page: Page) {
    super(page)
    this.title = page.locator('h2')
    this.statusButton = new Button(page.getByTestId('openStatusPopup-button'))
    this.nameInput = page.getByTestId('username-input')
    this.phoneInput = page.getByTestId('phone-input')
    this.commentInput = page.getByTestId('comment-input')
    this.createOrderButton = new Button(page.getByTestId('createOrder-button'))
    this.confirmationPopup = page.getByTestId('orderSuccessfullyCreated-popup')
    this.logoutButton = new Button(page.getByTestId('logout-button'))
    this.userNameInputError = page.getByTestId('username-input-error')
    this.phoneInputError = page.getByTestId('phone-input-error')

    // search popup
    this.searchPopup = page.getByTestId('searchOrder-popup')
    this.searchInput = this.searchPopup.getByTestId('searchOrder-input')
    this.searchButton = new Button(this.searchPopup.getByTestId('searchOrder-submitButton'))
  }
  async checkInnerComponents(): Promise<void> {
    await expect(this.title).toBeVisible()
    await this.statusButton.checkVisible(true)
    await this.createOrderButton.checkVisible(true)
    await expect(this.nameInput).toBeVisible()
    await expect(this.phoneInput).toBeVisible()
    await expect(this.commentInput).toBeVisible()
  }
  async createOrder(): Promise<void> {
    await this.nameInput.fill(faker.person.firstName())
    await this.phoneInput.fill(faker.phone.number())
    await this.commentInput.fill(faker.lorem.sentence(5))
    await this.createOrderButton.click()
    await expect(this.confirmationPopup).toBeVisible()
  }
  // async checkCreateOrderBtnEnabled(enabled: boolean): Promise<void> {
  //   await expect(this.createOrderButton).toBeEnabled({ enabled })
  // }
  async validationMessage(): Promise<void> {
    await expect(this.userNameInputError).toHaveText(
      'The field must contain at least of characters: 2',
    )
    await expect(this.phoneInputError).toHaveText(
      'The field must contain at least of characters: 6',
    )
  }
  async validationMessage2(): Promise<void> {
    await expect(this.userNameInputError).toHaveText('The field must be filled in.')
    await expect(this.phoneInputError).toHaveText('The field must be filled in.')
  }
  async noValidationErrors(): Promise<void> {
    await expect(this.userNameInputError).not.toBeVisible()
    await expect(this.phoneInputError).not.toBeVisible()
  }

  async checkOrderNotFound(): Promise<NotFoundPage> {
    await this.statusButton.click()
    await this.searchInput.fill('0')
    await this.searchButton.click()
    return new NotFoundPage(this.page)
  }
  async checkOrderFound(id: number): Promise<OrderDetailsPage> {
    await this.statusButton.click()
    await this.searchInput.fill(`${id}`)
    await this.searchButton.click()
    return new OrderDetailsPage(this.page)
  }
}
