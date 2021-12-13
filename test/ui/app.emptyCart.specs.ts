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

describe('Empty shopping cart Process: Pay order with empty shopping cart process', () => {
  describe('Empty shopping cart Process: Enter website', () => {
    beforeEach(async () => {
      await browser.get(APP_URL)
      await browser.sleep(3000)
    })

    it('Empty shopping cart Process: The website title is beign checked', async () => {
      await browser.sleep(3000)
      const title = await browser.getTitle()
      expect(title).to.equal('Atsea Shop')
    })
  })

  describe('Empty shopping cart Process: Home interface', () => {
    const homeNotLoggedPage: HomeNotLoggedPage = new HomeNotLoggedPage()
    it('Empty shopping cart Process: Open checkout inerface', async () => {
      await homeNotLoggedPage.clickCheckout()
    })
  })

  describe('Empty shopping cart Process: Checkout interface', () => {
    const checkoutErrorPage: CheckoutErrorPage = new CheckoutErrorPage()
    it('Empty shopping cart Process: Fill credit card and billing information form', async () => {
      await checkoutErrorPage.fillCreditCardInformation(
        creditCardInfo,
        billingInfo
      )
    })
    it('Empty shopping cart Process: Click complete order button', async () => {
      await checkoutErrorPage.clickCompleteOrder()
    })
    it('Empty shopping cart Process: Validate if shopping card is empty', async () => {
      const feedback = await checkoutErrorPage.getFeedbackText()
      expect(feedback).to.equal('Please add to cart first...')
    })
  })
})
