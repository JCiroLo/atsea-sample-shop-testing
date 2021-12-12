import { get } from 'superagent';
import { StatusCodes } from 'http-status-codes';
import { expect } from 'chai';

const host = 'http://localhost:8080'
let response = null;
let product = null;

describe('Product Request: Atsea Product Request from API', () => {
  describe('Product Request: Get all products in stock', () => {
    before(async () => {
      response = await get(`${host}/api/product/`);
    });
    it('Product Request: The products are being listed', () => {
      expect(response.status).to.equal(StatusCodes.OK);
      expect(response.body.length).to.equal(9);
    });
  });
  describe('Get one single product of atsea shop', () => {
    before(async () => {
      response = await get(`${host}/api/product/6`);
      product = response.body;
      expect(response.status).to.equal(StatusCodes.OK);
    });
    it('Then product 6 should be obtained', () => {
      expect(product.productId).to.equal(6);
      expect(product.name).to.equal('Docker Babies');
      expect(product.price).to.equal(25.0);
      expect(product.description).to.equal('For those with a cute little whale');
    });
  });
});
