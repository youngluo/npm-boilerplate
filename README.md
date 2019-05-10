# @xwfintech/logger

## 安装

`npm install @xwfintech/logger`

## 使用

```ts
interface LoggerOptions {
  file?: string,
  log_id?: string,
  merchant_code?: string,
  time?: string,
  remote_service?: string,
  user_agent?: string,
  url_path?: string,
  method?: string,
  cost_time?: string,
  project?: string,
  status?: number,
  level?: string,
  extra?: any,
  code?: number,
  msg?: string
}
```

### koa

```ts
const logger = require('@xwfintech/logger');
const Koa = require('koa');
const app = new Koa();

app.use(logger('koa'));

// or
app.use(logger('koa', (ctx, logId) => {
  // 特殊需求
}));

ctx.logger.debug(msg: string, options?: LoggerOptions);
ctx.logger.info(msg: string, options?: LoggerOptions);
ctx.logger.warn(msg: string, options?: LoggerOptions);
ctx.logger.error(msg: string, options?: LoggerOptions);
```

## node（普通调用）

```ts
const logger = require('@xwfintech/logger/lib/node');

logger.debug(msg: string, options?: LoggerOptions);
logger.info(msg: string, options?: LoggerOptions);
logger.warn(msg: string, options?: LoggerOptions);
logger.error(msg: string, options?: LoggerOptions);
```
