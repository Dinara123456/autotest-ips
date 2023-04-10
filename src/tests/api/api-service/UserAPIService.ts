import { AxiosResponse } from 'axios'
import { UserModel } from '../../login/model/user.model'
import { UpdateUserRequest, UserAPIDataProvider } from '../api-data-provider/UserAPIDataProvider'
import { UserAPIProvider } from '../api-provider/UserAPIProvider'

type UpdateUserResponse = {
    name: string,
    bio: string
}

class UserAPIService {
    public static async updateAuthenticatedUser(
        user: UserModel,
    ): Promise<AxiosResponse<UpdateUserResponse>> {
        try {
            const data: UpdateUserRequest = UserAPIDataProvider.getUpdatedUserData(user)
            const userApiProvider: UserAPIProvider = new UserAPIProvider()
            const response: AxiosResponse<UpdateUserResponse> 
                = await userApiProvider.updateAuthenticatedUser(data)
            return response
        } catch (error) {
            throw new Error(`Update user by model failed ${error}`)
        }
    }
}

export {
    UserAPIService
}