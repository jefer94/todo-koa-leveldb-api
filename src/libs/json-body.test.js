import 'regenerator-runtime/runtime'
import jsonBody from './json-body'
import ctx from '../mocks/ctx'
import next from '../mocks/next'

test('response json body', () => {
  const context = ctx()

  context.body = '{}'

  jsonBody(context, next)

  expect(typeof context.body).toBe('object')
})

test('rexponse text body', () => {
  const context = ctx()

  context.body = ''

  jsonBody(context, next)

  expect(typeof context.body).toBe('string')
})