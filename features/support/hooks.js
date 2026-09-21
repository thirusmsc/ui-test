const { Before, After, AfterStep, Status } = require('@cucumber/cucumber')
const { chromium, firefox, webkit } = require('playwright')


const BROWSER_ENGINES = { chromium, firefox, webkit }
const browserName = (process.env.BROWSER || 'chromium').toLowerCase()
const headless = process.env.HEADLESS !== 'false'

Before(async function () {
  const engine = BROWSER_ENGINES[browserName]
  if (!engine) {
    throw new Error(
      `Unknown BROWSER "${browserName}". Use one of: ${Object.keys(BROWSER_ENGINES).join(', ')}`
    )
  }
  this.browser = await engine.launch({ headless })
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