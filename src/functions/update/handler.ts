import { formatJSONResponse } from '@libs/apiGateway';
import { dynamoDBClient } from '@libs/db';
import { middyfy } from '@libs/lambda';
import { ValidatedEventAPIGatewayProxyEvent } from '../../libs/apiGateway';

import createHttpError from 'http-errors';
import reportSchema from '../../schema/reports';

const update: ValidatedEventAPIGatewayProxyEvent<typeof reportSchema> = async (event) => {
  const timestamp = new Date().getTime();

  const params = {
    TableName: process.env.REPORTS_TABLE,
    Key: {
      id: event.pathParameters.id,
    },
    ExpressionAttributeNames: {
      '#report_name': 'name',
    },
    ExpressionAttributeValues: {
      ':name': event.body.name,
      ':updatedAt': timestamp,
    },
    UpdateExpression: 'SET #report_name = :name, updatedAt = :updatedAt',
    ConditionExpression: 'attribute_exists(id)',
    ReturnValues: 'ALL_NEW',
  };

  try {
    const data = await dynamoDBClient().update(params).promise();
    return formatJSONResponse({
      message: 'report updated',
      data: data.Attributes,
    });
  } catch (e) {
    if (e.code === 'ConditionalCheckFailedException') {
      throw createHttpError(400, `No report found with the id ${event.pathParameters.id}.`);
    }
    console.error('Update Failed', e);
    throw e;
  }
};

export const main = middyfy(update);
