const BasePage = require('./basePage');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.usernameInput = page.getByPlaceholder('Username');
    this.passwordInput = page.getByPlaceholder('Enter Password');
    this.loginButton = page.getByRole('button', { name: 'Log In' });
  }

  async login(username, password) {
    await this.clickElement(this.usernameInput);
    await this.fillField(this.usernameInput, username);
    await this.clickElement(this.passwordInput);
    await this.fillField(this.passwordInput, password);
    await this.clickElement(this.loginButton);
    await this.waitForTimeout(2000);
  }
}

module.exports = LoginPage;
