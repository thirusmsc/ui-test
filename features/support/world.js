const { setWorldConstructor, World } = require('@cucumber/cucumber')


class CustomWorld extends World {
  constructor(options) {
    super(options)
    this.page = null
  }
}

setWorldConstructor(CustomWorld)