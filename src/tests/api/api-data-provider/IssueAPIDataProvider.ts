import { IssueModel } from '../../issue/model/issue.model';

type CreateIssueRequest = {
    title: string | number,
}

class IssueAPIDataProvider {
    public static getCreateIssueData(issue: IssueModel): CreateIssueRequest {
        return {
            title: issue.title
        }
    }
}

export {
    CreateIssueRequest,
    IssueAPIDataProvider
}