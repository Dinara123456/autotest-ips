import { ChainablePromiseElement } from 'webdriverio'
import { UserModel } from '../model/user.model'



class LoginPage {
    protected browser: WebdriverIO.Browser
    protected url = 'https://github.com/login'

    constructor (browser: WebdriverIO.Browser) {
        this.browser = browser
    }

    public isDisplayedErrorMessage() {
        return this.getErrorMessage().isDisplayed()
    }

    public async open(): Promise<void> {
        await this.browser.url(this.url)
    }

    public async setLogin(login: string): Promise<void> {
        await this.getLoginField().waitForDisplayed({
            timeoutMsg: 'Login field was not displayed'
        })
        await this.getLoginField().setValue(login)
    }

    public async setPassword(password: string): Promise<void> {
        await this.getPasswordField().waitForDisplayed({
            timeoutMsg: 'Login field was not displayed'
        })
        await this.getPasswordField().setValue(password)
    }

    public async submitForm(): Promise<void> {//использовать метод waitForClickable
        await this.getLoginButton().waitForClickable({
            timeoutMsg: 'Login button was not clickable'
        })
        await this.getLoginButton().click()
    }

    public async login(user: UserModel): Promise<void> {
        await this.setLogin(user.login)
        await this.setPassword(user.password)
        await this.submitForm()
    }

    private getErrorMessage(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[contains(@class, "flash-error")]')
    }

    private getLoginField(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="login_field"]')
    }

    private getPasswordField(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="password"]')
    }

    private getLoginButton(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@type="submit"]')
    }
}

export {
    LoginPage
}