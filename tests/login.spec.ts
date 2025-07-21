
import {test, expect} from '@playwright/test';

test('Login with standard_user succeeds', async ({page}) => {

await page.goto('https://saucedemo.com/');
await page.fill('#user-name','standard_user');
await page.fill('#password','secret_sauce');
await page.click('#login-button');

await expect(page).toHaveURL(/inventory.html/);
});

test('Login with locked_out_user returns Logged out message', async({page}) => {

    await page.goto('https://saucedemo.com/');
    await page.fill('#user-name','locked_out_user');
    await page.fill('#password','secret_sauce');
    await page.click('#login-button');

    const errorMessageLocator = page.locator('[data-test="error"]');
    await expect(errorMessageLocator).toBeVisible();
    await expect(errorMessageLocator).toContainText('Epic sadface: Sorry, this user has been locked out.');

});

test('Login with locked_out_user returns Logged out message', async({page}) => {

    await page.goto('https://saucedemo.com/');
    await page.fill('#user-name','locked_out_user');
    await page.fill('#password','secret_sauce');
    await page.click('#login-button');

    const errorMessageLocator = page.locator('[data-test="error"]');
    await expect(errorMessageLocator).toBeVisible();
    await expect(errorMessageLocator).toContainText('Epic sadface: Sorry, this user has been locked out.');

});