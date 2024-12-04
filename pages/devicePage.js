const BasePage = require('./basePage');

class DevicePage extends BasePage {
  constructor(page) {
    super(page);
    // Existing locators
    this.devicesMenu = page.locator('a').filter({ hasText: 'devices' });
    this.addButton = page.getByText('add');
    this.deviceTypeDropdown = page.getByLabel('Device Type');
    this.deviceTypeSearch = page.getByPlaceholder('Search for a Device Type...');
    this.opcUaOption = page.getByText('OPCUA');
    this.driverNameDropdown = page.getByLabel('Driver Name');
    this.driverOption = page.getByRole('option', { name: 'OPC UA Client Advanced' });
    this.nameInput = page.getByPlaceholder('Name');
    this.serverUrlInput = page.getByPlaceholder('Server URL');
    this.nextButton = page.getByRole('button', { name: 'Next' });
    this.createDeviceButton = page.getByRole('button', { name: 'Create Device' });
    this.browseLink = page.getByRole('link', { name: 'Browse' });

    // Additional locators
    this.createNewTask = page.locator('button').filter({ hasText: /^add$/ });
    this.taskNameInput = page.getByPlaceholder('Task name');
    this.menuButton = page.locator('button').filter({ hasText: 'menu' });
    this.manageTagsMenuItem = page.getByRole('menuitem', { name: 'Manage Tags' });
    this.inProgressText = page.getByText('In Progress');
    this.browsingText = page.getByText('Browsing...');
    this.cancelButton = page.locator('button').filter({ hasText: 'cancel' });
    this.deleteEmptyFoldersCheckbox = page.getByLabel('Delete empty folders');
    this.dataAccessOption = page.getByRole('option', { name: 'Data Access' });
    this.createTaskButton = page.getByRole('button', { name: 'Create Task' });
  }

  async navigateToDevices() {
    await this.clickElement(this.devicesMenu);
  }
  async navigateToBrowse() {
    await this.clickElement(this.browseLink);
  }

  async addDevice(deviceName, serverUrl) {
    await this.clickElement(this.addButton);
    await this.clickElement(this.deviceTypeDropdown.getByText('Device Type'));
    await this.fillField(this.deviceTypeSearch, 'opc');
    await this.clickElement(this.opcUaOption);
    await this.clickElement(this.driverNameDropdown.getByText('Driver Name'));
    await this.clickElement(this.driverOption);
    await this.fillField(this.nameInput, deviceName);
    await this.fillField(this.serverUrlInput, serverUrl);
    await this.clickElement(this.nextButton);
    await this.clickElement(this.nextButton);
    await this.clickElement(this.createDeviceButton);
  }

  async createTask(taskName) {
    await this.clickElement(this.createNewTask);
    await this.clickElement(this.taskNameInput);
    //await this.taskNameInput.press('ControlOrMeta+a');
    await this.taskNameInput.fill(taskName);
    //await this.taskNameInput.press('ArrowRight');
    await this.clickElement(this.createTaskButton);
  }

  async manageTags() {
    await this.clickElement(this.menuButton);
    await this.clickElement(this.manageTagsMenuItem);

  }

  async toggleDeleteEmptyFolders(value) {
    if (value) {
      await this.deleteEmptyFoldersCheckbox.check();
    } else {
      await this.deleteEmptyFoldersCheckbox.uncheck();
    }
  }

  async verifyDevice() {
    await this.clickElement(this.browseLink);
  }

  async cancelBrowsing() {
    await this.clickElement(this.browsingText);
    await this.clickElement(this.cancelButton);
  }
}

module.exports = DevicePage;
