import { ChainablePromiseElement } from 'webdriverio'

class IssuesListPage {
    protected browser: WebdriverIO.Browser
    protected url: string

    constructor (browser: WebdriverIO.Browser, username: string) {
        this.browser = browser
        this.url = `https://github.com/${username}/test/issues`
    }

    public async open(): Promise<void> {
        await this.browser.url(this.url)
    }

    public async setSearchIssueValue(IssueTitle: string): Promise<void> {
        await this.getIssueSearchField().waitForDisplayed({
            timeoutMsg: 'Search input was not display'
        })
        await this.getIssueSearchField().setValue(IssueTitle)
    }

    public isIssueSerchResultBlank(): Promise<boolean>{
        return this.getBlankResultBlock().isDisplayed()
    }

    public getFoundIssueTitleText(): Promise<string> {
        return this.getFoundIssueTitle().getText()
    }

    public async openFoundIssue(): Promise<void> {
        await this.getFoundIssueTitle().click()
    }

    private getIssueSearchField(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="js-issues-search"]')
    }

    private getBlankResultBlock(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[contains(@class, "blankslate-large")]')
    }

    private getFoundIssueTitle(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@class="Link--primary v-align-middle no-underline h4 js-navigation-open markdown-title"]')
    }    
}

export {
    IssuesListPage
}