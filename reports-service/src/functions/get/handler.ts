import 'source-map-support/register';
import { formatJSONResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { DynamoDB } from 'aws-sdk';


const dynamoDb = new DynamoDB.DocumentClient()

const get: ValidatedEventAPIGatewayProxyEvent<void> = async (event) => {

  const params = {
    TableName: process.env.REPORTS_TABLE,
    Key: {
      id: event.pathParameters.id,
    },
  };

  const data = await dynamoDb.get(params).promise();

  return formatJSONResponse(data.Item);
}

export const main = middyfy(get);
