const { Given, When, Then } = require('@cucumber/cucumber')
const { expect } = require('playwright/test')
const { GenericPage } = require('../pages/GenericPage')

Given('I open {string}', async function (url) {
  this.genericPage = new GenericPage(this.page)
  await this.genericPage.open(url)
})

When('I click the button {string}', async function (buttonName) {
  await this.genericPage.clickButton(buttonName)
})

When('I fill in {string} with {string}', async function (fieldLabel, value) {
  await this.genericPage.fillField(fieldLabel, value)
})

Then('I should see the heading {string}', async function (headingText) {
  await expect(this.genericPage.heading(headingText)).toBeVisible()
})

Then('I should see the text {string}', async function (text) {
  await expect(this.genericPage.text(text)).toBeVisible()
})

Then('I should see the button {string}', async function (buttonName) {
  await expect(this.genericPage.button(buttonName)).toBeVisible()
})