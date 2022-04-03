import { dynamoDBClient } from '@libs/db';
import { formatJSONResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

const list: ValidatedEventAPIGatewayProxyEvent<void> = async () => {

  const params = {
    TableName: process.env.REPORTS_TABLE,
  };

  const data = await dynamoDBClient().scan(params).promise();

  return formatJSONResponse({
    data: data.Items,
  });
}

export const main = middyfy(list);
