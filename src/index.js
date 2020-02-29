import 'regenerator-runtime/runtime'
import Koa from 'koa'
import cors from '@koa/cors'
import koaBody from 'koa-body'
import json from 'koa-json'
// import jsonBody from './libs/jsonBody'
import helmet from 'koa-helmet'
import process from 'process'
import router from './routes'
import jwtMiddleware from './libs/jwt'


const app = new Koa()

const port = process.env.PORT || 5000

app.use(cors())
  .use(koaBody())
  .use(json())
  // .use(jsonBody)
  .use(helmet())
  .use(jwtMiddleware)
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(port)
