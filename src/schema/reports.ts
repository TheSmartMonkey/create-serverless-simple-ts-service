export default {
  type: "object",
  title: 'Visit report',
  properties: {
    id: {
      type: 'string',
      title: 'report id',
    },
    name: {
      type: 'string',
      title: 'name',
    }
  },
  required: ['name']
} as const;
