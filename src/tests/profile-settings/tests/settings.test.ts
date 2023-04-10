import { LoginPage } from "../../login/page-object/Login.page"
import { SettingsPage } from "../page-object/Settings.page"
import { invalidUserName } from '../../login/data/invalidUser.data'
import { UserModel, createUserModel  } from "../../login/model/user.model"
import { emptyUser, user } from "../../login/data/user.data"
import { UserAPIService } from '../../api/api-service/UserAPIService'

describe('Profile.', () => {
    let loginPage: LoginPage
    let settingsPage: SettingsPage
    const userModel: UserModel = createUserModel(user)
    const emptyUserModel: UserModel = createUserModel(emptyUser)

    before(async () => {
        loginPage = new LoginPage(browser)
        settingsPage = new SettingsPage(browser)
        await loginPage.open()
        await loginPage.login(userModel)
        await UserAPIService.updateAuthenticatedUser(emptyUserModel)
        await settingsPage.open()

    })

    describe('Name.', () => {
        it(`Name should be changed after set "${userModel.name}" value`, async () => {
            await settingsPage.setUserName(userModel.name!)
            await settingsPage.saveSettings()

            expect(await settingsPage.getUserProfileNameText()).toEqual(userModel.name)
        })

        it('Error should be displayed after set value > 255 symbols', async () => {
            await settingsPage.setUserName(invalidUserName)
            await settingsPage.saveSettings()

            expect(await settingsPage.isErrorMessageDisplayed()).toEqual(true)
        })
    })

    describe('Bio.', () => {
        it(`Bio should be changed after set "${userModel.bio}" value`, async () => {
            await settingsPage.setUserBio(userModel.bio!)
            await settingsPage.saveSettings()

            expect(await settingsPage.getUserProfileBioText()).toEqual(userModel.bio)
        })
    })

    describe('User email.', () => {
        it('User email option should be changed after selecting an item from dropdown list', async () => {
            await settingsPage.setUserEmail(userModel.email)
            await settingsPage.saveSettings()

            expect(await settingsPage.isUserEmailDisplayed(userModel.email)).toEqual(true)
        })
    })

    describe('User pronounce.', () => {
        it('User pronounce should be changed after selecting an item from dropdown list', async () => {
            await settingsPage.setUserPronounce(userModel.pronounce!)
            await settingsPage.saveSettings()

            expect(await settingsPage.isUserPronounceSelected(userModel.pronounce!)).toEqual(true)
        })

        after(async () => {
            await settingsPage.setUserPronounceDefault()
            await settingsPage.saveSettings()
        })
    })

    describe('User profile photo.', () => {
        it('User profile photo should be changes after uploading image', async () => {
            await settingsPage.uploadFile(userModel.avatar!)
            await settingsPage.waitUploadFileBox()
            await settingsPage.saveUploadFile()

            expect(await settingsPage.isChangeUserProfilePhotoSuccessMessageDisplayed()).toEqual(true)
        })
    })

    after(async () => {
        await UserAPIService.updateAuthenticatedUser(emptyUserModel)
    })
})