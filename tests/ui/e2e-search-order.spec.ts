import { test } from '@playwright/test'
import { LoginPage } from '../pages/login-page'
import { PASSWORD, USERNAME } from '../../config/env-data'

const correctOrderID = 17810
const incorrectOrderID = 0

test('not found page test', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.open()
  const orderPage = await loginPage.signIn(USERNAME, PASSWORD)
  const notFoundPage = await orderPage.checkOrderNotFound(incorrectOrderID)
  await notFoundPage.checkVisible(true)
})

test('found page test', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.open()
  const orderPage = await loginPage.signIn(USERNAME, PASSWORD)
  const detailsPage = await orderPage.checkOrderFound(correctOrderID)
  await detailsPage.checkVisible(true)
})
