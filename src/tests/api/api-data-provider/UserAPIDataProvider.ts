import {  UserModel } from '../../login/model/user.model'

type UpdateUserRequest = {
    name?: string,
    bio?: string,
    email?: string,
}

class UserAPIDataProvider {
    public static getUpdatedUserData(user: UserModel): UpdateUserRequest {
        return {
            name: user.name,
            bio: user.bio,
            email: user.email
        }
    }
}

export {
    UpdateUserRequest,
    UserAPIDataProvider
}