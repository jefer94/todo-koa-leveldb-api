import { compare, hash } from 'bcrypt'
import { secret, saltRounds, sign, } from '../libs/jwt'
import { get, put } from '../libs/db'

export const loginPath = '/login'
export const signupPath = '/signup'

export async function login(ctx) {
  const {user, pass} = ctx.request.body
  if (user && pass) {
    try {
      const current = JSON.parse(await get(`User-${user}`))

      if (Number.isInteger(current.id) && current.pass && await compare(pass, current.pass)) {
        current.now = Date.now()
        ctx.status = 200
        ctx.body = sign(current)
        return
      }
    }
    catch(e) {}

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
    if (!currentUser) {
      try {
        const data = {
          id,
          user: ctx.request.body.user,
          pass: await hash(ctx.request.body.pass, saltRounds()),
        }
        await put('UserId', id.toString())
        await put(`User-${ctx.request.body.user}`, JSON.stringify(data))
        data.now = Date.now()
        ctx.status = 200
        ctx.body = sign(data)
        return
      }
      catch(e) {
        ctx.status = 500
        ctx.body = ''
        return
      }
    }
  }
  
  ctx.body = ''
  ctx.status = 401
}