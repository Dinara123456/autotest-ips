import { MainPage } from "../page-object/Main.page"
import { LoginPage } from "../page-object/Login.page"
import { UserModel, createUserModel } from "../model/user.model"
import { user, } from "../data/user.data"
import { PASSWORD, LOGIN } from "../data/credentials"
import { invalidLogins, invalidPassword } from "../data/invalidUser.data"

describe('Login form', () => {
    let loginPage: LoginPage
    let mainPage: MainPage
    const userModel: UserModel = createUserModel(user)

    before(async () => {
        loginPage = new LoginPage(browser)
        mainPage = new MainPage(browser)
    })

    beforeEach(async () => {
        await loginPage.open()
    })

    it('user should be log in with login', async () => {
        await loginPage.login(userModel)
        await mainPage.openUserMenu()

        expect(await mainPage.getUserLoginText()).toEqual(userModel.login)
    })

    it('user should be log in with email', async () => {
        await loginPage.setPassword(userModel.password)
        await loginPage.setLogin(userModel.email)
        await loginPage.submitForm()
        await mainPage.openUserMenu()

        expect(await mainPage.getUserLoginText()).toEqual(userModel.login)
    })

    invalidLogins.forEach(login =>
        it(`user should not be log in with invalid login  = '${login}'`, async () => {
            await loginPage.setLogin(login)
            await loginPage.setPassword(PASSWORD)
            await loginPage.submitForm()

            expect(await loginPage.isDisplayedErrorMessage()).toEqual(true)
        })
    )

    it('user should not be log in with invalid password ', async () => {
        await loginPage.setPassword(invalidPassword)
        await loginPage.setLogin(LOGIN)
        await loginPage.submitForm()

        expect(await loginPage.isDisplayedErrorMessage()).toEqual(true)
    })

    afterEach(async () => {
        await browser.reloadSession()
    })
})
