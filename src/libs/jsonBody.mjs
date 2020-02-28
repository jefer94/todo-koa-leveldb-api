export default async function(ctx, next) {
  try {
    if (ctx.request.body && typeof ctx.request.body === 'string')
      ctx.request.body = JSON.parse(ctx.request.body)
  }
  catch(e) {}
  finally {
    await next()
  }
}