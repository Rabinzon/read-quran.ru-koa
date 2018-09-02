export default async (ctx, next) => {
  if (!ctx.state.isSignedIn()) {
    ctx.throw(403, 'Not allowed! Please sign in.');
    return;
  }
  await next();
};
