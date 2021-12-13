import { browser } from 'protractor'
import { expect } from 'chai'
import {
  HomeNotLoggedPage,
  CreateUserPage,
  CreateUserSuccessPage,
  HomeLoggedPage
} from '../../src/page'
import { generateRandomID } from '../utils/utils'

const APP_URL = 'http://localhost:8080'

const randomID = generateRandomID()
const userData = {
  username: randomID,
  password: randomID
}

describe('Test site', () => {
  describe('Enter website', () => {
    beforeEach(async () => {
      await browser.get(APP_URL)
      await browser.sleep(3000)
    })

    it('Title', async () => {
      await browser.sleep(3000)
      const title = await browser.getTitle()
      expect(title).to.equal('Atsea Shop')
    })
  })
  describe('Create user', () => {
    const homeNotLoggedPage: HomeNotLoggedPage = new HomeNotLoggedPage()
    it('Open modal', async () => {
      await homeNotLoggedPage.clickCreateUser()
    })
  })
  describe('Create user modal', () => {
    const createUserPage: CreateUserPage = new CreateUserPage(false)
    it('Fill form', async () => {
      await createUserPage.fillCreateUserIDForm(
        userData.username,
        userData.password
      )
    })
    it('Create user', async () => {
      await createUserPage.clickSignUp()
    })
  })
  describe('Success create user modal', () => {
    const createUserSuccessPage: CreateUserSuccessPage = new CreateUserSuccessPage()
    it('Close modal', async () => {
      await createUserSuccessPage.clickContineShopping()
    })
  })
  describe('Home with user', () => {
    const homeLoggedPage: HomeLoggedPage = new HomeLoggedPage()
    it('Logout', async () => {
      await homeLoggedPage.clickSignOut()
    })
  })
  describe('Create user', () => {
    const homeNotLoggedPage: HomeNotLoggedPage = new HomeNotLoggedPage()
    it('Open modal', async () => {
      await homeNotLoggedPage.clickCreateUser()
    })
  })
  describe('Create user modal', () => {
    const createUserPage: CreateUserPage = new CreateUserPage(true)
    it('Fill form', async () => {
      await createUserPage.fillCreateUserIDForm(
        userData.username,
        userData.password
      )
    })
    it('Create user', async () => {
      await createUserPage.clickSignUp()
    })
    it('Create user', async () => {
      const feedback = await createUserPage.getFeedbackText()
      expect(feedback).to.equal('Username already exists')
    })
  })
})
