import * as Koa from 'koa';
import logger from '../lib/koa';

const app = new Koa();

app
  .use(logger('koa'))
  .use(async (ctx, next) => {
    if (ctx.path === '/test') ctx.logger.info('koa test', { extra: { a: 1 } });
    await next();
  })
  .listen(4000);
