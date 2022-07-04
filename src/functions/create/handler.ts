import { formatJSONResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import * as uuid from 'uuid';

import { dynamoDBClient } from '@libs/db';
import reportSchema from '../../schema/reports';

const create: ValidatedEventAPIGatewayProxyEvent<typeof reportSchema> = async (event) => {
  const timestamp = new Date().getTime();

  const params = {
    TableName: process.env.REPORTS_TABLE,
    Item: {
      id: uuid.v1(),
      createdAt: timestamp,
      updatedAt: timestamp,
      name: event.body.name,
    },
  };

  await dynamoDBClient().put(params).promise();

  return formatJSONResponse({
    message: 'report created',
    data: params.Item,
  });
};

export const main = middyfy(create);
