import { formatJSONResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { dynamoDBClient } from '@libs/db';
import { middyfy } from '@libs/lambda';

const del: ValidatedEventAPIGatewayProxyEvent<void> = async (event) => {
  const params = {
    TableName: process.env.REPORTS_TABLE,
    Key: {
      id: event.pathParameters.id,
    },
  };

  await dynamoDBClient().delete(params).promise();

  return formatJSONResponse({
    message: 'report deleted',
  });
};

export const main = middyfy(del);
