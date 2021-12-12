import { browser } from 'protractor'
import { post } from 'superagent'
import { StatusCodes } from 'http-status-codes'
import * as chai from 'chai'
import { LogInStepPage, AddItemStepPage, PaymentStepPage } from '../../src/page'

const API_URL = process.env.HOST_URL
const API_ENDPOINT = 'api/customer'
let response = null
let customer = null
const expect = chai.expect

let user = {
  address: 'California bellair LA',
  email: 'willEsMid@gmail.com',
  name: 'Will Smith',
  password: 'password',
  phone: '+1 7872370921',
  username: 'WSMth',
  customerId: 9374,
  enabled: 'true',
  role: 'user'
}

describe('Register user', () => {
  before(async () => {
    response = await post(`${API_URL}/${API_ENDPOINT}/`)
      .set('User-Agent', 'agent')
      .accept('application/json')
      .send(user)
  })
  it('User was successfully registered ', () => {
    expect(response.status).to.equal(StatusCodes.CREATED)
    expect(response.body.customerIf).to.equal(user.customerId)
  })
})

