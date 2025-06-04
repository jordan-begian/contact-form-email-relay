import { randomUUID } from 'crypto';
import { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import winston, { LoggerOptions } from 'winston';

const LOGGER_OPTIONS: LoggerOptions = {
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        winston.format.json(),
        winston.format.colorize({ all: process.env.NODE_ENV === "development"}),
      ),
    }),
  ],
};
const logger = winston.createLogger(LOGGER_OPTIONS);

morgan.token('traceparent', (request: Request) => request
  .headers['traceparent'] as string || '-');

const MORGAN_FORMAT: string = JSON.stringify({
  address: ':remote-addr',
  date: ':date[iso]',
  method: ':method',
  status: ':status',
  path: ':url',
  traceparent: ':traceparent',
  referrer_header: ':referrer',
  request_headers: ':req[headers]',
  response_headers: ':res[headers]',
  response_time: ':response-time ms',
  total_time: ':total-time ms',
  http_version: 'HTTP/:http-version',
  user_agent: ':user-agent',
});
const MORGAN_STREAM = {
  write: (request: string) => {
    logger.info(JSON.parse(request));
  }
};
const requestLogger = morgan(MORGAN_FORMAT, {
  stream: MORGAN_STREAM,
  skip: (request: Request) => request.method === 'OPTIONS',
});

const requestTracer = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const traceId = `${randomUUID()}`;
  request.headers['traceparent'] = traceId;
  response.setHeader('traceparent', traceId);
  next();
};

export {
  logger,
  requestLogger,
  requestTracer
};

