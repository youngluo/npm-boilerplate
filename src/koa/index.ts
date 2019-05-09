import * as uuidv4 from 'uuid/v4';
import { Context } from 'koa';
import { loggerFactory, LoggerOptions } from '../index';

export default (project: string, callback?: (ctx: Context, logId: string) => void) => (
  async (ctx: Context, next: Function) => {
    const logId = ctx.get('Log-ID') || uuidv4();

    if (callback) callback(ctx, logId);

    const defaultOptions: LoggerOptions = {
      remote_service: ctx.get('Remote-Service'),
      merchant_code: ctx.get('Merchant-Code'),
      user_agent: ctx.get('User-Agent'),
      url_path: ctx.path,
      method: ctx.method,
      log_id: logId,
      project
    };

    ctx.logger = loggerFactory(defaultOptions);

    await next();
  }
);
