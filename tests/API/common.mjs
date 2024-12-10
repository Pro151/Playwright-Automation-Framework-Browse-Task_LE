
const { test, expect } = require('@playwright/test');

'use strict';

const { chromium } = require('playwright');

/**
 * Pauses the test execution for a specified number of seconds.
 * @param {number} seconds - The amount of seconds to wait before proceeding.
 */
async function wait(seconds) {
  console.log(`Waiting for ${seconds} seconds...`);
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000)).then(() =>
    console.log('Resuming tests...')
  );
}

/**
 * Removes all added items of a specified type from the server.
 * @param {string} type - The type of items to remove (e.g., users, licenses).
 * @param {object} edge - Edge API instance for interacting with the backend.
 */
async function removeAllItems(type, edge) {
  console.log(`Removing all added ${type}...`);
  return edge.removeAll(type).then(() => {
    console.log(`All ${type} removed.`);
  });
}

/**
 * Removes all items from a specified endpoint and ID field.
 * @param {string} endpoint - The API endpoint to fetch items.
 * @param {string} id - The identifier field in the response data.
 * @param {object} request - Request handler for making API calls.
 * @param {string} edgeUrl - Base URL for the API.
 */
async function removeItemsFromEndpoint(endpoint, id, request, edgeUrl) {
  console.log(`Removing all items from ${endpoint}...`);
  const response = await request('GET', `${edgeUrl}${endpoint}`, { agent: 'admin' });
  const items = JSON.parse(response.text);

  const promises = items.map(async (item) => {
    const res = await request('DELETE', `${edgeUrl}${endpoint}/${item[id]}`, { agent: 'admin' });
    if (res.status !== 204) {
      throw new Error(`Failed to delete item with ID ${item[id]}`);
    }
  });

  await Promise.all(promises);
  console.log(`All items removed from ${endpoint}.`);
}

/**
 * Extracts the host ID from the hostname.
 * @param {string} hostname - The hostname string.
 * @returns {string} - Extracted host ID.
 */
function extractHostIdFromHostname(hostname) {
  const hostId = hostname.replace(/^[a-z-]+-/, '');
  console.log(`Extracted host ID: ${hostId}`);
  return hostId;
}

/**
 * Extracts an array of specified properties from API response data.
 * @param {string} arrayName - Name for storing the extracted array.
 * @param {string} property - The property to extract from each object.
 * @param {string} url - The API URL to fetch data.
 * @param {object} request - Request handler for making API calls.
 * @param {object} store - Store object for storing results.
 */
async function extractArrayFromResponse(arrayName, property, url, request, store) {
  console.log(`Extracting "${property}" as an array from ${url}...`);
  const response = await request('GET', url, { agent: 'admin' });
  if (response.status !== 200) {
    throw new Error(`Failed to fetch data from ${url}`);
  }

  const data = response.body;
  store[arrayName] = data.map((item) => {
    if (!item[property]) {
      throw new Error(`Property "${property}" not found in response object`);
    }
    return item[property];
  });

  console.log(`Extracted array: ${store[arrayName]}`);
  if (store[arrayName].length === 0) {
    throw new Error('Extracted array is empty.');
  }
}

(async () => {
  // Example usage:
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  // Replace the following with actual calls to your backend services.
  const edge = { removeAll: async (type) => console.log(`Simulated removal of ${type}`) };
  const request = async (method, url, options) => {
    console.log(`Simulated ${method} request to ${url} with options:`, options);
    return { status: 200, text: '[]', body: [] }; // Simulated response
  };
  const store = {};

  await wait(3);
  await removeAllItems('users', edge);
  await removeItemsFromEndpoint('/devices', 'id', request, 'http://example.com');
  store.hostid = extractHostIdFromHostname('test-host-123');
  await extractArrayFromResponse('deviceIds', 'id', 'http://example.com/api/devices', request, store);

  await browser.close();
})();
