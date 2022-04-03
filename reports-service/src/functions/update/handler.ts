import { ValidatedEventAPIGatewayProxyEvent } from '../../libs/apiGateway';
import 'source-map-support/register';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { DynamoDB } from 'aws-sdk';

import reportSchema from '../../schema/reports';
import createHttpError from 'http-errors';


const dynamoDb = new DynamoDB.DocumentClient()

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

  // update the todo in the database
  try {

    const data = await dynamoDb.update(params).promise();
    return formatJSONResponse({
      message: "report updated",
      data: data.Attributes,
    });

  } catch (e) {
    if (e.code === 'ConditionalCheckFailedException') {
      throw createHttpError(400, `No report found with the id ${event.pathParameters.id}.`);
    }
    console.error('Update Failed', e);
    throw e;
  }

}

export const main = middyfy(update);
