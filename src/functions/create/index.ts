import { handlerPath } from '@libs/handler-resolver';
import ReportSchema from '../../schemas/reports';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'reports',
        request: {
          schemas: {
            'application/json': ReportSchema,
          },
        },
      },
    },
  ],
};
