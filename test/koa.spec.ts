import * as request from 'supertest';
import { LoggerOptions } from '../lib/node';
import output from './output';
import app from './koa';

let outputLog: LoggerOptions;
const logSpy = jest
  .spyOn(console, 'log')
  .mockImplementation((log) => {
    outputLog = JSON.parse(log);
  });

describe('koa logger', () => {
  test('debug log', (done) => {
    request(app.listen()).get('/debug').then((response) => {
      expect(response.text).toBe('debug');
      expect(logSpy).toHaveBeenCalledWith(output({
        msg: 'This is debug level',
        file: outputLog.file,
        log_id: outputLog.log_id,
        user_agent: outputLog.user_agent,
        project: 'koa',
        url_path: '/debug',
        method: 'GET',
        level: 'DEBUG'
      }));

      done();
    });
  });

  test('info log', (done) => {
    request(app.listen()).get('/info').then((response) => {
      expect(response.text).toBe('info');
      expect(logSpy).toHaveBeenCalledWith(output({
        msg: 'This is info level',
        file: outputLog.file,
        log_id: outputLog.log_id,
        user_agent: outputLog.user_agent,
        project: 'koa',
        url_path: '/info',
        method: 'GET',
        level: 'INFO'
      }));

      done();
    });
  });

  test('warn log', (done) => {
    request(app.listen()).get('/warn').then((response) => {
      expect(response.text).toBe('warn');
      expect(logSpy).toHaveBeenCalledWith(output({
        msg: 'This is warn level',
        file: outputLog.file,
        log_id: outputLog.log_id,
        user_agent: outputLog.user_agent,
        project: 'koa',
        url_path: '/warn',
        method: 'GET',
        level: 'WARN'
      }));

      done();
    });
  });

  test('error log', (done) => {
    request(app.listen()).get('/error').then((response) => {
      expect(response.text).toBe('error');
      expect(logSpy).toHaveBeenCalledWith(output({
        msg: 'This is error level',
        file: outputLog.file,
        log_id: outputLog.log_id,
        user_agent: outputLog.user_agent,
        project: 'koa',
        url_path: '/error',
        method: 'GET',
        level: 'ERROR'
      }));

      done();
    });
  });

  test('error log with options', (done) => {
    request(app.listen()).get('/error-options').then((response) => {
      expect(response.text).toBe('error with options');
      expect(logSpy).toHaveBeenCalledWith(output({
        msg: 'This is error level width options',
        file: outputLog.file,
        log_id: outputLog.log_id,
        user_agent: outputLog.user_agent,
        project: 'koa',
        url_path: '/error-options',
        method: 'GET',
        level: 'ERROR',
        extra: { data: 123 }
      }));

      done();
    });
  });
});
