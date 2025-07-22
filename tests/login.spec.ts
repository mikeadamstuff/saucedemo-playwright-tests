
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

    //check the error message appears
    const errorMessageLocator = page.locator('[data-test="error"]');
    await expect(errorMessageLocator).toBeVisible();
    await expect(errorMessageLocator).toContainText('Epic sadface: Sorry, this user has been locked out.');
    //check the error button exists
    const errorMessageBUtton = page.locator('.error-button');
    await expect(errorMessageBUtton).toBeVisible();
    //check the button can be clicked and the error message gets hidden
    await errorMessageBUtton.click();
    await expect(errorMessageBUtton).toBeHidden();
});
