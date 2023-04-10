import { LoginPage } from "../../login/page-object/Login.page"
import { NewIssuePage } from '../page-object/newIssue.page'
import { ChangeIssuePage } from '../page-object/changeIssue.page'
import { IssuesListPage } from '../page-object/issuesList.page'
import { UserModel, createUserModel } from "../../login/model/user.model"
import { user } from "../../login/data/user.data"
import { IssueModel, createIssueModel } from '../model/issue.model'
import { issue, fileName, invalidFile } from '../data/issue.data'
import { getRandomString, getTimeStamp } from '../../random.data'
import { CreateIssueResponse, IssueAPIService } from '../../api/api-service/IssueAPIService'
import { REPO } from '../../login/data/credentials'
import { AxiosResponse } from 'axios'

describe('Issues', () => {
    let loginPage: LoginPage
    let newIssuePage: NewIssuePage
    let changeIssuePage: ChangeIssuePage
    let issuesListPage: IssuesListPage
    let issueModel: IssueModel
    const userModel: UserModel = createUserModel(user)

    before(async () => {
        loginPage = new LoginPage(browser)
        newIssuePage = new NewIssuePage(browser, userModel.login)
        issuesListPage = new IssuesListPage(browser, userModel.login)
        changeIssuePage = new ChangeIssuePage(browser)
        await loginPage.open()
        await loginPage.login(userModel)
    })

    beforeEach(async () => {
        issueModel = createIssueModel(issue())
    })

    describe('New issue', () => {
        it('New issue should be appear after creation', async () => {
            await newIssuePage.open(userModel.login)
            await newIssuePage.setIssueTitle(issueModel.title)
            await newIssuePage.saveNewIssue()

            expect(await changeIssuePage.getIssueTitleText()).toEqual(issueModel.title)
        })

        afterEach(async () => {
            await changeIssuePage.deleteIssue()
            await changeIssuePage.deleteIssueVerify()
        })
    })

    describe('Issue', () => {
        beforeEach(async () => {           
            const response: AxiosResponse<CreateIssueResponse> = await IssueAPIService.createIssue(
                userModel.login,
                REPO,
                issueModel,
            )

            await changeIssuePage.open(response.data.html_url)
        })

        it('Issue should disappear after it deletion', async () => {
            await changeIssuePage.deleteIssue()
            await changeIssuePage.deleteIssueVerify()
            await issuesListPage.setSearchIssueValue(issueModel.title)
            await browser.pause(2000)
            browser.keys('Enter')
            await browser.pause(2000)

            expect(await issuesListPage.isIssueSerchResultBlank()).toEqual(true)
        })

        describe('Change issue', () => {
            it('Issue title should be changed after change title', async () => {
                issueModel.title = `Issue title - ${getRandomString(5)} - ${getTimeStamp()}`

                await changeIssuePage.editIssue()
                await changeIssuePage.clearIssueTitle()
                await changeIssuePage.setIssueTitle(issueModel.title)
                await changeIssuePage.saveIssueChanges()
                await browser.pause(1000)

                expect(await changeIssuePage.getIssueTitleText()).toEqual(issueModel.title)
            })

            it('Issue comment should be displayed after it added', async () => {
                await changeIssuePage.setIssueComment(issueModel.comment)
                await changeIssuePage.saveIssueComment()

                expect(await changeIssuePage.getIssueCommentFildText()).toEqual(issueModel.comment)
            })

            it('Comment should disappear after deletion', async () => {
                await changeIssuePage.setIssueComment(issueModel.comment)
                await changeIssuePage.saveIssueComment()
                await changeIssuePage.openCommentOptions()
                await changeIssuePage.deleteComment()
                await browser.pause(1000)

                expect(await changeIssuePage.isCommentFieldExist()).toEqual(false)
            })

            it('Valid file should be displayed after it attach', async () => {
                await changeIssuePage.uploadFile(issueModel.attach)
                await browser.pause(5000)
                await changeIssuePage.saveIssueComment()
                await browser.pause(1000)

                expect(await changeIssuePage.getIssueCommentFildText()).toEqual(fileName)
            })

            it('Swagger file should not be displayed after it attach', async () => {
                await changeIssuePage.uploadFile(invalidFile)
                await browser.pause(1000)
                await changeIssuePage.saveIssueComment()

                expect(await changeIssuePage.isCommentFieldExist()).toEqual(false)
            })

            it('Create issue should be found after search', async () => {
                await issuesListPage.open()
                await issuesListPage.setSearchIssueValue(issueModel.title)
                browser.keys('Enter')
                await browser.pause(2000)

                expect(await issuesListPage.getFoundIssueTitleText()).toEqual(issueModel.title)
            })

            afterEach(async () => {
                await issuesListPage.open()
                await issuesListPage.openFoundIssue()
                await changeIssuePage.deleteIssue()
                await changeIssuePage.deleteIssueVerify()
            })
        })
    })
})