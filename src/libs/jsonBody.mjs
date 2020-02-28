export default async function(ctx, next) {
  console.log(ctx.status, 'aaadddd')
  try {
    if (ctx.request.body && typeof ctx.request.body === 'string')
      ctx.request.body = JSON.parse(ctx.request.body)
  }
  catch(e) {}
  finally {
    console.log(ctx.status)
    await next()
  }
}