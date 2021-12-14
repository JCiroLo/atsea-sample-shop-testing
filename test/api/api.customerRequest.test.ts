import { get, post, put, del } from 'superagent'
import { StatusCodes } from 'http-status-codes'
import { expect } from 'chai'
export const API_URL = 'http://3.15.27.119:8080'

let response = null

const randomString = new Date().getTime().toString()

const user = {
  address: '144 Townsend Street',
  email: 'test@gmail.com',
  name: 'Jess',
  password: randomString,
  phone: '9999999999',
  username: randomString,
  customerId: 0,
  enabled: 'true',
  role: 'user'
}

const userToUpdate = {
  address: '144 Townsend Street',
  email: 'test123@gmail.com', // Changes in here
  name: 'Jessie', // Changes in here
  password: randomString,
  phone: '9999999999',
  username: randomString,
  customerId: 0,
  enabled: 'true',
  role: 'user'
}

let userResponseId = null

describe('User Request: Customer Request from API', () => {
  // Create customer Endpoint
  describe('User Request: Register user', () => {
    before(async () => {
      response = await post(`${API_URL}/api/customer/`)
        .set('User-Agent', 'agent')
        .accept('application/json')
        .send(user)
      userResponseId = response.body.customerId
    })
    it("User Request: The customer's being created", () => {
      expect(response.status).to.equal(StatusCodes.CREATED)
    })
  })
  // Get customer by id endpoint
  describe('User Request: Get customer', () => {
    before(async () => {
      response = await get(`${API_URL}/api/customer/${userResponseId}`).set(
        'User-Agent',
        'agent'
      )
    })
    it("User Request: The customer's being obtained", () => {
      expect(response.status).to.equal(StatusCodes.OK)
      expect(response.body.email).to.equal(user.email)
      expect(response.body.username).to.equal(user.username)
      expect(response.body.customerIf).to.equal(userResponseId) // PUEDE QUE HAYA ERROR
    })
  })
  // Update customer endpoint
  describe('User Request: Register user with existing email', () => {
    before(async () => {
      response = await put(`${API_URL}/api/customer/${userResponseId}`)
        .set('User-Agent', 'agent')
        .accept('application/json')
        .send(userToUpdate)
    })
    it("User Request: The customer's not being created", () => {
      expect(response.status).to.equal(StatusCodes.OK)
    })
  })
  // Delete customer ednpoint
  describe('User Request: Delete a customer', () => {
    before(async () => {
      response = await del(`${API_URL}/api/customer/${userResponseId}`)
    })
    it("User Request: The customer's being deleted", () => {
      expect(response.status).to.equal(StatusCodes.NO_CONTENT)
    })
  })
  // Delete all customers ednpoint
  describe('User Request: Delete all customers', () => {
    before(async () => {
      response = await del(`${API_URL}/api/customer/`)
    })
    it('User Request: All the customer are being deleted', () => {
      expect(response.status).to.equal(StatusCodes.NO_CONTENT)
    })
  })
})
