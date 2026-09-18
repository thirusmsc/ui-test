class GenericPage {
  constructor(page) {
    this.page = page
  }

  async open(url) {
    await this.page.goto(url)
  }

  async clickButton(buttonName) {
    await this.page.getByRole('button', { name: buttonName }).click()
  }

  async fillField(placeholder, value) {
    await this.page.getByPlaceholder(placeholder).fill(value)
  }

  heading(headingText) {
    return this.page.getByRole('heading', { name: headingText })
  }

  text(textContent) {
    return this.page.getByText(textContent)
  }

  button(buttonName) {
    return this.page.getByRole('button', { name: buttonName })
  }
}

module.exports = { GenericPage }