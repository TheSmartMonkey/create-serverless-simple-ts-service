import { formatJSONResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { middyfy } from '@libs/middyfy';
import createHttpError from 'http-errors';

const hello: ValidatedEventAPIGatewayProxyEvent<void> = async (event) => {
  const message = event.pathParameters?.message;
  if (!message) throw createHttpError(400, 'message not provided');

  return formatJSONResponse({
    message: 'Hello World !',
    data: message,
  });
};

export const main = middyfy({ handler: hello });
