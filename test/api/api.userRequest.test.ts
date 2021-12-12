import { get, post } from 'superagent'
import { StatusCodes } from 'http-status-codes'
import { expect } from 'chai'
// import describers from '../describers.json'

const API_URL = 'http://localhost:8080'
const API_ENDPOINT = 'api/customer'
let response = null

const user = {
  address: "144 Townsend Street",
  email: "test@gmail.com",
  name: "Jess",
  password: (new Date().getTime()).toString(),
  phone: "9999999999",
  username: (new Date().getTime()).toString(),
  customerId: 0,
  enabled: "true",
  role: "user"
}

let userResponseId = null

describe('User Request: User Request from API', () => {
  describe('User Request: Register user', () => {
    before(async () => {
      response = await post(`${API_URL}/${API_ENDPOINT}/`)
        .set('User-Agent', 'agent')
        .accept('application/json')
        .send(user)
      userResponseId = response.body.customerId
    })
    it("User Request: The customer's being created", () => {
      expect(response.status).to.equal(StatusCodes.CREATED)
    })
  })
  describe('User Request: Register user with existing email', () => {
    before(async () => {
      try {
        response = await post(`${API_URL}/${API_ENDPOINT}/`)
        .set('User-Agent', 'agent')
        .accept('application/json')
        .send(user)
      } catch (e) {
        response = e
      }
    })
    it("User Request: The customer's not being created", () => {
      expect(response.status).to.equal(StatusCodes.CONFLICT)
    })
  })
  describe('User Request: Get customer', () => {
    before(async () => {
      response = await get(
        `${API_URL}/${API_ENDPOINT}/${userResponseId}`
      ).set('User-Agent', 'agent')
    })
    it("User Request: The customer's being obtained", () => {
      expect(response.status).to.equal(StatusCodes.OK)
      expect(response.body.email).to.equal(user.email)
      expect(response.body.username).to.equal(user.username)
      expect(response.body.customerIf).to.equal(userResponseId) // PUEDE QUE HAYA ERROR
    })
  })
})
