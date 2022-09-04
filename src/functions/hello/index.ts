import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  memorySize: 256,
  events: [
    {
      http: {
        method: 'get',
        path: 'message/{message}/hello',
      },
    },
  ],
};
