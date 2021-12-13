import { browser } from 'protractor'
import { expect } from 'chai'
import { HomeNotLoggedPage, CheckoutErrorPage } from '../../src/page'

const APP_URL = 'http://localhost:8080'

const creditCardInfo = {
  fName: 'Jesus',
  Lname: 'Meneses',
  CN: '1234567812345678',
  CVV: '123',
  ED: '05/25'
}

const billingInfo = {
  Comp: 'Company',
  Title: 'Titulo',
  Address: 'Cll 23 #12-43',
  City: 'Medellín'
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
    it('Open checkout page', async () => {
      await homeNotLoggedPage.clickCheckout()
    })
  })

  describe('Create user modal', () => {
    const checkoutErrorPage: CheckoutErrorPage = new CheckoutErrorPage()
    it('Fill form', async () => {
      await checkoutErrorPage.fillCreditCardInformation(
        creditCardInfo,
        billingInfo
      )
    })
    it('Create user', async () => {
      await checkoutErrorPage.clickCompleteOrder()
    })
    it('Create user', async () => {
      const feedback = await checkoutErrorPage.getFeedbackText()
      expect(feedback).to.equal('Please add to cart first...')
    })
  })
})
