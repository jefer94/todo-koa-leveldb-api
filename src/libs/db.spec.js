import 'regenerator-runtime/runtime'
import { should } from 'chai'
import { get, put, del, mockDb } from './db'
import db from '../mocks/db'

should()

describe('libs/db', () => {
  describe('get', () => {
    before(() => {
      mockDb(db)
    })

    it('if key not exist throw exception', async () => {
      let result = 0

      try {
        await get('not found')
      }
      catch (e) {
        result = 1
      }

      result.should.be.equal(1)
    })

    it('get if key exist', async () => {
      let result = 0
      let name = ''

      try {
        await put('broken champ', 'Senna')
        name = await get('broken champ')
      }
      catch (e) {
        result = 1
      }

      result.should.be.equal(0)
      name.should.be.equal('Senna')
    })
  })

  describe('put', () => {
    before(() => {
      mockDb(db)
    })

    it('save data', async () => {
      let result = 0
      let name = ''

      try {
        await put('champ', 'Tristana')
        name = await get('champ')
      }
      catch (e) {
        result = 1
      }

      result.should.be.equal(0)
      name.should.be.equal('Tristana')
    })

    it('cannot save objects', async () => {
      let result = 0
      let object = ''

      try {
        await put('object', {})
        object = await get('object')
      }
      catch (e) {
        result = 1
      }

      result.should.be.equal(0)
      object.should.be.equal('[object Object]')
    })

    it('cannot save arrays', async () => {
      let result = 0
      let array = ''

      try {
        await put('array', [])
        array = await get('array')
      }
      catch (e) {
        result = 1
      }

      result.should.be.equal(0)
      array.should.be.equal('[object Object]')
    })
  })

  describe('del', () => {
    before(() => {
      mockDb(db)
    })

    it('error if key not exist', async () => {
      let result = 0
      // let name = ''

      try {
        await del('singer')
      }
      catch (e) {
        result = 1
      }

      result.should.be.equal(1)
      // name.should.be.equal('Tristana')
    })

    it('delete data if exist', async () => {
      let result = 0
      // let name = ''

      try {
        await put('singer', 'Lacey Mosley')
        await del('singer')
      }
      catch (e) {
        result = 1
      }

      result.should.be.equal(0)
      // name.should.be.equal('Tristana')
    })
  })
})
