import supertest from 'supertest'
import {settings} from '../../../settings.js'
import {routes} from './routes.js'

const host = `localhost:${settings.PORT}`
const request = supertest(host)

export {
  request,
  routes
}
