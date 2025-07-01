
import {test, expect} from '@playwright/test';

test('Login with standard_user succeeds', async ({page}) => {

await page.goto('https://saucedemo.com/');
await page.fill('#user-name','standard_user');
await page.fill('#password','secret_sauce');
await page.click('#login-button');

await expect(page).toHaveURL(/inventory.html/);
});