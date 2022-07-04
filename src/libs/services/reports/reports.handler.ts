import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import createHttpError from 'http-errors';
import * as uuid from 'uuid';

import { dynamoDBClient, REPORTS_TABLE } from '@libs/db';
import { ReportDao, ReportDto } from '@libs/models/reports';

export async function createReport(report: ReportDto): Promise<ReportDao> {
  const timestamp = new Date().getTime();
  const parameters = {
    TableName: REPORTS_TABLE,
    Item: {
      id: uuid.v1(),
      createdAt: timestamp,
      updatedAt: timestamp,
      name: report.name,
    },
  };

  await dynamoDBClient().put(parameters).promise();
  return parameters.Item;
}

export async function deleteReport(reportId: string) {
  await getReport(reportId);
  const parameters = {
    TableName: REPORTS_TABLE,
    Key: {
      id: reportId,
    },
  };
  await dynamoDBClient().delete(parameters).promise();
}

export async function getReport(reportId: string): Promise<ReportDao> {
  const parameters = {
    TableName: REPORTS_TABLE,
    Key: {
      id: reportId,
    },
  };
  const data = await dynamoDBClient().get(parameters).promise();
  if (!data.Item) throw createHttpError(404, 'report not found');
  return data.Item as ReportDao;
}

export async function listReport(): Promise<ReportDao[]> {
  const parameters = {
    TableName: process.env.REPORTS_TABLE,
  };
  const data = await dynamoDBClient().scan(parameters).promise();
  return data.Items as ReportDao[];
}

export async function updateReport(report: ReportDto): Promise<DocumentClient.AttributeMap> {
  const timestamp = new Date().getTime();
  const parameters = {
    TableName: process.env.REPORTS_TABLE,
    Key: {
      id: report.id,
    },
    ExpressionAttributeNames: {
      '#report_name': 'name',
    },
    ExpressionAttributeValues: {
      ':name': report.name,
      ':updatedAt': timestamp,
    },
    UpdateExpression: 'SET #report_name = :name, updatedAt = :updatedAt',
    ConditionExpression: 'attribute_exists(id)',
    ReturnValues: 'ALL_NEW',
  };

  try {
    const data = await dynamoDBClient().update(parameters).promise();
    return data.Attributes;
  } catch (error) {
    if (error.code === 'ConditionalCheckFailedException') throw createHttpError(400, `No report found with the id ${report.id}`);
    throw createHttpError(400, `Update Failed with error ${error}`);
  }
}
