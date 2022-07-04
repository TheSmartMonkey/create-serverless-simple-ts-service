import { handlerPath } from '@libs/handlerResolver';
import reportSchema from '../../schema/reports';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'put',
        path: 'reports/{id}',
        request: {
          schemas: {
            'application/json': reportSchema,
          },
        },
      },
    },
  ],
};
