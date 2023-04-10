import { ChainablePromiseElement } from 'webdriverio'

class NewIssuePage {
    protected browser: WebdriverIO.Browser
    protected url: string

    constructor (browser: WebdriverIO.Browser, username: string) {
        this.browser = browser
        this.url = `https://github.com/${username}/test/issues/new`
    }

    public async open(username: string): Promise<void> {
        await this.browser.url(this.url)
    }

    public async setIssueTitle(issueTitle: string): Promise<void> {
        await this.getIssueTitle().waitForDisplayed({
            timeoutMsg: 'Issue title field was not display'
        })
        await this.getIssueTitle().setValue(issueTitle)
    }

    public async saveNewIssue(): Promise<void> {
        await this.getSubmitNewIssueButton().waitForEnabled({
            timeoutMsg: 'Button was not enabled'
        })
        await this.getSubmitNewIssueButton().click()
    }

    private getIssueTitle(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="issue_title"]')
    }

    private getSubmitNewIssueButton(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="new_issue"]//*[@type="submit"][contains(@class, "ml-2")][contains(@class, "btn")]')
    }
}

export {
    NewIssuePage
}