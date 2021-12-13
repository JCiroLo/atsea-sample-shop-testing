import { post, get } from 'superagent'
import { StatusCodes } from 'http-status-codes'
import { expect } from 'chai'

const API_URL = 'http://localhost:8080'
let response = null

describe('Product Request: Atsea Product Request from API', () => {
  // Login ednpoint
  describe('Product Request: Get all products in stock', () => {
    before(async () => {
      response = await post(`${API_URL}/api/login/`)
        .set('User-Agent', 'agent')
        .accept('application/json')
        .send({
          username: 'test',
          password: 'test'
        })
    })
    it('Product Request: The products are being listed', () => {
      expect(response.status).to.equal(StatusCodes.OK)
    })
  })
  // DB health checker endpoint
  describe('Checking the database health', () => {
    before(async () => {
      response = await get(`${API_URL}/utility/healthcheck/`)
    })
    it('Then the database health should be checked', () => {
      expect(response.status).to.equal(StatusCodes.OK)
    })
  })
})
