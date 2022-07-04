import middy from '@middy/core';
import errorLogger from '@middy/error-logger';
import middyJsonBodyParser from '@middy/http-json-body-parser';
import inputOutputLogger from '@middy/input-output-logger';
import JSONErrorHandlerMiddleware from 'middy-middleware-json-error-handler';
import { logger } from './logger';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function middyfy(handler) {
  return middy(handler)
    .use(errorLogger({ logger: (...args) => logger.error(...args) }))
    .use(inputOutputLogger({ logger: (...args) => logger.debug(...args) }))
    .use(middyJsonBodyParser())
    .use(JSONErrorHandlerMiddleware());
}
