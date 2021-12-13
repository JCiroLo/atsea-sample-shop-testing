import { $, ElementFinder, browser } from 'protractor'

export default class CheckoutErrorPage {
  private firstNameInput: ElementFinder
  private lastNameInput: ElementFinder
  private cardNumberInput: ElementFinder
  private CVVInput: ElementFinder
  private expireDateInput: ElementFinder

  private companyInput: ElementFinder
  private titleInput: ElementFinder
  private adressInput: ElementFinder
  private cityInput: ElementFinder

  private completeOrderBtn: ElementFinder
  private errorFeedbackText: ElementFinder

  constructor () {
    this.firstNameInput = $(
      '#root > div > div > div.panel > div.formSection > div > form > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div > input[type=text]'
    )
    this.lastNameInput = $(
      '#root > div > div > div.panel > div.formSection > div > form > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div > input[type=text]'
    )
    this.cardNumberInput = $(
      '#root > div > div > div.panel > div.formSection > div > form > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div > input[type=text]'
    )
    this.CVVInput = $(
      '#root > div > div > div.panel > div.formSection > div > form > div:nth-child(1) > div:nth-child(3) > div:nth-child(2) > div > input[type=text]'
    )
    this.expireDateInput = $(
      '#root > div > div > div.panel > div.formSection > div > form > div:nth-child(1) > div:nth-child(4) > div > div > input[type=text]'
    )
    this.companyInput = $(
      '#root > div > div > div.panel > div.formSection > div > form > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div > input[type=text]'
    )
    this.titleInput = $(
      '#root > div > div > div.panel > div.formSection > div > form > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div > input[type=text]'
    )
    this.adressInput = $(
      '#root > div > div > div.panel > div.formSection > div > form > div:nth-child(2) > div:nth-child(3) > div:nth-child(1) > div > input[type=text]'
    )
    this.cityInput = $(
      '#root > div > div > div.panel > div.formSection > div > form > div:nth-child(2) > div:nth-child(3) > div:nth-child(2) > div > input[type=text]'
    )
    this.completeOrderBtn = $(
      '#root > div > div > div.panel > div.formSection > div > form > div.infoButton > button'
    )
    this.errorFeedbackText = $(
      '#root > div > div > div.panel > div.formSection > div > form > span'
    )
  }

  public async fillCreditCardInformation (CreditCardInfo, BillinInfo) {
    // First Name, Last Name, Card Number, CVV, Expiration Date
    const { fName, Lname, CN, CVV, ED } = CreditCardInfo
    // Company, Title, Adress, City
    const { Comp, Title, Address, City } = BillinInfo

    browser.sleep(3000)
    await this.firstNameInput.sendKeys(fName)
    browser.sleep(3000)
    await this.lastNameInput.sendKeys(Lname)
    browser.sleep(3000)
    await this.cardNumberInput.sendKeys(CN)
    browser.sleep(3000)
    await this.CVVInput.sendKeys(CVV)
    browser.sleep(3000)
    await this.expireDateInput.sendKeys(ED)

    browser.sleep(3000)
    await this.companyInput.sendKeys(Comp)
    browser.sleep(3000)
    await this.titleInput.sendKeys(Title)
    browser.sleep(3000)
    await this.adressInput.sendKeys(Address)
    browser.sleep(3000)
    await this.cityInput.sendKeys(City)
  }

  public async clickCompleteOrder () {
    browser.sleep(3000)
    await this.completeOrderBtn.click()
  }

  public async getFeedbackText () {
    browser.sleep(3000)
    return await this.errorFeedbackText.getText()
  }
}
