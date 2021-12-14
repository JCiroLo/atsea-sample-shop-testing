import { $, ElementFinder, browser } from 'protractor'

export default class CreateUserSuccessPage {
  private continueShoppingBtn: ElementFinder

  constructor () {
    this.continueShoppingBtn = $(
      '.successButton > button'
    )
  }

  public async clickContineShopping () {
    browser.sleep(50000)
    await this.continueShoppingBtn.click()
    browser.sleep(50000)
  }
}
