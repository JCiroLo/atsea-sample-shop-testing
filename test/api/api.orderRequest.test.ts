import { get, post, del } from 'superagent'
import { StatusCodes } from 'http-status-codes'
import { expect } from 'chai'

const host = `http://localhost:8080`
let response = null

// Initial validation to be able to create orders
let customerId = null
let userRegistry = {
  address: '144 Townsend Street',
  email: 'test@gmail.com',
  name: 'Jess',
  password: new Date().getTime().toString(),
  phone: '9999999999',
  username: new Date().getTime().toString(),
  customerId: 0,
  enabled: 'true',
  role: 'user'
}

describe('Setup customer user', () => {
  before(async () => {
    response = await post(`${host}/api/customer/`)
      .set('User-Agent', 'agent')
      .accept('application/json')
      .send(userRegistry)
    customerId = response.body.customerId
  })
  it('User created and validated successfully', () => {
    expect(response.status).to.equal(StatusCodes.CREATED)
  })
})

// Once the user is created, lets test API endpoints
let order = {
  orderId: 0,
  orderDate: new Date().toISOString(),
  customerId,
  productsOrdered: { 1: 1, 2: 2, 3: 3 }
}

describe('Atsea Order Request API Test', () => {
  let orderId = null
  // Create order endpoint
  describe('Creating an order', () => {
    before(async () => {
      response = await post(`${host}/api/order/`)
        .set('User-Agent', 'agent')
        .accept('application/json')
        .send(order)
      orderId = response.body.orderId
      order.orderId = orderId
    })
    it('Then an order should be placed', () => {
      expect(response.status).to.equal(StatusCodes.CREATED)
    })
  })
  // Get all orders endpoint
  describe('Getting an order from the orderId', () => {
    before(async () => {
      response = await get(`${host}/api/order/`).set('User-Agent', 'agent')
    })
    it('Then an order should be obtained', () => {
      expect(response.status).to.equal(StatusCodes.OK)
    })
  })
  // Get order by id endpoint
  describe('Getting an order from the orderId', () => {
    before(async () => {
      response = await get(`${host}/api/order/${orderId}`)
        .set('User-Agent', 'agent')
        .accept('application/json')
    })
    it('Then an order should be obtained', () => {
      expect(response.status).to.equal(StatusCodes.OK)
      expect(response.body.orderId).to.equal(order.orderId)
      expect(response.body).to.have.deep.property(
        'productsOrdered',
        order.productsOrdered
      )
    })
  })
  // Update order endpoint
  describe('Getting an order from the orderId', () => {
    before(async () => {
      response = await post(`${host}/api/order/${orderId}`)
        .set('User-Agent', 'agent')
        .accept('application/json')
        .send({
          orderId,
          productsOrdered: { '3': 2, '6': 3, '11': 2 },
          orderDate: new Date().toISOString(),
          customerId
        })
    })
    it('Then an order should be obtained', () => {
      expect(response.status).to.equal(StatusCodes.OK)
    })
  })
  // Delete order endpoint
  describe('Getting an order from the orderId', () => {
    before(async () => {
      response = await del(`${host}/api/order/${orderId}`).set(
        'User-Agent',
        'agent'
      )
    })
    it('Then an order should be obtained', () => {
      expect(response.status).to.equal(StatusCodes.OK)
    })
  })
})
