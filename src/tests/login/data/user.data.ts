import { getRandomString, getTimeStamp } from '../../random.data'

type UserData = {
    login: string,
    email: string,
    password: string,
    name?: string,
    bio?: string,
    pronounce?: string,
    avatar?: string
}

const user: UserData = {
    login: 'Dinara123456',
    email: 'dinara.gaysina@ispring.com',
    password: 'Masterlovemargo',
    name: `Name - ${getRandomString(5)} - ${getTimeStamp()}`,
    bio: `Bio - ${getRandomString(20)} - ${getTimeStamp()}`,
    pronounce: 'she/her',
    avatar: 'src/tests/profile-settings/data/files/itsme.png'
}

const emptyUser: UserData = {
    login: 'Dinara123456',
    email: '',
    password: 'Masterlovemargo',
    name: '',
    bio: '',
    pronounce: 'she/her',
    avatar: 'src/tests/profile-settings/data/files/itsme.png'
}

export {
    user,
    emptyUser,
    UserData,
}
