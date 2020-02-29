import 'regenerator-runtime/runtime'
import { should } from 'chai'
import jsonBody from './json-body'
import ctx from '../mocks/ctx'
import next from '../mocks/next'

should()

describe('libs/json-body', () => {
  describe('default', () => {
    it('response json body', async () => {
      const context = ctx()

      context.body = '{}'

      jsonBody(context, next)

      const type = typeof context.body
      type.should.be.equal('object')
    })

    it('response text body', async () => {
      const context = ctx()

      context.body = ''

      jsonBody(context, next)

      const type = typeof context.body
      type.should.be.equal('string')
    })
  })
})
