import { AxiosResponse } from 'axios'
import { IssueModel } from '../../issue/model/issue.model'
import { CreateIssueRequest, IssueAPIDataProvider } from '../api-data-provider/IssueAPIDataProvider'
import { IssueAPIProvider } from '../api-provider/IssueAPIProvider'

type CreateIssueResponse = {
    id: string,
    title: string,
    state: string,
    html_url: string,
}

type GetRepoIssueResponse = {
    title: string
}

class IssueAPIService {
    public static async createIssue(
        owner: string,
        repo: string,
        issue: IssueModel,
    ): Promise<AxiosResponse<CreateIssueResponse>> {
        try {
            const data: CreateIssueRequest = IssueAPIDataProvider.getCreateIssueData(issue)
            const issueAPIProvider: IssueAPIProvider = new IssueAPIProvider()
            const response: AxiosResponse<CreateIssueResponse> 
                = await issueAPIProvider.create(owner, repo, data)
            return response         
        } catch (error) {
            throw new Error(`Create issue by model failed ${error}`)
        }       
    }

    public static async getRepoIssues(
        owner: string,
        repo: string,
    ): Promise<AxiosResponse<GetRepoIssueResponse[]>> {
        try {
            const issueAPIProvider: IssueAPIProvider = new IssueAPIProvider()
            const response: AxiosResponse<GetRepoIssueResponse[]> 
                = await issueAPIProvider.getIssues(owner, repo)
            return response         
        } catch (error) {
            throw new Error(`Get Repo issues failed ${error}`)
        }       
    }
}

export {
    CreateIssueResponse,
    GetRepoIssueResponse,
    IssueAPIService
}