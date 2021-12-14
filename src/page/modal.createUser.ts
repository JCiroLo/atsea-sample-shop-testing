import { $, ElementFinder, browser } from 'protractor'

export default class CreateUserPage {
  private chooseUserIdInput: ElementFinder
  private choosePasswordInput: ElementFinder
  private signUpBtn: ElementFinder
  private feedbackRegistryText: ElementFinder

  constructor (userExists: Boolean) {
    this.chooseUserIdInput = $(
      'body > div:nth-child(6) > div > div > div > div > form > div:nth-child(1) > div.createFormRow > div:nth-child(1) > div > input[type=text]'
    )
    this.choosePasswordInput = $(
      'body > div:nth-child(6) > div > div > div > div > form > div:nth-child(1) > div.createFormRow > div:nth-child(2) > div > input[type=password]'
    )
    this.signUpBtn = $(
      'body > div:nth-child(6) > div > div > div > div > form > div.createFormButton > button'
    )
    if (userExists) {
      this.feedbackRegistryText = $(
        'body > div:nth-child(6) > div > div > div > div > form > div:nth-child(1) > div.createFormRow > div:nth-child(1) > div > div:nth-child(4)'
      )
    }
  }

  public async fillCreateUserIDForm (userID, password): Promise<void> {
    browser.sleep(50000)
    await this.chooseUserIdInput.sendKeys('1')
    browser.sleep(50000)
    await this.choosePasswordInput.sendKeys(password)
    browser.sleep(50000)
    await this.chooseUserIdInput.sendKeys(userID)

  }

  public async clickSignUp () {
    browser.sleep(50000)
    await this.signUpBtn.click()
    browser.sleep(50000)
  }

  public async getFeedbackText () {
    browser.sleep(50000)
    return await this.feedbackRegistryText.getText()
  }
}
