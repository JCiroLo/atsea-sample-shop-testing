import { get, post } from 'superagent';
import { StatusCodes } from 'http-status-codes';
import { expect } from 'chai';

const host = `http://localhost:8080`;

const today = new Date();
today.setTime(today.getTime() + 300 * 60 * 1000);
const month = (today.getMonth() + 1).toString().padStart(2, '0');
const currentDate = `${today.getFullYear()}-${month}-${today.getDate()}`;
let response = null;

// Initial validation to be able to create orders
let customerId = null;
let userRegistry = {
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

describe('Setup customer user', () => {
  before(async () => {
    response = await post(`${host}/api/customer/`)
      .set('User-Agent', 'agent')
      .accept('application/json')
      .send(userRegistry);
    customerId = response.body.customerId;
  });
  it('User created and validated successfully', () => {
    expect(response.status).to.equal(StatusCodes.CREATED);
  });
});

// Once the user is created, lets create an order with the same user
let order = {
  orderId: 0,
  orderDate: currentDate,
  customerId: customerId,
  productsOrdered: { 1: 1, 2: 2, 3: 3 }
};

describe('Atsea Order Request API Test', () => {
  let orderId = null;
  describe('Creating an order', () => {
    before(async () => {
      response = await post(`${host}/api/order/`)
        .set('User-Agent', 'agent')
        .accept('application/json')
        .send(order);
      orderId = response.body.orderId;
      order.orderId = orderId;
    });
    it('Then an order should be placed', () => {
      expect(response.status).to.equal(StatusCodes.CREATED);
    });
  });
  describe('Getting an order from the orderId', () => {
    before(async () => {
      response = await get(`${host}/api/order/${orderId}`)
        .set('User-Agent', 'agent')
        .accept('application/json');
      console.log(response.body);
      console.log(order);
    });
    it('Then an order should be obtained', () => {
      expect(response.status).to.equal(StatusCodes.OK);
      expect(response.body.orderId).to.equal(order.orderId);
      expect(response.body).to.have.deep.property('productsOrdered', order.productsOrdered);
    });
  });
});
