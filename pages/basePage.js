class BasePage {
    constructor(page) {
      this.page = page;
    }
  
    async navigateTo(url) {
      await this.page.goto(url);
      await this.page.waitForTimeout(1000);
    }
  
    async clickElement(locator) {
      await locator.click();
      await this.page.waitForTimeout(2000);
    }
  
    async fillField(locator, text) {
      await locator.fill(text);
      await this.page.waitForTimeout(1000);
    }
  
    async waitForTimeout(time = 2000) {
      await this.page.waitForTimeout(time);
    }
  
    async pressKey(locator, key) {
      await locator.press(key);
      await this.page.waitForTimeout(500);
    }
  }
  
  module.exports = BasePage;
  