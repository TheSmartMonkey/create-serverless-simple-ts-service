import reportSchema from '../../schema/reports';
import { handlerPath } from '@libs/handlerResolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'reports',
        request: {
          schemas: {
            'application/json': reportSchema,
          },
        },
      },
    },
  ],
};
