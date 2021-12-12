import { $, ElementFinder, browser } from 'protractor'

export default class HomeNotLoggedPage {
  private createUserBtn: ElementFinder

  constructor () {
    this.createUserBtn = $(
      '#root > div > div:nth-child(2) > div > div.navUser > div.buttonSection > div > button:nth-child(1)'
    )
  }
  public async clickCreateUser () {
    browser.sleep(3000)
    await this.createUserBtn.click()
    browser.sleep(3000)
  }
}
