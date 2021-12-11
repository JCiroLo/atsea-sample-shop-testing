import { get, post, del } from 'superagent'
import { StatusCodes } from 'http-status-codes'
import { expect } from 'chai'
// import describers from '../describers.json'

const host = process.env.HOST_URL
let response = null
let customer = { customerId: '', name: '', email: '', phone: '' }

const register = {
  customerId: 3827,
  name: 'Will Smith',
  address: 'California bellair LA',
  email: 'willEsMid@gmail.com',
  phone: '+1 787 237 09 21',
  username: 'WSMth',
  password: 'qwerty',
  enabled: 'true',
  role: 'USER'
}

describe('Customer Request: Atsea User Request from API', () => {
  describe('Customer Request: Register customer', () => {
    before(async () => {
      response = await post(`${host}/api/customer/`)
        .set('User-Agent', 'agent')
        .set('Content-Type', 'application/json')
        .send(register)
      const { customerId, name, email, phone } = response.body
      customer = { customerId, name, email, phone }
    })
    it("Customer Request: The customer's being created", () => {
      expect(response.status).to.equal(StatusCodes.CREATED)
    })
  })
  describe('Customer Request: Get customer', () => {
    before(async () => {
      response = await get(`${host}/api/customer/${customer.customerId}`).set(
        'User-Agent',
        'agent'
      )
    })

    it("Customer Request: The customer's being obtained", () => {
      expect(response.status).to.equal(StatusCodes.OK)
      expect(response.body.email).to.equal('willEsMid@gmail.com')
      expect(response.body.username).to.equal('WSMth')
      expect(response.body.phone).to.equal('+1 787 237 09 21')
      expect(response.body.customerIf).to.equal(customer.customerId) // PUEDE QUE HAYA ERROR
    })
  })

  describe('Customer Request: Delete customer', () => {
    before(async () => {
      response = await del(`${host}/api/customer/${customer.customerId}`)
    })
    it("Customer Request: The customer's being deleted", () => {
      expect(response.status).to.equal(StatusCodes.NO_CONTENT)
    })
  })
})
