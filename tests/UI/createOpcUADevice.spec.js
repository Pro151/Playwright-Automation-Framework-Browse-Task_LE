const { test, expect } = require('@playwright/test'); // Fixed import for `expect` to use Playwright's built-in `expect`
const LoginPage = require('../../pages/loginPage'); // Ensure the file paths are correct
const DevicePage = require('../../pages/devicePage');
const BrowsePage = require('../../pages/browsePage');
const { generateRandomId, generateRandomName } = require('../../utils/helpers'); // Merged imports for helper methods

test('Create OPC UA Device', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const devicePage = new DevicePage(page);

    // Step 1: Login
    await loginPage.navigateTo('/');
    await loginPage.login('admin', 'Litmus@1'); // Make sure the credentials are correct

    // Step 2: Navigate to Devices and Add Device
    await devicePage.navigateToDevices();
    const deviceName = `TestOpcAuto${generateRandomId()}`; // Generate a unique device name
    const serverUrl = 'opc.tcp://milo.digitalpetri.com:62541/milo';

    await devicePage.addDevice(deviceName, serverUrl); // Add the device

    // Step 3: Verify Device
    await devicePage.verifyDevice(deviceName); // Pass the device name for verification
});

test('Create and Manage Task', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const devicePage = new DevicePage(page);
    const browsePage = new BrowsePage(page);

    // Step 1: Login
    await loginPage.navigateTo('/');
    await loginPage.login('admin', 'Litmus@1'); // Make sure the credentials are correct

    // Step 2: Navigate to Devices
    await devicePage.navigateToDevices();
    await devicePage.navigateToBrowse();

    // Step 3: Create Task
    const taskName = `TestOpcAutoTask${generateRandomName()}`; // Generate a unique task name
    await browsePage.createTask(taskName);
    await page.waitForTimeout(1000); // Consider replacing `waitForTimeout` with proper event or element checks

    // Step 4: Manage Tags
    await browsePage.manageTags();
    await page.waitForTimeout(2000);

    // Step 5: Cancel Browsing
    await browsePage.cancelBrowsing();
    await page.waitForTimeout(1000);

    // Step 6: Expand & Select Tag
    await browsePage.expandSelectTag();
    await page.waitForTimeout(1000); // Ensure expand and selection logic is implemented in `expandSelectTag`
});

test('Select Tag aAand Add to Cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const devicePage = new DevicePage(page);
    const browsePage = new BrowsePage(page);

    // Step 1: Login
    await loginPage.navigateTo('/');
    await loginPage.login('admin', 'Litmus@1'); // Make sure the credentials are correct

    // Step 2: Navigate to Devices
    await devicePage.navigateToDevices();

    // Step 3: Navigate to browse sub-menu
    await devicePage.navigateToBrowse();

    //Step 4: Expand the hierarchy
    await browsePage.expandSelectTag();
    await page.waitForTimeout(1000);

    //Step 5: Selec tag and Add to cart
    await browsePage.selectTagAddToCart();
    await page.waitForTimeout(1000);

});