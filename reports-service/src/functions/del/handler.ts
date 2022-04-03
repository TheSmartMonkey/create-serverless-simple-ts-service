import 'source-map-support/register';
import { formatJSONResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { DynamoDB } from 'aws-sdk';


const dynamoDb = new DynamoDB.DocumentClient()

const del: ValidatedEventAPIGatewayProxyEvent<void> = async (event) => {

  const params = {
    TableName: process.env.REPORTS_TABLE,
    Key: {
      id: event.pathParameters.id,
    },
  };

  await dynamoDb.delete(params).promise();

  return formatJSONResponse({
    message: "report deleted",
  });
}

export const main = middyfy(del);
