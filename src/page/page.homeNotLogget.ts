import { $, ElementFinder, browser } from 'protractor'

export default class HomeNotLoggedPage {
  private createUserBtn: ElementFinder
  private checkoutBtn: ElementFinder

  constructor () {
    this.createUserBtn = $(
      '#root > div > div:nth-child(2) > div > div.navUser > div.buttonSection > div > button:nth-child(1)'
    )
    this.checkoutBtn = $(
      '#root > div > div:nth-child(4) > div > div.checkout-button > a'
    )
  }
  public async clickCreateUser () {
    browser.sleep(3000)
    await this.createUserBtn.click()
    browser.sleep(3000)
  }

  public async clickCheckout () {
    browser.sleep(3000)
    await this.checkoutBtn.click()
    browser.sleep(3000)
  }
}
