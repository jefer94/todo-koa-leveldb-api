import 'regenerator-runtime/runtime'
import { login, signup } from './auth'
import { get, put, del, mockDb } from '../libs/db'
import { saltRounds } from '../libs/jwt'
import { should } from 'chai' 
import bcrypt from 'bcrypt'
import db from '../mocks/db'
import ctx from '../mocks/ctx'
import next from '../mocks/next'

should()

const { hash } = bcrypt
let id = 0

function getUser(name, pass) {
  return {
    id: id++,
    name,
    pass
  }
}

describe('routes/auth', function() {
  describe('login', function() {
    describe('POST', function() {
      before(() => {  
        mockDb(db)
      })

      it('return 401 if user and pass not match', async function() {
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

      it('return 500 if user not exist', async function() {
        const context = ctx()
        const user = {
          pass: 'token'
        }

        context.request.body = user
        
        await login(context, next)

        context.status.should.be.equal(500)
        context.body.should.be.equal('')
      })

      it('return 500 if pass not exist', async function() {
        const context = ctx()
        const user = {
          user: 'lacey'
        }

        context.request.body = user
        
        await login(context, next)

        context.status.should.be.equal(500)
        context.body.should.be.equal('')
      })

      it('return 200 if user and pass are valid', async function() {
        const signupContext = ctx()
        const context = ctx()
        const user = {
          user: 'LaceyMosley',
          pass: 'Count11%2'
        }

        signupContext.request.body = Object.assign({}, user)
        
        await signup(signupContext, next)

        context.request.body = Object.assign({}, user)
        
        await login(context, next)

        context.status.should.be.equal(200)
        context.body.length.should.not.be.equal(0)
      })
    })
  })

  describe('signup', function() {
    describe('POST', function() {
      before(() => {  
        mockDb(db)
      })

      it('return 200 if user and pass are valid', async function() {
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

      it('return 401 if user not exist', async function() {
        const context = ctx()
        const user = {
          pass: 'token'
        }

        context.request.body = user
        
        await signup(context, next)

        context.status.should.be.equal(401)
        context.body.should.be.equal('')
      })

      it('return 401 if pass not exist', async function() {
        const context = ctx()
        const user = {
          user: 'lacey'
        }

        context.request.body = user
        
        await signup(context, next)

        context.status.should.be.equal(401)
        context.body.should.be.equal('')
      })

      it('return 401 if pass is full numbers', async function() {
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

      it('return 401 if pass is full lowercase letters', async function() {
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

      it('return 401 if pass is full uppercase letters', async function() {
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

      it('return 401 if pass is full tokens', async function() {
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

      it('return 401 if pass length is less that 7', async function() {
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

      it('return 401 if pass missing lowercase', async function() {
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

      it('return 401 if pass missing uppercase', async function() {
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

      it('return 401 if pass missing tokens', async function() {
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

      it('return 401 if pass missing numbers', async function() {
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