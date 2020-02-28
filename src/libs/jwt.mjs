import jwt from 'jsonwebtoken'

export const secret = '.\`5H+C8ewL~&wat"z<-A.eHmW2M}./m)w;zbh\'aBZwshA>!M;h&dyBhnaJK{_"Y'
export const saltRounds = 10


function isNotRestricted(url) {
  return !(url === '/login' ||
           url === '/signup')
}


export default async function(ctx, next) {
  ctx.state.user = { id: 0 }
  
  const authorization = ctx.request.header.authorization

  const notRestricted = isNotRestricted(ctx.request.url)
  if (notRestricted) {
    if (!authorization && !/^Bearer /.test(authorization)) {
      ctx.status = 401
      ctx.body = []
    }

    else {
      try {
        const data = jwt.verify(authorization.replace('Bearer ', ''), secret)
        if (data) {
          ctx.state.user = data
        }
      }
      catch (e) {
        ctx.status = 401
        ctx.body = []
      }
    }
  }
  await next()
  // return res.status(401).send([])
}