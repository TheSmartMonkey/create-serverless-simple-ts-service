import { ValidatedEventAPIGatewayProxyEvent } from '../../libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

const version: ValidatedEventAPIGatewayProxyEvent<void> = async () => {
  return formatJSONResponse({
    githash: `${process.env.GIT_VERSION}`,
    deployDate: `${process.env.DEPLOY_DATE}`,
  });
}

export const main = middyfy(version);
