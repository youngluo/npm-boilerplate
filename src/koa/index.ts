import * as uuidv4 from 'uuid/v4';
import { Context } from 'koa';
import { LoggerFactory, LoggerOptions, LoggerMethods } from '../index';

interface LoggerContext extends Context {
  logger: LoggerMethods
}

export default (project: string, callback?: (ctx: LoggerContext, logId: string) => void) => (
  async (ctx: LoggerContext, next: Function) => {
    const logId = ctx.get('Log-ID') || uuidv4();
    const defaultOptions: LoggerOptions = {
      remote_service: ctx.get('Remote-Service'),
      merchant_code: ctx.get('Merchant-Code'),
      user_agent: ctx.get('User-Agent'),
      url_path: ctx.path,
      method: ctx.method,
      log_id: logId,
      project
    };

    ctx.logger = LoggerFactory(defaultOptions);
    if (callback) callback(ctx, logId);

    await next();
  }
);
