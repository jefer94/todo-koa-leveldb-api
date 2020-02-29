export default async function (ctx, next) {
  try {
    if (ctx.body && typeof ctx.body === 'string') ctx.body = JSON.parse(ctx.body)
  }
  catch (e) {}
  finally {
    await next()
  }
}
