import * as Koa from 'koa';
import logger from '../dist/koa';

const app = new Koa();

app
  .use(logger('koa'))
  .use(async (ctx, next) => {
    if (ctx.path === '/test') ctx.logger.info('koa test');
    await next();
  })
  .listen(4000);
