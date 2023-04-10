import { ChainablePromiseElement } from 'webdriverio'


class ChangeIssuePage {
    protected browser: WebdriverIO.Browser

    constructor (browser: WebdriverIO.Browser) {
        this.browser = browser
    }

    public async open(url: string): Promise<void> {
        await this.browser.url(url)
    }
    
    public async getIssueTitleText(): Promise<string> {
        await this.getIssueTitle().waitForDisplayed({
            timeoutMsg: 'Issue title field was not display'
        })
        return this.getIssueTitle().getText()
    }

    public async editIssue(): Promise<void> {
        await this.getIssueIditButton().waitForDisplayed({
            timeoutMsg: 'Button was not enabled'
        })
        await this.getIssueIditButton().click()
    }

    public async clearIssueTitle(): Promise<void> {
        await this.getIssueTitleField().waitForDisplayed({
            timeoutMsg: 'Issue title field was not display'
        })
        await this.getIssueTitleField().clearValue()
    }
    
    public async setIssueTitle(issueTitle: string): Promise<void> {
        await this.getIssueTitleField().waitForDisplayed({
            timeoutMsg: 'Issue title field was not display'
        })
        await this.getIssueTitleField().setValue(issueTitle)
    }
    
    public async saveIssueChanges(): Promise<void> {
        await this.getIssueChangesSaveButton().waitForDisplayed({
            timeoutMsg: 'Button was not enabled'
        })
        await this.getIssueChangesSaveButton().click()
    }

    public async setIssueComment(issueComment: string): Promise<void> {
        await this.getIssueNewCommentField().waitForDisplayed({
            timeoutMsg: 'Issue title field was not display'
        })
        await this.getIssueNewCommentField().setValue(issueComment)
    }

    public async saveIssueComment(): Promise<void> {
        await this.getIssueCommentSaveButton().waitForClickable({
            timeoutMsg: 'Button was not enabled'
        })
        await this.getIssueCommentSaveButton().click()
    }

    public getIssueCommentFildText(): Promise<string> {
        return this.getIssueCommentField().getText()
    }

    public async openCommentOptions(): Promise<void> {
        await this.getCommentOptions().waitForClickable({
            timeoutMsg: 'Comment options was not enabled'
        })
        await this.getCommentOptions().click()
    }

    public async deleteComment(): Promise<void> {
        await this.getCommentDeleteButton().waitForClickable({
            timeoutMsg: 'Comment delete was not enabled'
        })
        await this.getCommentDeleteButton().click()
        await browser.acceptAlert()
    }

    public isCommentFieldExist(): Promise<boolean>{
        return this.getCommentFiled().isDisplayed()
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

        const file: string = await this.browser.uploadFile(filePath)
        await this.getInputFile().setValue(file)
    }

    public async deleteIssue(): Promise<void> {
        await this.getDeleteIssueButton().waitForClickable({
            timeoutMsg: 'Issue delete button was not enabled'
        })
        await this.getDeleteIssueButton().click()
    }

    public async deleteIssueVerify(): Promise<void> {
        await (await this.getVerifyDeleteIssueButton()).waitForDisplayed({
            timeoutMsg: 'Issue verify delete button was not enabled'
        })
        await this.getVerifyDeleteIssueButton().click()
    }

    private getIssueTitle(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[contains(@class, "gh-header-title")]//*[contains(@class, "markdown-title")]')
    }

    private getIssueIditButton(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[contains(@class, "js-title-edit-button")]')
    }

    private getIssueTitleField(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="issue_title"]')
    }

    private getIssueChangesSaveButton(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[contains(@class, "js-issue-update")]/div/button[1]')
    }

    private getIssueNewCommentField(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="new_comment_field"]')
    }

    private getIssueCommentSaveButton(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="partial-new-comment-form-actions"]/div/div[2]/button')
    }

    private getIssueCommentField(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[contains(@class, "comment-container")]//p[@dir="auto"]')
    }

    private getCommentOptions(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[not(contains(@class, "editable-comment"))][contains(@class, "unminimized-comment")]/div/div/details/summary')
    }

    private getCommentDeleteButton(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[not(contains(@class, "editable-comment"))][contains(@class, "unminimized-comment")]/div/div/details/details-menu/form/button')
    }


    private getCommentFiled(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[not(contains(@class, "editable-comment"))][contains(@class, "unminimized-comment")]')
    }

    private getInputFile(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="fc-new_comment_field"]')
    }

    private getDeleteIssueButton(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[contains(@class, "js-delete-issue")]/summary')
    }
    
    private getVerifyDeleteIssueButton(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@name="verify_delete"]')
    }
}

export {
    ChangeIssuePage
}