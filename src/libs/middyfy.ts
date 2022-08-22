import middy, { MiddlewareObj, MiddyfiedHandler } from '@middy/core';
import errorLogger from '@middy/error-logger';
import middyJsonBodyParser from '@middy/http-json-body-parser';
import inputOutputLogger from '@middy/input-output-logger';
import Ajv, { AnySchema } from 'ajv';
import { APIGatewayProxyResult, Context } from 'aws-lambda';
import createHttpError from 'http-errors';
import JSONErrorHandlerMiddleware from 'middy-middleware-json-error-handler';
import { ValidatedAPIGatewayProxyEvent, ValidatedEventAPIGatewayProxyEvent } from './api-gateway';
import { logger } from './logger';

export const bodyValidator = (options: { inputSchema?: AnySchema; outputSchema?: AnySchema } = {}): MiddlewareObj => {
  const ajv = new Ajv({ removeAdditional: true });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const validateInputBody = async (request: any): Promise<void> => {
    if (options.inputSchema) {
      const validate = ajv.compile(options.inputSchema);
      const valid = validate(request?.event?.body);
      if (!valid) {
        logger.error(validate.errors, 'Invalid input format');
        throw createHttpError(400, 'Invalid input ' + validate.errors);
      }
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const validateOutputBody = async (request: any): Promise<void> => {
    if (options.outputSchema) {
      const body = request?.response?.body;
      const bodyObj = body ? JSON.parse(body) : body;
      const data = bodyObj ? bodyObj?.data : undefined;
      if (data) {
        const validate = ajv.compile(options.outputSchema);
        const valid = validate(data);
        if (!valid) {
          logger.error(validate.errors, 'Invalid output format');
          throw createHttpError(500, 'Internal Error');
        }
        request.response.body = JSON.stringify(bodyObj);
      }
    }
  };
  return {
    before: validateInputBody,
    after: validateOutputBody,
  };
};

export const middyfy = <S>(
  handler: ValidatedEventAPIGatewayProxyEvent<S>,
  // options: { inputSchema?: AnySchema; outputSchema?: AnySchema } = {},
): MiddyfiedHandler<ValidatedAPIGatewayProxyEvent<S>, APIGatewayProxyResult, Error, Context> => {
  return middy(handler)
    .use(errorLogger({ logger: (...args) => logger.error(...args) }))
    .use(inputOutputLogger({ logger: (...args) => logger.debug(...args) }))
    .use(middyJsonBodyParser())
    // .use(bodyValidator(options))
    .use(JSONErrorHandlerMiddleware());
};
