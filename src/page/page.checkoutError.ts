import { $, ElementFinder, browser } from 'protractor'
export default class CheckoutErrorPage {
  private firstNameInput: ElementFinder
  private lastNameInput: ElementFinder
  private cardNumberInput: ElementFinder
  private CVVInput: ElementFinder
  private expireDateInput: ElementFinder

  private companyInput: ElementFinder
  private titleInput: ElementFinder
  private addressInput: ElementFinder
  private cityInput: ElementFinder

  private completeOrderBtn: ElementFinder
  private errorFeedbackText: ElementFinder

  constructor() {
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
    this.addressInput = $(
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

  public async fillFirstNameInput(firstName) {
    browser.sleep(10000)
    await this.firstNameInput.click();
    await this.firstNameInput.sendKeys(firstName);
  }

  public async fillLastNameInput(lastName) {
    browser.sleep(10000)
    await this.lastNameInput.click();
    await this.lastNameInput.sendKeys(lastName);
  }

  public async fillCardNumberInput(cardNumber) {
    browser.sleep(10000)
    await this.cardNumberInput.click();
    await this.cardNumberInput.sendKeys(cardNumber);
  }

  public async fillCVVInput(cvv) {
    browser.sleep(10000)
    await this.CVVInput.click();
    await this.CVVInput.sendKeys(cvv);
  }

  public async fillExpireDateInput(expirationDate) {
    browser.sleep(10000)
    await this.expireDateInput.click();
    await this.expireDateInput.sendKeys(expirationDate);
  }

  public async fillCompanyInput(company) {
    browser.sleep(10000)
    await this.companyInput.click();
    await this.companyInput.sendKeys(company);
  }

  public async fillTitleInput(title) {
    browser.sleep(10000)
    await this.titleInput.click();
    await this.titleInput.sendKeys(title);
  }

  public async fillAddressInput(address) {
    browser.sleep(10000)
    await this.addressInput.click();
    await this.addressInput.sendKeys(address);
  }

  public async fillCityInput(city) {
    browser.sleep(10000)
    await this.cityInput.click();
    await this.cityInput.sendKeys(city);
  }

  public async clickCompleteOrder() {
    browser.sleep(10000)
    await this.completeOrderBtn.click()
  }

  public async getFeedbackText() {
    browser.sleep(10000)
    return await this.errorFeedbackText.getText()
  }
}
