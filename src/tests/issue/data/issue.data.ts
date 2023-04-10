import { getRandomString, getTimeStamp } from '../../random.data'

const issueTitle2 = 'Title2'
const fileName = 'attach.xlsx'
const invalidFile = 'src/tests/issue/data/api.swagger.json'
const nameForDelete = 'DeleteIssue'
const nameForSearch = 'SearchIssue'

type IssueData = {
    title: string,
    comment: string,
    attach: string
}

const issue: Function = () => {
    return {
        title: `Issue title - ${getRandomString(5)} - ${getTimeStamp()}`,
        comment: `Issue Comment - ${getRandomString(10)} - ${getTimeStamp()}`,
        attach: 'src/tests/issue/data/attach.xlsx'
    }
}

export {
    IssueData,
    issue,
    issueTitle2,
    fileName,
    invalidFile,
    nameForDelete,
    nameForSearch
}