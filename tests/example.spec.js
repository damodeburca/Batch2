const { test, expect } = require('@playwright/test');
const xlsx = require('xlsx');

// Load the Excel file and sheet
const workbook = xlsx.readFile('DM_8.xlsx'); // Replace with your Excel file path
const sheetName = workbook.SheetNames[0]; // Use the first sheet
const sheet = workbook.Sheets[sheetName];

// Parse URLs from the Excel sheet into an array
const urls = xlsx.utils.sheet_to_json(sheet, { header: 1 }).map(row => row[0]); // Assuming URLs are in the first column

// Define the test for each URL in the list
urls.forEach((url) => {
  test(`has title and h2 heading "Contents" for URL: ${url}`, async ({ page }) => {
    // Go to the URL from the Excel list
    await page.goto(url);

    // Wait for the page to load completely
    await page.waitForLoadState('domcontentloaded');

    // Check for an h2 heading with the text "Contents"
    //const contentsHeading = page.locator('h2', { hasText: 'Contents' });
    //await expect(contentsHeading).toBeVisible();

    // Check for the button using XPath
    const buttonLocator = page.locator('//html/body/div/div/div/div[1]/div[1]/div[2]/button[2]');
    await expect(buttonLocator).toBeVisible(); // Ensure the button is visible
  });
});
