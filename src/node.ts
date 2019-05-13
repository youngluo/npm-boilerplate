/* eslint-disable camelcase */
import * as moment from 'moment';
import * as _ from 'lodash';

const loggerLevels = ['DEBUG', 'INFO', 'WARN', 'ERROR'];

export interface LoggerOptions {
  file?: string;
  log_id?: string;
  merchant_code?: string;
  time?: string;
  remote_service?: string;
  user_agent?: string;
  url_path?: string;
  method?: string;
  cost_time?: string;
  project?: string;
  status?: number;
  level?: string;
  extra?: any;
  code?: number;
  msg?: string;
}

export interface LoggerMethods {
  debug(msg: string, options?: LoggerOptions): void;
  info(msg: string, options?: LoggerOptions): void;
  warn(msg: string, options?: LoggerOptions): void;
  error(msg: string, options?: LoggerOptions): void;
}

function getException() {
  try {
    throw Error('get caller position');
  } catch (err) {
    return err;
  }
}

function getCallerPosition() {
  const stack = _.split(getException().stack, '\n');
  const stackSize = _.size(stack);
  const logIndex = _.findIndex(stack, (stackLine, index) => (
    _.includes(stackLine, 'Object.loggerPredicate') && index < stackSize - 1
  ));

  if (logIndex > 0) {
    const callerStackLine = stack[logIndex + 1];
    const re = /\((.+?)\)/g;
    const regResult = re.exec(callerStackLine);

    return _.isArray(regResult) ? regResult[1] : '-';
  }

  return '-';
}

export function LoggerFactory(defaultOptions?: LoggerOptions) {
  const log = (options: LoggerOptions) => {
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(_.assign({
      file: getCallerPosition(),
      log_id: '',
      merchant_code: '',
      time: moment().format('YYYY-MM-DD HH:mm:ss'),
      remote_service: '',
      user_agent: '',
      url_path: '',
      method: '',
      cost_time: '',
      project: '',
      status: 200,
      level: '',
      extra: '',
      code: 0,
      msg: 'success'
    }, defaultOptions, options)));
  };
  const logger = {} as LoggerMethods;

  _.forEach(loggerLevels, (level) => {
    const loggerPredicate = (msg: string, options: LoggerOptions) => {
      log(_.assign(options, { msg, level }));
    };

    _.set(logger, _.lowerCase(level), loggerPredicate);
  });

  return logger;
}

export default LoggerFactory();
