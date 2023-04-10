import { EMAIL, LOGIN, PASSWORD } from "../tests/login/data/credentials"

describe('Login form test', async () => {
    beforeEach(async () => {
        await browser.url('https://github.com/login')
    })

    it('user should be log in with login', async () => {
        await browser.$('//*[@id="login_field"]').waitForDisplayed({
            timeoutMsg: 'Login field was not display'
        })
        await browser.$('//*[@id="login_field"]').setValue(LOGIN)
        await browser.$('//*[@id="password"]').setValue(PASSWORD)
        await browser.$('//*[@type="submit"]').waitForClickable({
            timeoutMsg: 'Button login was not clickable'
        })
        await browser.$('//*[@type="submit"]').click()
        await (await browser.$('//summary//*[contains(@class, "avatar")]')).waitForDisplayed({
            timeoutMsg: 'Avatar was not displayed'
        })
        await (await browser.$('//summary//*[contains(@class, "avatar")]')).click()
        expect(await browser.$('//*[@class="css-truncate-target"]').getText()).toEqual(LOGIN)
    })

    it('user should be log in with email', async () => {
        await browser.$('//*[@id="login_field"]').waitForDisplayed({
            timeoutMsg: 'Login field was not display'
        })
        await browser.$('//*[@id="login_field"]').setValue(EMAIL)
        await browser.$('//*[@id="password"]').setValue(PASSWORD)
        await browser.$('//*[@type="submit"]').waitForClickable({
            timeoutMsg: 'Button login was not clickable'
        })
        await browser.$('//*[@type="submit"]').click()
        await (await browser.$('//summary//*[contains(@class, "avatar")]')).waitForDisplayed({
            timeoutMsg: 'Avatar was not displayed'
        })
        await (await browser.$('//summary//*[contains(@class, "avatar")]')).click()
        expect(await browser.$('//*[@class="css-truncate-target"]').getText()).toEqual(LOGIN)
    })

    it('user should not be log in with invalid login', async () => {
        await browser.$('//*[@id="login_field"]').waitForDisplayed({
            timeoutMsg: 'Login field was not display'
        })
        await browser.$('//*[@id="login_field"]').setValue('Dinara12345')
        await browser.$('//*[@id="password"]').setValue(PASSWORD)
        await (await browser.$('//*[@type="submit"]')).waitForClickable({
            timeoutMsg: 'Button login was not clickable'
        })
        await browser.$('//*[@type="submit"]').click()
        await browser.$('//*[contains(@class, "flash-error")]').waitForDisplayed({
            timeoutMsg: 'Error did not display'
        })
        expect(await browser.$('//*[contains(@class, "flash-error")]').isDisplayed()).toEqual(true)
    })

    it('user should not be log in with invalid password', async () => {
        await browser.$('//*[@id="login_field"]').waitForDisplayed({
            timeoutMsg: 'Login field was not display'
        })
        await browser.$('//*[@id="login_field"]').setValue(LOGIN)
        await browser.$('//*[@id="password"]').setValue('12345Q')
        await browser.$('//*[@type="submit"]').waitForClickable({
            timeoutMsg: 'Button login was not clickable'
        })
        await browser.$('//*[@type="submit"]').click()
        await browser.$('//*[contains(@class, "flash-error")]').waitForDisplayed({
            timeoutMsg: 'Error did not display'
        })
        expect(await browser.$('//*[contains(@class, "flash-error")]').isDisplayed()).toEqual(true)
    })

    afterEach(async () => {
        await browser.reloadSession()
    })
})