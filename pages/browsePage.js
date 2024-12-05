const BasePage = require('./basePage');

class BrowsePage extends BasePage {
  constructor(page) {
    super(page);
    // Existing locators
    this.stopTask = page.locator("//mat-icon[normalize-space()='stop']");
    this.stopTaskAlert = page.getByRole('button', { name: 'Yes, Stop Task' });

    // Additional locators
    this.createNewTask = page.locator('button').filter({ hasText: /^add$/ });
    this.taskNameInput = page.getByPlaceholder('Task name');
    this.menuButton = page.locator('button').filter({ hasText: 'menu' });
    this.manageTagsMenuItem = page.getByRole('menuitem', { name: 'Manage Tags' });
    //this.inProgressText = page.getByText('In Progress');
    //this.browsingText = page.getByText('Browsing...');
    this.cancelButton = page.locator('button').filter({ hasText: 'cancel' });
    this.deleteEmptyFoldersCheckbox = page.getByLabel('Delete empty folders');
    this.dataAccessOption = page.getByRole('option', { name: 'Data Access' });
    this.createTaskButton = page.getByRole('button', { name: 'Create Task' });
    this.clickHierarchyObject = page.getByRole('treeitem', { name: 'Objects' }).getByRole('button');
    this.clickHierarchyServer = page.getByRole('treeitem', { name: 'Server', exact: true }).getByRole('button');
    this.clickSubscriptionTag = page.getByText('SetSubscriptionDurable');
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
    await this.clickElement(this.stopTask);
    await this.clickElement(this.stopTaskAlert);

  }

  async toggleDeleteEmptyFolders(value) {
    if (value) {
      await this.deleteEmptyFoldersCheckbox.check();
    } else {
      await this.deleteEmptyFoldersCheckbox.uncheck();
    }
  }

  async cancelBrowsing() {
    //await this.clickElement(this.browsingText);
    await this.clickElement(this.cancelButton);
  }

  async expandSelectTag(){
    await this.clickElement(this.clickHierarchyObject);
    await this.clickElement(this.clickHierarchyServer);
    await this.clickElement(this.clickSubscriptionTag);

  }
}

module.exports = BrowsePage;