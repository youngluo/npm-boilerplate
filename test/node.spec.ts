import logger, { LoggerOptions } from '../lib/node';
import output from './output';

let outputLog: LoggerOptions;
const logSpy = jest
  .spyOn(console, 'log')
  .mockImplementation((log) => {
    outputLog = JSON.parse(log);
  });

describe('node logger', () => {
  test('debug log', () => {
    logger.debug('This is debug level');

    expect(logSpy).toHaveBeenCalledWith(output({
      msg: 'This is debug level',
      file: outputLog.file,
      level: 'DEBUG'
    }));
  });

  test('info log', () => {
    logger.info('This is info level');

    expect(logSpy).toHaveBeenCalledWith(output({
      msg: 'This is info level',
      file: outputLog.file,
      level: 'INFO'
    }));
  });

  test('warn log', () => {
    logger.warn('This is warn level');

    expect(logSpy).toHaveBeenCalledWith(output({
      msg: 'This is warn level',
      file: outputLog.file,
      level: 'WARN'
    }));
  });

  test('error log', () => {
    logger.error('This is error level');

    expect(logSpy).toHaveBeenCalledWith(output({
      msg: 'This is error level',
      file: outputLog.file,
      level: 'ERROR'
    }));
  });

  test('error log with options', () => {
    logger.error('This is error level', { extra: { data: 123 } });

    expect(logSpy).toHaveBeenCalledWith(output({
      msg: 'This is error level',
      file: outputLog.file,
      level: 'ERROR',
      extra: { data: 123 }
    }));
  });
});
