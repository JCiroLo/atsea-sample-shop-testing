import { get, post, del, put } from 'superagent'
import { StatusCodes } from 'http-status-codes'
import { expect } from 'chai'

const API_URL = `http://localhost:8080`
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
    response = await post(`${API_URL}/api/customer/`)
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

let orderToUpdate = {
  orderId: 0,
  productsOrdered: { 1: 2, 2: 2, 3: 2 },
  orderDate: new Date().toISOString(),
  customerId
}

describe('Order Request: Order Request from API', () => {
  let orderId = null
  // Create order endpoint
  describe('Order Request: Create order', () => {
    before(async () => {
      response = await post(`${API_URL}/api/order/`)
        .set('User-Agent', 'agent')
        .accept('application/json')
        .send(order)
      orderId = response.body.orderId
      order.orderId = orderId
      orderToUpdate.orderId = orderId
    })
    it("Order Request: The order's being created", () => {
      expect(response.status).to.equal(StatusCodes.CREATED)
    })
  })
  // Get all orders endpoint
  describe('Order Request: Get all orders', () => {
    before(async () => {
      response = await get(`${API_URL}/api/order/`).set('User-Agent', 'agent')
    })
    it('Order Request: All the orders are being obtained', () => {
      expect(response.status).to.equal(StatusCodes.OK)
    })
  })
  // Get order by id endpoint
  describe('Order Request: Get order by ID', () => {
    before(async () => {
      response = await get(`${API_URL}/api/order/${orderId}`)
        .set('User-Agent', 'agent')
        .accept('application/json')
    })
    it("Order Request: The order's being obtained", () => {
      expect(response.status).to.equal(StatusCodes.OK)
      expect(response.body.orderId).to.equal(order.orderId)
      expect(response.body).to.have.deep.property(
        'productsOrdered',
        order.productsOrdered
      )
    })
  })
  // Update order endpoint
  describe("Order Request: Update order", () => {
    before(async () => {
      response = await put(`${API_URL}/api/order/${orderId}`)
        .set('User-Agent', 'agent')
        .accept('application/json')
        .send(orderToUpdate)
    })
    it("Order Request: The order's being updated", () => {
      expect(response.status).to.equal(StatusCodes.OK)
    })
  })
  // Delete order endpoint
  describe("Order Request: Delete order by ID", () => {
    before(async () => {
      response = await del(`${API_URL}/api/order/${orderId}`).set(
        'User-Agent',
        'agent'
      )
    })
    it("Order Request: The order's being deleted", () => {
      expect(response.status).to.equal(StatusCodes.NO_CONTENT)
    })
  })
})
