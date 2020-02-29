import Router from '@koa/router'
import { login, signup, loginPath, signupPath } from './auth'
import { addTodo, removeTodo, listTodo, todoPath } from './todo'

const indexPath = '/'

function index(ctx) {
  ctx.body = {
    '/': ['GET'],
    '/todo': ['GET', 'POST', 'DELETE'],
    '/login': ['POST'],
    '/signup': ['POST']
  }
  ctx.response.header['Content-Type'] = 'application/json'
}

export default new Router()
  .get(todoPath, listTodo)
  .post(todoPath, addTodo)
  .del(todoPath + '/:id', removeTodo)
  .post(loginPath, login)
  .post(signupPath, signup)
  .get(indexPath, index)