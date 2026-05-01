import { test } from '@playwright/test'
import { LoginPage } from '../pages/login-page'
import { PASSWORD, USERNAME } from '../../config/env-data'
import { faker } from '@faker-js/faker/locale/en'

test('login and order fields validation', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.open()
  const orderPage = await loginPage.signIn(USERNAME, PASSWORD)
  await orderPage.checkInnerComponents()

  await orderPage.nameInput.fill('a')
  await orderPage.phoneInput.fill('1')
  await orderPage.validationMessage()

  await orderPage.nameInput.clear()
  await orderPage.phoneInput.clear()
  await orderPage.validationMessage2()

  await orderPage.nameInput.fill(faker.person.firstName())
  await orderPage.phoneInput.fill(faker.phone.number())
  await orderPage.noValidationErrors()
})
