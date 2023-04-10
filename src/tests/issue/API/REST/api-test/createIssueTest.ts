import { IssueModel } from '../../../model/issue.model'
import { createIssueModel } from '../../../model/issue.model'
import { IssueAPIProvider } from '../../../../api/api-provider/IssueAPIProvider'
import { LOGIN, PRIVATEREPO, REPO, } from '../../../../login/data/credentials'
import { EMPTYVALUE, NOEXISTINGREPO } from '../../../../login/data/invalidUser.data'
import { AxiosResponse } from 'axios'
import { CreateIssueResponse, GetRepoIssueResponse, IssueAPIService } from '../../../../api/api-service/IssueAPIService'
import { issue } from '../../../data/issue.data'

const fetch = require('node-fetch')

describe('POST /repos/{owner}/{repo}/issues', () => {
    let issueModel: IssueModel

    beforeEach(async () => {
        issueModel = createIssueModel(issue())
    })

    it.only('issue should be created with response 201', async () => {
        const issueAPIProvider: IssueAPIProvider = new IssueAPIProvider(false)
        const response: AxiosResponse<CreateIssueResponse> = await issueAPIProvider.create(
            LOGIN,
            REPO,
            {
                title: issueModel.title
            },
        )

        expect(response.status).toEqual(201)
        expect(response.data.title).toEqual(issueModel.title)
        expect(response.data.state).toEqual('open')

        const responseUrl: Response = await fetch(response.data.html_url)

        expect(responseUrl.status).toEqual(200)

        const getIssuesResponse: AxiosResponse<GetRepoIssueResponse[]> = await IssueAPIService.getRepoIssues(
            LOGIN,
            REPO
        )

        expect(getIssuesResponse.data.some((issueResponse: GetRepoIssueResponse) => issueModel.title === issueResponse.title)).toEqual(true)
    })

    it('issue should not be created with status 410', async () => {
        const issueAPIProvider: IssueAPIProvider = new IssueAPIProvider(false)
        const response: AxiosResponse<CreateIssueResponse> = await issueAPIProvider.create(
            LOGIN,
            PRIVATEREPO,
            {
                title: issueModel.title
            },
        )

        expect(response.status).toEqual(410)
    })

    it('issue should not be created with status 404', async () => {
        const issueAPIProvider: IssueAPIProvider = new IssueAPIProvider(false)
        const response: AxiosResponse<CreateIssueResponse> = await issueAPIProvider.create(
            LOGIN,
            NOEXISTINGREPO,
            {
                title: issueModel.title
            },
        )

        expect(response.status).toEqual(404)
    })

    it('issue should not be created with status 422', async () => {
        const issueAPIProvider: IssueAPIProvider = new IssueAPIProvider(false)
        const response: AxiosResponse<CreateIssueResponse> = await issueAPIProvider.create(
            LOGIN,
            REPO,
            {
                title: EMPTYVALUE
            },
        )

        expect(response.status).toEqual(422)
    })
})