import { dynamoDBClient } from '@libs/db';
import { formatJSONResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';


const get: ValidatedEventAPIGatewayProxyEvent<void> = async (event) => {

  const params = {
    TableName: process.env.REPORTS_TABLE,
    Key: {
      id: event.pathParameters.id,
    },
  };

  const data = await dynamoDBClient().get(params).promise();

  return formatJSONResponse(data.Item);
}

export const main = middyfy(get);
