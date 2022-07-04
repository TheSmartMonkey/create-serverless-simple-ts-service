import { formatJSONResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { deleteReport } from '@libs/services/reports/reports.handler';
import createHttpError from 'http-errors';

const del: ValidatedEventAPIGatewayProxyEvent<void> = async (event) => {
  const reportId = event.pathParameters?.id;
  if (!reportId) throw createHttpError(400, 'reportId not provided');

  await deleteReport(reportId);

  return formatJSONResponse(
    {
      message: 'report deleted',
    },
    204,
  );
};

export const main = middyfy(del);
