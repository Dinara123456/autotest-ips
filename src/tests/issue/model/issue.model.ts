import { IssueData, issue } from '../data/issue.data';

type IssueModel = {
    title: string,
    comment: string,
    attach: string,
    
}

function createIssueModel(data: IssueData): IssueData {
    return {
        title: data.title,
        comment: data.comment,
        attach: data.attach
    } 
}

export {
    IssueModel,
    createIssueModel
}