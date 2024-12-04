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
    //await devicePage.toggleDeleteEmptyFolders(value);
  
    // Step 4: Verify Task Creation
    //await page.getByPlaceholder('Task name').click();
    //await page.getByPlaceholder('Task name').fill(taskName);
    //const createdTask = await page.getByRole('button', { name: taskName }).isVisible();
    //expect(createdTask).toBeTruthy();

    
  
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



/*test('Create OpcUA Device',async({page})=>

{
    //chrome
    //const context = await browser.newContext();
    //const page = await context.newPage();
        await page.goto('/');
        await page.waitForTimeout(5000);

        console.log(await page.title());
        await page.waitForTimeout(1000);

        await page.getByPlaceholder('Username').click();
        await page.waitForTimeout(500);

        await page.getByPlaceholder('Username').fill('admin');
        await page.waitForTimeout(500);

        await page.getByText('Enter Password').click();
        await page.waitForTimeout(500);

        await page.getByPlaceholder('Enter Password').press('CapsLock');
        await page.waitForTimeout(500);

        await page.getByPlaceholder('Enter Password').fill('Litmus@1');
        await page.waitForTimeout(500);

        await page.getByRole('button', { name: 'Log In' }).click();
        await page.waitForTimeout(2000);

        await page.locator('a').filter({ hasText: 'devices' }).click();
        await page.waitForTimeout(2000);

        await page.getByText('add').click();
        await page.waitForTimeout(2000);

        await page.getByLabel('Device Type').getByText('Device Type').click();
        await page.waitForTimeout(5000);

        await page.getByPlaceholder('Search for a Device Type...').fill('opc');
        await page.waitForTimeout(5000);

        await page.getByText('OPCUA').click();
        await page.waitForTimeout(5000);

        await page.getByLabel('Driver Name').getByText('Driver Name').click();
        await page.getByRole('option', { name: 'OPC UA Client Advanced' }).locator('span').click();
        await page.waitForTimeout(2000);

        await page.getByPlaceholder('Name').click();
        await page.waitForTimeout(2000);
        const randomId = Math.floor(Math.random() * 10000);
        await page.getByPlaceholder('Name').fill(`TestOpcAuto${randomId}`);
        await page.waitForTimeout(500);

        await page.getByPlaceholder('Server URL').click();
        await page.waitForTimeout(5000);

        await page.getByPlaceholder('Server URL').press('ControlOrMeta+a');
        await page.waitForTimeout(500);

        await page.getByPlaceholder('Server URL').fill('opc.tcp://milo.digitalpetri.com:62541/milo');
        await page.waitForTimeout(5000);

        await page.getByRole('button', { name: 'Next' }).click();
        await page.waitForTimeout(500);

        await page.getByRole('button', { name: 'Next' }).click();
        await page.waitForTimeout(1000);

        await page.getByRole('button', { name: 'Create Device' }).click();
        await page.waitForTimeout(1000);

        await page.getByRole('link', { name: 'Browse' }).click();
        await page.waitForTimeout(5000);


    });*/