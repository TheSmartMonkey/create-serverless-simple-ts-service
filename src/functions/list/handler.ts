import { formatJSONResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { listReport } from '@libs/services/reports/reports.handler';

const list: ValidatedEventAPIGatewayProxyEvent<void> = async () => {
  const data = await listReport();

  return formatJSONResponse({
    data,
  });
};

export const main = middyfy(list);
