import { DynamoDB } from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

const OFFLINE = process.env.OFFLINE;

export const REPORTS_TABLE = process.env.REPORTS_TABLE || 'REPORTS_TABLE_IS_MISSING_FROM_ENV';

export function dynamoDBClient(): DocumentClient {
  if (OFFLINE === 'true') {
    return new DynamoDB.DocumentClient({
      region: 'localhost',
      endpoint: 'http://localhost:8000',
    });
  } else {
    return new DynamoDB.DocumentClient();
  }
}
