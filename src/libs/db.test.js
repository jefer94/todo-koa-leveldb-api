import 'regenerator-runtime/runtime'
import { get, put, del, mockDb } from './db'
import db from '../mocks/db'

console.log(db, mockDb)

// mockDb(db)

// test('get without key', async () => {
//   let result = 'not match'
//   try {
//     await get('not exist')
//   }
//   catch(e) {
//     result = e
//   }
//   expect(result).toBe('')
// })

test('adds 1 + 2 to equal 3', () => {
  expect(1 + 2).toBe(3)
})