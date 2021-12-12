import { $, ElementFinder, browser } from 'protractor'

export default class HomeLoggedPage {
  private signOutBtn: ElementFinder

  constructor () {
    this.signOutBtn = $(
      '#root > div > div:nth-child(2) > div > div.navUser > div.buttonSection > div > button'
    )
  }
  public async clickSignOut () {
    browser.sleep(3000)
    await this.signOutBtn.click()
  }
}
