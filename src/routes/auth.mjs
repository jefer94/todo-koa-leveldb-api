import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { secret, saltRounds } from '../libs/jwt.mjs'
import { get, put } from '../libs/db.mjs'

const { compare, hash } = bcrypt

export const loginPath = '/login'
export const signupPath = '/signup'

export async function login(ctx) {
  const {user, pass} = ctx.request.body
  if (user && pass) {
    try {
      const current = JSON.parse(await get(`User-${user}`))

      if (current.id && current.pass && await compare(pass, current.pass)) {
        current.now = Date.now()
        ctx.status = 200
        ctx.body = jwt.sign(current, secret, { expiresIn: '1d' })
        return
      }
    }
    catch(e) { }

    ctx.status = 401
    ctx.body = ''
  }
  else {
    ctx.status = 500
    ctx.body = ''
  }
}

function strongPassword(pass) {
  return /\d/.test(pass) &&
         /[a-z]/.test(pass) &&
         /[A-Z]/.test(pass) &&
         /\W/.test(pass) &&
         pass.length > 7
}

export async function signup(ctx, next) {
  let currentUser
  let id

  if (ctx.request.body.user && ctx.request.body.pass && strongPassword(ctx.request.body.pass)) {
    try {
      currentUser = (await get(`User-${user}`)).toString()
    }
    catch(e) {
      currentUser = false
    }

    try {
      id = +((await get('UserId')).toString()) + 1
    }
    catch(e) {
      id = 0
    }
    console.log(ctx.status)
    if (!currentUser) {
      try {
        const data = {
          id,
          user: ctx.request.body.user,
          pass: await hash(ctx.request.body.pass, saltRounds),
        }
        console.log(data, ctx.status)
        await put('UserId', id.toString())
        await put(`User-${ctx.request.body.user}`, JSON.stringify(data))
        data.now = Date.now()
        ctx.status = 200
        ctx.body = jwt.sign(data, secret, { expiresIn: '1d' })
        return
      }
      catch(e) {
        console.log(500)
        ctx.status = 500
        ctx.body = ''
        return
      }
    }
  }
  
  ctx.body = ''
  ctx.response.status = 401
}