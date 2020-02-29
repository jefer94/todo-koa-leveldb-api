import 'regenerator-runtime/runtime'
import { should } from 'chai'
import { addTodo, listTodo, removeTodo } from './todo'
import { get, put, mockDb } from '../libs/db'
import db from '../mocks/db'
import ctx from '../mocks/ctx'
import next from '../mocks/next'

should()

let id = 0

function todo(name) {
  return {
    id: id++,
    name
  }
}

describe('routes/todo', () => {
  describe('GET', () => {
    before(() => {
      mockDb(db)
    })

    it('return 200 but empty if not exist todo', async () => {
      const context = ctx()
      const user = {
        id: 1,
        user: 'lacey',
        pass: 'token'
      }

      context.state.user = user

      put(`ToDo${user.id}`, '[]')

      await listTodo(context, next)

      context.status.should.be.equal(200)
      context.body.length.should.be.equal(0)
    })

    it('return 200 but empty if not exist user', async () => {
      const context = ctx()
      const user = {
        id: 0
      }

      context.state.user = user

      await listTodo(context, next)

      context.status.should.be.equal(200)
      context.body.length.should.be.equal(0)
    })

    it('return 200 and array of todo if exist', async () => {
      const context = ctx()
      const user = {
        id: 1,
        user: 'lacey',
        pass: 'token'
      }

      const list = [
        todo('Tristana'),
        todo('Senna'),
        todo('Miss Fortune')
      ]

      context.state.user = user

      put(`ToDo${user.id}`, JSON.stringify(list))

      await listTodo(context, next)

      context.status.should.be.equal(200)
      context.body.length.should.be.equal(3)

      context.body[0].id.should.be.equal(0)
      context.body[0].name.should.be.equal('Tristana')

      context.body[1].id.should.be.equal(1)
      context.body[1].name.should.be.equal('Senna')

      context.body[2].id.should.be.equal(2)
      context.body[2].name.should.be.equal('Miss Fortune')
    })
  })

  describe('POST', () => {
    before(() => {
      mockDb(db)
    })

    it('return 201, create todo and return id', async () => {
      const context = ctx()
      const user = {
        id: 2,
        user: 'FlyingSpaghettiMonster',
        pass: 'token'
      }

      context.state.user = user
      context.request.body = {
        name: 'choco'
      }

      await put(`ToDo${user.id}`, '[]')

      await addTodo(context, next)

      context.status.should.be.equal(201)
      context.body.should.be.equal(0)
    })

    it('return 401 if name is not provide', async () => {
      const context = ctx()
      const user = {
        id: 2,
        user: 'FlyingSpaghettiMonster',
        pass: 'token'
      }

      context.state.user = user

      await put(`ToDo${user.id}`, '[]')

      await addTodo(context, next)

      context.status.should.be.equal(401)
      context.body.should.be.equal('')
    })
  })

  describe('DELETE', () => {
    before(() => {
      mockDb(db)
    })

    it('return 204 if key exist', async () => {
      const context = ctx()
      const user = {
        id: 0
      }

      const list = [
        todo('Tristana')
      ]

      context.state.user = user
      context.params.id = 3

      await put(`ToDo${user.id}`, JSON.stringify(list))

      await removeTodo(context, next)

      context.status.should.be.equal(204)
      context.body.should.be.equal('')

      let state = 0
      let result
      try {
        result = JSON.parse(await get(`ToDo${user.id}`))
      }
      catch (e) {
        state = 1
      }

      state.should.be.equal(0)
      result.length.should.be.equal(0)
    })

    it('return 401 if key not exist', async () => {
      const context = ctx()
      const user = {
        id: 0
      }

      context.state.user = user

      await removeTodo(context, next)

      context.status.should.be.equal(401)
      context.body.should.be.equal('')
    })
  })
})
