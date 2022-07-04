import { formatJSONResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import createHttpError from 'http-errors';

import { createReport } from '@libs/services/reports/reports.handler';
import ReportSchema from '../../schemas/reports';

const create: ValidatedEventAPIGatewayProxyEvent<typeof ReportSchema> = async (event) => {
  const name = event.body.name;
  if (!name) throw createHttpError(400, 'name not provided');

  const data = await createReport(event.body);

  return formatJSONResponse(
    {
      message: 'report created',
      data,
    },
    201,
  );
};

export const main = middyfy(create);
