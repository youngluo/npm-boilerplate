import * as moment from 'moment';
import { LoggerOptions } from '../lib/node';

export default (options: LoggerOptions) => JSON.stringify({
  ...{
    file: '',
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
  },
  ...options
});
