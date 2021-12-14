import { get } from 'superagent'
import { StatusCodes } from 'http-status-codes'
import { expect } from 'chai'
export const API_URL = 'http://3.15.27.119:8080'

let response = null

describe('Utilities Request: Utilities Request from API', () => {
  // Login ednpoint --- The endpoint doesn't exist
  /* describe('Utilities Request: Login user', () => {
    before(async () => {
      response = await post(`${API_URL}/api/login/`)
        .set('User-Agent', 'agent')
        .accept('application/json')
        .send({
          username: 'test',
          password: 'test'
        })
    })
    it("Utilities Request: The user's being logged", () => {
      expect(response.status).to.equal(StatusCodes.OK)
    })
  }) */
  // DB health checker endpoint
  describe('Utilities Request: Get data base health info', () => {
    before(async () => {
      response = await get(`${API_URL}/utility/healthcheck/`)
    })
    it('Utilities Request: The database health is beign checked', () => {
      expect(response.status).to.equal(StatusCodes.OK)
    })
  })
})
