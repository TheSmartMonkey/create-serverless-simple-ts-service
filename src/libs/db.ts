import { DynamoDB } from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

export function dynamoDBClient(): DocumentClient {
  if (process.env.OFFLINE === 'true') {
    return new DynamoDB.DocumentClient({
      region: 'localhost',
      endpoint: 'http://localhost:8000',
    });
  }
  return new DynamoDB.DocumentClient();
}
