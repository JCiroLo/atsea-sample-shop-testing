import { browser } from 'protractor'
import { expect } from 'chai'
import {
  HomeNotLoggedPage,
  CreateUserPage,
  CreateUserSuccessPage,
  HomeLoggedPage
} from '../../src/page'
import { generateRandomID } from '../utils/utils'

const APP_URL = 'http://3.15.27.119:8080'

const randomID = generateRandomID()
const userData = {
  username: randomID,
  password: 'a'
}

describe('Create User Process: Create existing user process', () => {
  describe('Create User Process: Enter website', () => {
    beforeEach(async () => {
      await browser.get(APP_URL)
      await browser.sleep(10000)
    })

    it('Create User Process: The website title is beign checked', async () => {
      await browser.sleep(10000)
      const title = await browser.getTitle()
      expect(title).to.equal('Atsea Shop Test 5')
    })
  })
  describe('Create User Process: Home interface', () => {
    const homeNotLoggedPage: HomeNotLoggedPage = new HomeNotLoggedPage()
    it('Create User Process: Open create user modal', async () => {
      await homeNotLoggedPage.clickCreateUser()
    })
  })
  describe('Create User Process: Create user modal interface', () => {
    const createUserPage: CreateUserPage = new CreateUserPage(false)
    it('Create User Process: Fill create user form', async () => {
      await createUserPage.fillCreateUserIDForm(
        userData.username,
        userData.password
      )
    })
    it('Create User Process: Click create user button', async () => {
      await createUserPage.clickSignUp()
    })
  })
  describe('Create User Process: Create user modal success interface', () => {
    const createUserSuccessPage: CreateUserSuccessPage = new CreateUserSuccessPage()
    it('Create User Process: Close create user modal', async () => {
      await createUserSuccessPage.clickContineShopping()
    })
  })
  describe('Create User Process: Home interface with auth session', () => {
    const homeLoggedPage: HomeLoggedPage = new HomeLoggedPage()
    it('Create User Process: Logout session', async () => {
      await homeLoggedPage.clickSignOut()
    })
  })
  describe('Create User Process: Home interface without session', () => {
    const homeNotLoggedPage: HomeNotLoggedPage = new HomeNotLoggedPage()
    it('Create User Process: Open create user modal', async () => {
      await homeNotLoggedPage.clickCreateUser()
    })
  })
  describe('Create User Process: Create user modal interface', () => {
    const createUserPage: CreateUserPage = new CreateUserPage(true)
    it('Create User Process: Fill create user form', async () => {
      await createUserPage.fillCreateUserIDForm(
        userData.username,
        userData.password
      )
    })
    it('Create User Process: Click create user button', async () => {
      await createUserPage.clickSignUp()
    })
    it('Create User Process: Validate if user already exists', async () => {
      const feedback = await createUserPage.getFeedbackText()
      expect(feedback).to.equal('Username already exists')
    })
  })
})
