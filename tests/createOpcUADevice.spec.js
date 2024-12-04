const{test}= require('@playwright/test');
const { expect } = require('../playwright.config');
const LoginPage = require('../pages/loginPage');
const DevicePage = require('../pages/devicePage');
const { generateRandomId } = require('../utils/helpers');
const { generateRandomName } = require('../utils/helpers');
const { only } = require('node:test');

test('Create OPC UA Device', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const devicePage = new DevicePage(page);
  
    // Step 1: Login
    await loginPage.navigateTo('/');
    await loginPage.login('admin', 'Litmus@1');
  
    // Step 2: Navigate to Devices and Add Device
    await devicePage.navigateToDevices();
    const deviceName = `TestOpcAuto${generateRandomId()}`;
    const serverUrl = 'opc.tcp://milo.digitalpetri.com:62541/milo';
  
    await devicePage.addDevice(deviceName, serverUrl);
  
    // Step 3: Verify Device
    await devicePage.verifyDevice();
  });

  
  test.only('Create and Manage Task', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const devicePage = new DevicePage(page);
  
    // Step 1: Login
    await loginPage.navigateTo('/');
    await loginPage.login('admin', 'Litmus@1');
  
    // Step 2: Navigate to Devices
    await devicePage.navigateToDevices();
    await devicePage.navigateToBrowse();
  
    // Step 3: Create Task
    const taskName = `TestOpcAutoTask${generateRandomName()}`;
    await devicePage.createTask(taskName);

    
    // Step 5: Manage Tags
    await devicePage.manageTags();
  
    // Step 6: Verify Tags Management
    const inProgressVisible = await page.getByText('In Progress').isVisible();
    expect(inProgressVisible).toBeTruthy();
  
    const browsingVisible = await page.getByText('Browsing...').isVisible();
    expect(browsingVisible).toBeTruthy();
  
    // Cancel Browsing
    await devicePage.cancelBrowsing();
  });
