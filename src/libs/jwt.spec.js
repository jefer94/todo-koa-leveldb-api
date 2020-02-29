import 'regenerator-runtime/runtime'
import { should } from 'chai'
import jwt, { sign } from './jwt'
import ctx from '../mocks/ctx'
import next from '../mocks/next'

should()

process.env.SECRET = '.`5H+C8ewL~&wat"z<-A.eHmW2M}./m)w;zbh\'aBZwshA>!M;h&dyBhnaJK{_"Y'
process.env.SALT_ROUNDS = 10

describe('libs/jwt', () => {
  describe('default', () => {
    it('without authorization header return 401', async () => {
      const context = ctx()

      await jwt(context, next)

      context.status.should.be.equal(401)
    })

    it('with bad authorization header return 401', async () => {
      const context = ctx()

      context.status = 200
      context.request.header.authorization = 'asdasdasdsadasdadsdasdsadsa'

      await jwt(context, next)

      context.status.should.be.equal(401)
    })

    it('with authorization header return 200', async () => {
      const context = ctx()
      const token = sign({
        id: 1,
        user: 'Senna',
        pass: 'unread'
      })

      context.status = 200
      context.request.header.authorization = `Bearer ${token}`

      await jwt(context, next)

      context.status.should.be.equal(200)
    })
  })
})
