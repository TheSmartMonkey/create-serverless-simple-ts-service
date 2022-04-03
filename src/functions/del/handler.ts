import { dynamoDBClient } from '@libs/db';
import { formatJSONResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
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
    message: "report deleted",
  });
}

export const main = middyfy(del);
