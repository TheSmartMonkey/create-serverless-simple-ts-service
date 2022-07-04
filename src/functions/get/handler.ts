import { formatJSONResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { getReport } from '@libs/services/reports/reports.handler';
import createHttpError from 'http-errors';

const get: ValidatedEventAPIGatewayProxyEvent<void> = async (event) => {
  const reportId = event.pathParameters?.id;
  if (!reportId) throw createHttpError(400, 'reportId not provided');

  const data = await getReport(reportId);

  return formatJSONResponse({
    message: 'report found',
    data,
  });
};

export const main = middyfy(get);
