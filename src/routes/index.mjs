import Router from '@koa/router'
import { login, signup, loginPath, signupPath } from './auth.mjs'
import { addTodo, removeTodo, listTodo, todoPath } from './todo.mjs'

export default new Router()
  .get(todoPath, listTodo)
  .post(todoPath, addTodo)
  .del(todoPath + '/:id', removeTodo)
  .post(loginPath, login)
  .post(signupPath, signup)