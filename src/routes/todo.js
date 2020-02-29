import { get, put } from '../libs/db'

export const todoPath = '/todo'

export async function listTodo(ctx) {
  try {
    ctx.body = JSON.parse((await get(`ToDo${ctx.state.user.id}`)).toString())
  }
  catch (e) {
    ctx.body = []
  }
}

export async function addTodo(ctx) {
  const { name } = ctx.request.body
  let storage
  let id
  if (name) {
    try {
      storage = JSON.parse((await get(`ToDo${ctx.state.user.id}`)).toString())
    }
    catch (e) {
      storage = []
    }

    try {
      id = +((await get('ToDoId')).toString()) + 1
    }
    catch (e) {
      id = 0
    }

    try {
      await put('ToDoId', id.toString())
      await put(`ToDo${ctx.state.user.id}`, JSON.stringify([].concat(storage, { id, name })))
      ctx.status = 201
      ctx.body = id
    }
    catch (e) {
      ctx.status = 500
      ctx.body = ''
    }
  }
  else {
    ctx.status = 401
    ctx.body = ''
  }
}

export async function removeTodo(ctx) {
  const { id } = ctx.params
  let storage

  if (id && typeof +id === 'number') {
    try {
      storage = JSON.parse((await get(`ToDo${ctx.state.user.id}`)).toString())
    }
    catch (e) {
      storage = []
    }

    try {
      await put(`ToDo${ctx.state.user.id}`, JSON.stringify(storage.filter((v) => v.id !== +id)))
      ctx.status = 204
    }
    catch (e) {
      ctx.status = 500
    }
  }
  else ctx.status = 401
}
