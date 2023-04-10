import { ChainablePromiseElement } from 'webdriverio'

class SettingsPage {
    protected browser: WebdriverIO.Browser
    protected url = 'https://github.com/settings/profile'

    constructor (browser: WebdriverIO.Browser) {
        this.browser = browser
    }

    public async open(): Promise<void> {
        await this.browser.url(this.url)
    }

    public async setUserName(userName: string): Promise<void> {
        await this.getUserProfileName().waitForDisplayed({
            timeoutMsg: 'User profile name field was not display'
        })
        await this.getUserProfileName().setValue(userName)
    }

    public async clearUserName(): Promise<void> {
        await this.getUserProfileName().waitForDisplayed({
            timeoutMsg: 'User profile name field was not display'
        })
        await this.getUserProfileName().clearValue()
    }

    public async setUserBio(userBio: string): Promise<void> {
        await this.getUserProfileBio().waitForDisplayed({
            timeoutMsg: 'User profile bio field was not display'
        })
        await this.getUserProfileBio().setValue(userBio)
    }

    public async clearUserBio(): Promise<void> {
        await this.getUserProfileBio().waitForDisplayed({
            timeoutMsg: 'User profile bio field was not display'
        })
        await this.getUserProfileBio().clearValue()
    }

    public getUserProfileBioText(): Promise<string> {
        return this.getUserProfileBio().getValue()
    }

    public async saveSettings(): Promise<void> {
        await this.getSaveSettingsButton().click()
    }

    public isErrorMessageDisplayed(): Promise<boolean> {
        return this.getErrorMessage().isDisplayed()
    }

    public isUserEmailDisplayed(email: string): Promise<boolean> {
        return this.getUserEmail(email).isSelected()
    }

    public async setUserEmail(email: string): Promise<void> {
        await this.getEmail().waitForDisplayed({
            timeoutMsg: 'user emeil field was not display'
        })
        await this.getEmail().click()
        await this.getUserEmail(email).click()
    }

    public async clearUserMail(): Promise<void> {
        await this.getUserEmailRemoveButton().waitForDisplayed({
            timeoutMsg: 'user emeail remove button was not display'
        })
        await this.getUserEmailRemoveButton().click()
    }

    public isUserPronounceSelected(pronounce: string): Promise<boolean> {
        return this.getUserPronounce(pronounce).isSelected()
    }

    public async setUserPronounce(pronounce: string): Promise<void> {
        await this.getPronounce().waitForDisplayed({
            timeoutMsg: 'user user pronounce was not display'
        })
        await this.getPronounce().click()
        await this.getUserPronounce(pronounce).click()
    }

    public async setUserPronounceDefault(): Promise<void> {
        await this.getPronounce().waitForDisplayed({
            timeoutMsg: 'user user pronounce was not display'
        })
        await this.getPronounce().click()
        await this.getUserPronounceDefault().click()
    }

    public async showHiddenFileInput(): Promise<void> {
        await this.browser.execute(() => {
            const htmlElement: HTMLElement = document.querySelector('[type="file"]') as HTMLElement
            htmlElement.style.cssText = 'display:block !important; opacity: 1; position: inherit;'
        })
    }

    public async uploadFile(filePath: string): Promise<void> {
        await this.getInputFile().waitForExist({
            timeoutMsg: 'File input field was not exist',
        })
        await this.showHiddenFileInput()
        const file: string = await this.browser.uploadFile(filePath)
        await this.getInputFile().setValue(file)
    }

    public async saveUploadFile(): Promise<void> {
        await this.getSaveUploadFileButton().click()
    }

    public getUserProfileNameText(): Promise<string> {
        return this.getUserProfileName().getValue()
    }

    public isChangeUserProfilePhotoSuccessMessageDisplayed(): Promise<boolean> {
        return this.getChangeUserProfilePhotoSuccessMessage().isDisplayed()
    }

    public async waitUploadFileBox(): Promise<void> {
        await this.getUploadFileBox().waitForDisplayed({
            timeoutMsg: 'Upload file box does not display',
            timeout: 6000 
        })
    }

    private getChangeUserProfilePhotoSuccessMessage(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="js-flash-container"]//*[@class = "js-flash-alert"]')
    }

    private getUserPronounce(pronounce: string): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$(`//select//*[contains(@value,"${pronounce}")]`)
    }

    private getUserEmail(email: string): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$(`//select//*[contains(@value,"${email}")]`)
    }

    private getErrorMessage(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[contains(@class, "flash-error")]')
    }

    private getUserProfileName(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="user_profile_name"]')
    }

    private getUserProfileBio(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="user_profile_bio"]')
    }

    private getSaveSettingsButton(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@class="Button-content"]')
    }

    private getEmail(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="user_profile_email"]')
    }

    private getUserEmailRemoveButton(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@form="unset_profile_email"]')
    }

    private getPronounce(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="user_profile_pronouns_select"]')
    }

    private getUserPronounceDefault(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="user_profile_pronouns_select"]/option[1]')
    }

    private getInputFile(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('[type="file"]')
    }

    private getSaveUploadFileButton(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="avatar-crop-form"]//button')
    }

    private getUploadFileBox(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="avatar-crop-form"]')
    }
}

export {
    SettingsPage
}