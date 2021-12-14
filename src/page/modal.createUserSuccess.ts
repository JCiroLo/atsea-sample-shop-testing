import { $, ElementFinder, browser } from 'protractor'

export default class CreateUserSuccessPage {
  private continueShoppingBtn: ElementFinder

  constructor () {
    this.continueShoppingBtn = $(
      'body > div:nth-child(6) > div > div > div > div > div.successButton > button'
    )
  }

  public async clickContineShopping () {
    browser.sleep(10000)
    await this.continueShoppingBtn.click()
    browser.sleep(10000)
  }
}
