import { TestSDKClient } from "@deepcrawl/test-nodejs-sdk";

console.log("test");

(async (): Promise<void> => {
  const [, , ...args] = process.argv;
  const userKeyId = args[0];
  const userKeySecret = args[1];
  const testSDKClient = TestSDKClient.create();
  await testSDKClient.runBuild({ userKeyId, userKeySecret, testSuiteId: args[2] });
})()
  .then(() => {
    console.log("done");
  })
  .catch(e => {
    console.log(e);
  });
