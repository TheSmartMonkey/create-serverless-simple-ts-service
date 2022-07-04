import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { ValidatedEventAPIGatewayProxyEvent } from '../../libs/api-gateway';

import { updateReport } from '@libs/services/reports/reports.handler';
import createHttpError from 'http-errors';
import ReportSchema from '../../schemas/reports';

const update: ValidatedEventAPIGatewayProxyEvent<typeof ReportSchema> = async (event) => {
  const reportId = event.body?.id;
  if (!reportId) throw createHttpError(400, 'reportId not provided');

  const data = await updateReport(event.body);

  return formatJSONResponse({
    message: 'report updated',
    data,
  });
};

export const main = middyfy(update);
