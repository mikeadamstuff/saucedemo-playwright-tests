
import {test, expect} from '@playwright/test';

test('Login with standard_user succeeds', async ({page}) => {

    await page.goto('https://saucedemo.com/');
    await page.fill('#user-name','standard_user');
    await page.fill('#password','secret_sauce');
    await page.click('#login-button');

    await expect(page).toHaveURL(/inventory.html/);

    //check the first item is correct
    const firstValidItem = page.locator('.inventory_item').first();
    const FirstItemImage = firstValidItem.locator('.inventory_item_img img');
    const FirstItemImageSrc = await FirstItemImage.getAttribute('src');
    const FirstItemTitle = page.locator('.inventory_item_name ').first();
    const FirstItemDescription = page.locator('.inventory_item_desc').first();
    const FirstItemPrice = page.locator('.inventory_item_price').first();

    
    expect(FirstItemImage).toBeVisible;
    expect(FirstItemImageSrc).toContain('sauce-backpack-1200x1500.0a0b85a3.jpg');
    await expect(FirstItemTitle).toHaveText('Sauce Labs Backpack');
    await expect(FirstItemDescription).toContainText('carry.allTheThings() with the sleek, streamlined');
    await expect(FirstItemPrice).toContainText('$29.99');
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

test('Login with Problem User brower prompts user to change password', async({page}) => {

    await page.goto('https://saucedemo.com/');
    await page.fill('#user-name','problem_user');
    await page.fill('#password','secret_sauce');
    await page.click('#login-button'); 

    await expect(page).toHaveURL(/inventory.html/);

    //check the first image item is an invalid image
    const invalidFirstImage = page.locator('.inventory_item_img img').first();
    const imageSrc = await invalidFirstImage.getAttribute('src');
    expect(imageSrc).toContain('sl-404.168b1cce.jpg');

    //console logging
    console.log('problem_user image src', imageSrc);
    console.warn('Warning: Chrome displays message pop-up, warning the user to change their password.');
});

test('Login with performance_glitch_user succeeds, log to the console the abnormal time.', async ({page}) => {

    await page.goto('https://saucedemo.com/');
    await page.fill('#user-name','standard_user');
    await page.fill('#password','secret_sauce');
    await page.click('#login-button');

    //assert the correct page loads
    const startTime = Date.now();
    await expect(page).toHaveURL(/inventory.html/, {timeout: 10000});
    const loadTime = Date.now() - startTime;

    //log to the console the load time
    
    if (loadTime > 2000)
    {
    console.log('Page load time: $(loadTime)ms')
    console.warn('Warning: Page load time exceeded 2000ms')
    }
});