const { Before, After, AfterStep, Status } = require('@cucumber/cucumber')
const { chromium } = require('playwright')


Before(async function () {
  this.browser = await chromium.launch({ headless: true })
  this.page = await this.browser.newPage()
})


After(async function () {
  await this.browser?.close()
})


AfterStep(async function ({ result }) {
  if (result.status === Status.FAILED && this.page) {
    const screenshot = await this.page.screenshot()
    this.attach(screenshot, 'image/png')
  }
})