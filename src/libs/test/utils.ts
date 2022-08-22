/* eslint-disable @typescript-eslint/no-explicit-any */
import { ValidatedAPIGatewayProxyEvent } from '@libs/api-gateway';
import { MiddyfiedHandler } from '@middy/core';
import {
  APIGatewayEventRequestContextWithAuthorizer,
  APIGatewayProxyEventPathParameters,
  APIGatewayProxyEventQueryStringParameters,
  APIGatewayProxyResult,
  Callback,
  Context,
} from 'aws-lambda';

export const requestContext = {
  authorizer: {
    claims: {
      email: 'test-ckl@dev.coworklib.com',
      sub: 'a83c6422-2d34-4366-84f9-d3a4a336d61d',
    },
  },
};

export function generateValidatedAPIGatewayProxyEvent<S>(event: {
  body?: S;
  pathParameters?: APIGatewayProxyEventPathParameters;
  queryStringParameters?: APIGatewayProxyEventQueryStringParameters;
  claims?: { email: string; sub: string };
}): ValidatedAPIGatewayProxyEvent<S> {
  return {
    headers: {},
    requestContext: {
      authorizer: {
        claims: event.claims || requestContext.authorizer.claims,
      },
    } as APIGatewayEventRequestContextWithAuthorizer<unknown>,
    pathParameters: event.pathParameters,
    queryStringParameters: event.queryStringParameters,
    body: event.body,
  } as ValidatedAPIGatewayProxyEvent<S>;
}

export async function executeLambda(
  main: MiddyfiedHandler<any, APIGatewayProxyResult, Error, Context>,
  event: any,
): Promise<APIGatewayProxyResult> {
  return (await main(event, {} as Context, {} as Callback)) as APIGatewayProxyResult;
}
