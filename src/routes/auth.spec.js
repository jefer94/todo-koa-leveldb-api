import 'regenerator-runtime/runtime'
import { should } from 'chai'
import { login, signup } from './auth'
import { mockDb } from '../libs/db'
import db from '../mocks/db'
import ctx from '../mocks/ctx'
import next from '../mocks/next'

should()

describe('routes/auth', () => {
  describe('login', () => {
    describe('POST', () => {
      before(() => {
        mockDb(db)
      })

      it('return 401 if user and pass not match', async () => {
        const context = ctx()
        const user = {
          user: 'lacey',
          pass: 'token'
        }

        context.request.body = user

        await login(context, next)

        context.status.should.be.equal(401)
        context.body.should.be.equal('')
      })

      it('return 500 if user not exist', async () => {
        const context = ctx()
        const user = {
          pass: 'token'
        }

        context.request.body = user

        await login(context, next)

        context.status.should.be.equal(500)
        context.body.should.be.equal('')
      })

      it('return 500 if pass not exist', async () => {
        const context = ctx()
        const user = {
          user: 'lacey'
        }

        context.request.body = user

        await login(context, next)

        context.status.should.be.equal(500)
        context.body.should.be.equal('')
      })

      it('return 200 if user and pass are valid', async () => {
        const signupContext = ctx()
        const context = ctx()
        const user = {
          user: 'LaceyMosley',
          pass: 'Count11%2'
        }

        signupContext.request.body = { ...user }

        await signup(signupContext, next)

        context.request.body = { ...user }

        await login(context, next)

        context.status.should.be.equal(200)
        context.body.length.should.not.be.equal(0)
      })
    })
  })

  describe('signup', () => {
    describe('POST', () => {
      before(() => {
        mockDb(db)
      })

      it('return 200 if user and pass are valid', async () => {
        const context = ctx()
        const user = {
          user: 'lacey',
          pass: 'Count11%'
        }

        context.request.body = user

        await signup(context, next)

        context.status.should.be.equal(200)
        context.body.length.should.not.be.equal(0)
      })

      it('return 401 if user not exist', async () => {
        const context = ctx()
        const user = {
          pass: 'token'
        }

        context.request.body = user

        await signup(context, next)

        context.status.should.be.equal(401)
        context.body.should.be.equal('')
      })

      it('return 401 if pass not exist', async () => {
        const context = ctx()
        const user = {
          user: 'lacey'
        }

        context.request.body = user

        await signup(context, next)

        context.status.should.be.equal(401)
        context.body.should.be.equal('')
      })

      it('return 401 if pass is full numbers', async () => {
        const context = ctx()
        const user = {
          user: 'lacey',
          pass: '1234567890'
        }

        context.request.body = user

        await signup(context, next)

        context.status.should.be.equal(401)
        context.body.should.be.equal('')
      })

      it('return 401 if pass is full lowercase letters', async () => {
        const context = ctx()
        const user = {
          user: 'lacey',
          pass: 'abcdefghijk'
        }

        context.request.body = user

        await signup(context, next)

        context.status.should.be.equal(401)
        context.body.should.be.equal('')
      })

      it('return 401 if pass is full uppercase letters', async () => {
        const context = ctx()
        const user = {
          user: 'lacey',
          pass: 'ABCDEFGHIJK'
        }

        context.request.body = user

        await signup(context, next)

        context.status.should.be.equal(401)
        context.body.should.be.equal('')
      })

      it('return 401 if pass is full tokens', async () => {
        const context = ctx()
        const user = {
          user: 'lacey',
          pass: '!@#$%^&*'
        }

        context.request.body = user

        await signup(context, next)

        context.status.should.be.equal(401)
        context.body.should.be.equal('')
      })

      it('return 401 if pass length is less that 7', async () => {
        const context = ctx()
        const user = {
          user: 'lacey',
          pass: 'Count%1'
        }

        context.request.body = user

        await signup(context, next)

        context.status.should.be.equal(401)
        context.body.should.be.equal('')
      })

      it('return 401 if pass missing lowercase', async () => {
        const context = ctx()
        const user = {
          user: 'lacey',
          pass: 'COUNT%1'
        }

        context.request.body = user

        await signup(context, next)

        context.status.should.be.equal(401)
        context.body.should.be.equal('')
      })

      it('return 401 if pass missing uppercase', async () => {
        const context = ctx()
        const user = {
          user: 'lacey',
          pass: 'count%1'
        }

        context.request.body = user

        await signup(context, next)

        context.status.should.be.equal(401)
        context.body.should.be.equal('')
      })

      it('return 401 if pass missing tokens', async () => {
        const context = ctx()
        const user = {
          user: 'lacey',
          pass: 'Count11'
        }

        context.request.body = user

        await signup(context, next)

        context.status.should.be.equal(401)
        context.body.should.be.equal('')
      })

      it('return 401 if pass missing numbers', async () => {
        const context = ctx()
        const user = {
          user: 'lacey',
          pass: 'Count%%'
        }

        context.request.body = user

        await signup(context, next)

        context.status.should.be.equal(401)
        context.body.should.be.equal('')
      })
    })
  })
})
