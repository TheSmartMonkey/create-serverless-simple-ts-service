import type { AWS } from '@serverless/typescript';

import del from '@functions/del';
import update from '@functions/update';
import get from '@functions/get';
import list from '@functions/list';
import create from '@functions/create';
import version from '@functions/version';

import dynamodbTables from 'resources/dynamodb-tables';

import { getGitCommitHash } from 'src/libs/git-tools';


const serverlessConfiguration: AWS = {
  service: 'reports-service',

  frameworkVersion: '>=2.38.0 <3.0.0',

  variablesResolutionMode: '20210326',

  custom: {
    stage: '${opt:stage, env:AWS_STAGE}',
    envType: '${env:ENV_TYPE, "dev"}',
    region: '${opt:region, env:AWS_REGION, "eu-west-3"}',
    prefix: '${self:custom.stage}-${self:service}',
    reportsTable: '${self:custom.stage}-${self:service}-reports-table',
    hostedZoneName: '${env:HOSTED_ZONE, "${self:custom.envType}.typescript-msl.ml"}',
    apiDomainName: 'api.${self:custom.hostedZoneName}',
    apiBasePath: 'api-${self:custom.stage}-${self:service}',
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
  },

  plugins: ['serverless-webpack'],

  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    stage: '${self:custom.stage}',
    region: "eu-west-3",
    deploymentBucket: {
      name: 'winoa-${self:custom.envType}-${self:provider.region}-deploy',
    },
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      REPORTS_TABLE: '${self:custom.reportsTable}',
      GIT_VERSION: getGitCommitHash(),
      DEPLOY_DATE: new Date().toISOString(),
    },
    iam: {
      role: {
        statements: [
          {
              Effect: 'Allow',
              Action: [
                  'dynamodb:DescribeTable',
                  'dynamodb:Query',
                  'dynamodb:Scan',
                  'dynamodb:GetItem',
                  'dynamodb:PutItem',
                  'dynamodb:UpdateItem',
                  'dynamodb:DeleteItem'
              ],
              Resource: [
                  {"Fn::GetAtt": [ 'ReportsDynamoDbTable', 'Arn' ]}
              ]
          },
        ],
      },
    },
    lambdaHashingVersion: '20201221',
  },

  package: {
    individually: true, // Optimise performance
  },

  // import the function via paths
  functions: {
    version,
    create,
    list,
    get,
    update,
    del,
  },

  resources: {
    Resources: Object.assign(dynamodbTables),
    Outputs: {
      ApiURL: {
        Value: 'https://${self:custom.apiDomainName}/${self:custom.apiBasePath}'
      }
    }
  }
};

module.exports = serverlessConfiguration;
