# serverless

Template of a simple serverless ts api service with dynamodb 

## Installation

```bash
npx degit https://github.com/TheSmartMonkey/create-serverless-simple-ts-service serverless-ts-service
```

Changes to be done

1. serverless.ts service name

1. package.json config name

## Manual test locally

In order to test the lambda functions locally, after you have deployed the stack a first times
for dependencies like dynamodb, run the following command:

`OFFLINE=true npx sls invoke local -f create --path src/functions/create/mock.json`
`npx sls invoke local -f del --path src/functions/del/mock.json`
`npx sls invoke local -f get --path src/functions/get/mock.json`
`npx sls invoke local -f list --path src/functions/list/mock.json`
`npx sls invoke local -f update --path src/functions/update/mock.json`
`npx sls invoke local -f version --path src/functions/version/mock.json`

Check the [sls invoke local command documentation](https://www.serverless.com/framework/docs/providers/aws/cli-reference/invoke-local/) for more information.
