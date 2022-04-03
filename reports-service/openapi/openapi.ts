import reportSchema from '../src/schema/reports';

export default {
  openapi: "3.0.0",
  info: {
    title: "ReportsAPI",
    description: "Allow to store and retrieve reports.",
    version: "0.0.3",
  },
  servers: [
    {
      url: 'https://onwwsf5wg1.execute-api.eu-west-3.amazonaws.com/' + process.env.AWS_STAGE,
      description: 'API access through API Gateway custom domain',
    },
    {
      url: 'http://localhost:4200/api-' + process.env.AWS_STAGE + '-reports-service',
      description: 'API access through angular ng serve proxy',
    },
    {
      url: 'https://' + process.env.AWS_STAGE + '.' + (process.env.ENV_TYPE || 'dev') + '.winoa-msl.ml/api-' + process.env.AWS_STAGE + '-reports-service',
      description: 'API access through project reverse proxy',
    },
  ],
  components: {
    schemas: {
      Report: reportSchema,
    },
  },
  paths: {
    '/reports': {
      get: {
        summary: "Returns the list of reports.",
        description: "Returns the list of reports.",
        tags: ['ReportsAPI'],
        responses: {
          "200": {
            description: "An array of reports",
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  title: 'get reports response',
                  properties: {
                    data: {
                      type: 'array',
                      title: 'reports array',
                      items: {
                        $ref: '#/components/schemas/Report',
                      },
                    },
                  },
                  required: ['data'],
                },
              },
            }
          },
        }
      },
      post: {
        summary: "Creates a new report.",
        description: "Creates a new report.",
        tags: ['ReportsAPI'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Report',
              },
            },
          }
        },
        responses: {
          "200": {
            description: "The created report",
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  title: 'create report response',
                  properties: {
                    data: {
                      $ref: '#/components/schemas/Report',
                    },
                  },
                  required: ['data'],
                },
              },
            }
          }
        }
      }
    },
    '/reports/{reportId}': {
      get: {
        summary: "Returns the report with the given id.",
        description: "Returns the report with the given id.",
        tags: ['ReportsAPI'],
        parameters: [
          {
            name: "reportId",
            in: "path",
            required: true,
            description: "report id",
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          "200": {
            description: "The report",
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  title: 'get report response',
                  properties: {
                    data: {
                      $ref: '#/components/schemas/Report',
                    },
                  },
                  required: ['data'],
                }
              },
            }
          }
        }
      },
      put: {
        summary: "Updates the report with the given id.",
        description: "Updates the report with the given id.",
        tags: ['ReportsAPI'],
        parameters: [
          {
            name: "reportId",
            in: "path",
            required: true,
            description: "report id",
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Report',
              },
            },
          }
        },
        responses: {
          "200": {
            description: "The updated report",
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  title: 'update report response',
                  properties: {
                    data: {
                      $ref: '#/components/schemas/Report',
                    },
                  },
                  required: ['data'],
                }
              },
            }
          }
        }
      },
      delete: {
        summary: "Deletes the report with the given id.",
        description: "Deletes the report with the given id.",
        tags: ['ReportsAPI'],
        parameters: [
          {
            name: "reportId",
            in: "path",
            required: true,
            description: "report id",
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          "200": {
            description: "The deleted report",
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  title: 'delete report response',
                  properties: {
                    message: {
                      type: "string",
                    },
                  },
                  required: ['data'],
                }
              },
            }
          }
        }
      },
    }
  }
} as const;
