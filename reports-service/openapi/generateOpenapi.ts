import openapi from './openapi';

// ### Generate client side API by running this script with the command :
// npx ts-node generateOpenapi.ts

const openapiFile = '_openapi.json';

(async () => {
  try {
    const fs = require('fs').promises;
    await fs.writeFile(openapiFile, JSON.stringify(openapi));
    await execShellCommand('rm -rf ../../ui/dist/reports-service-sdk')
    await execShellCommand('npx @openapitools/openapi-generator-cli generate -i ' + openapiFile + ' -g typescript-angular -o ../../ui/dist/reports-service-sdk -c openapi-conf.json')
  } catch (error) {
    console.log(error)
  }
})()


/**
 * Executes a shell command and return it as a Promise.
 * @param cmd {string}
 * @return {Promise<string>}
 */
function execShellCommand(cmd: string) {
  const exec = require('child_process').exec;
  return new Promise((resolve, reject) => {
    exec(cmd, (error: string, stdout: string, stderr: string) => {
      if (error) {
        reject(error);
      }
      resolve(stdout ? stdout : stderr);
    });
  });
}
