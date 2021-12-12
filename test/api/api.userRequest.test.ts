import { get, post } from 'superagent'
import { StatusCodes } from 'http-status-codes'
import { expect } from 'chai'
// import describers from '../describers.json'

const API_URL = process.env.HOST_URL
const API_ENDPOINT = 'api/customer'
let response = null

const user1 = {
  address: 'California bellair LA',
  email: 'willEsMid@gmail.com',
  name: 'Will Smith',
  password: 'password',
  phone: '+1 7872370921',
  username: 'WSMth',
  customerId: 3827,
  enabled: 'true',
  role: 'user'
}

const user2 = {
  address: 'California bellair LA',
  email: 'willEsMid@gmail.com',
  name: 'Will Smith Official',
  password: 'password',
  phone: '+1 7872370921',
  username: 'WSMthOfficial',
  customerId: 4829,
  enabled: 'true',
  role: 'user'
}

describe('User Request: User Request from API', () => {
  describe('User Request: Register user', () => {
    before(async () => {
      response = await post(`${API_URL}/${API_ENDPOINT}/`)
        .set('Content-Type', 'application/json')
        .accept('application/json')
        .send(user1)
    })
    it("User Request: The customer's being created", () => {
      expect(response.status).to.equal(StatusCodes.CREATED)
    })
  })
  describe('User Request: Register user with existing email', () => {
    before(async () => {
      response = await post(`${API_URL}/${API_ENDPOINT}/`)
        .set('Content-Type', 'application/json')
        .accept('application/json')
        .send(user2)
    })
    it("User Request: The customer's not being created", () => {
      expect(response.status).to.equal(StatusCodes.CONFLICT)
    })
  })
  describe('User Request: Get customer', () => {
    before(async () => {
      response = await get(
        `${API_URL}/${API_ENDPOINT}/${user1.customerId}`
      ).set('User-Agent', 'agent')
    })
    it("User Request: The customer's being obtained", () => {
      expect(response.status).to.equal(StatusCodes.OK)
      expect(response.body.email).to.equal(user1.email)
      expect(response.body.username).to.equal(user1.username)
      expect(response.body.customerIf).to.equal(user1.customerId) // PUEDE QUE HAYA ERROR
    })
  })
})
