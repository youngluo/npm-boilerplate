import * as Koa from 'koa';
import * as Router from 'koa-router';
import logger from '../lib/koa';

const router = new Router();
const app = new Koa();

router
  .get('/debug', (ctx) => {
    ctx.logger.debug('This is debug level');
    ctx.body = 'debug';
  })
  .get('/info', (ctx) => {
    ctx.logger.info('This is info level');
    ctx.body = 'info';
  })
  .get('/warn', (ctx) => {
    ctx.logger.warn('This is warn level');
    ctx.body = 'warn';
  })
  .get('/error', (ctx) => {
    ctx.logger.error('This is error level');
    ctx.body = 'error';
  })
  .get('/error-options', (ctx) => {
    ctx.logger.error('This is error level width options', { extra: { data: 123 } });
    ctx.body = 'error with options';
  });

app
  .use(logger('koa'))
  .use(router.routes())
  .use(router.allowedMethods());

export default app;
