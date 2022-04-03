# Fundraising API

This is an example of typescript lambda REST API that interacts with elrond blockchain.

It is not meant to be used as is (for example private wallet key and mnemonic are exposed through the API).

The `openapi/api-integration-test.spec.ts` can be a good starting point to understand the possible use of the API.

`getContractName` and `giveMoney` lambda are not currently used by the UI through the API, there are just here to
demonstrate how to query a smartcontract and how to transfer ergld between two wallets.
There is no example linked to `ESDT` in this directory, but you can find one in `erdjs-examples/src/esdt-tokens.ts`.

## Installation/deployment instructions

- Run `npm i` to install the project dependencies
- Run `npm run deploy` to deploy this stack to AWS
- Run `npm dynamodb install` to init the .dynamodb folder for offline developement

## Local developement

To develope locally new features we use serverless-offline with serverless-dynamodb-local

To use it launch your micro-service with this command :

```bash
sls offline start
```

## Test your service

### Unit test

Run tests one time with code coverage:
`npm test`

Run tests one time with code coverage:
`npm coverage`

Rerun tests on file modification :
`npm run watch`

You can change the log level with `LOG_LEVEL=trace npm test`

### Integration tests

`npm run integration`
### Manual test locally

In order to test the lambda functions locally, after you have deployed the stack a first times
for dependencies like dynamodb, run the following command:

- `npx sls invoke local -f create --path src/functions/create/mock.json`
- `npx sls invoke local -f del --path src/functions/del/mock.json`
- `npx sls invoke local -f get --path src/functions/get/mock.json`
- `npx sls invoke local -f list --path src/functions/list/mock.json`
- `npx sls invoke local -f update --path src/functions/update/mock.json`
- `npx sls invoke local -f version --path src/functions/version/mock.json`

Check the [sls invoke local command documentation](https://www.serverless.com/framework/docs/providers/aws/cli-reference/invoke-local/) for more information.

## Search logs in cloudwatch

You can use [cloudwatch inside](https://eu-west-3.console.aws.amazon.com/cloudwatch/home?logsV2:logs-insights) to search logs.
Example of requests :

- Filter logs by status code :
```
fields @timestamp, @message
| sort @timestamp desc
| filter response.statusCode = "200"
| limit 1000
```

- Filter logs by log level :
```
fields @timestamp, @message
| sort @timestamp desc
| filter level >= 30
| limit 1000
```

- Filter logs linked to a specific fundraisingId
```
fields @timestamp, @message
| sort @timestamp desc
| filter fundraisingId = "50424390-15fa-11ec-89cb-d7dc640e8205"
| limit 1000
```

## Template features

### Exemple project structure

The project code base is mainly located within the `src` folder. This folder is divided in:

- `functions` - containing code base and configuration for your lambda functions
- `libs` - containing shared code base between your lambdas

```
.
├── src
│   ├── functions               # Lambda configuration and source code folder
│   │   ├── hello
│   │   │   ├── handler.ts      # `Hello` lambda source code
│   │   │   ├── index.ts        # `Hello` lambda Serverless configuration
│   │   │   ├── mock.json       # `Hello` lambda input parameter, if any, for local invocation
│   │   │   └── schema.ts       # `Hello` lambda input event JSON-Schema
│   │   │
│   │   └── index.ts            # Import/export of all lambda configurations REMOVED
│   │
│   └── libs                    # Lambda shared code
│       └── apiGateway.ts       # API Gateway specific helpers
│       └── handlerResolver.ts  # Sharable library for resolving lambda handlers
│       └── middyfy.ts           # Middyfy middleware
│
├── package.json
├── serverless.ts               # Serverless service file
├── tsconfig.json               # Typescript compiler configuration
├── tsconfig.paths.json         # Typescript paths
└── webpack.config.js           # Webpack configuration
```

### 3rd party libraries

- [json-schema-to-ts](https://github.com/ThomasAribart/json-schema-to-ts) - uses JSON-Schema definitions used by API Gateway for HTTP request validation to statically generate TypeScript types in your lambda's handler code base
- [middy](https://github.com/middyjs/middy) - middleware engine for Node.Js lambda. This template uses [http-json-body-parser](https://github.com/middyjs/middy/tree/master/packages/http-json-body-parser) to convert API Gateway `event.body` property, originally passed as a stringified JSON, to its corresponding parsed object
- [@serverless/typescript](https://github.com/serverless/typescript) - provides up-to-date TypeScript definitions for your `serverless.ts` service file

