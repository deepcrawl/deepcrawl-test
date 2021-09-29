import { TestSDKClient } from "@deepcrawl/test-nodejs-sdk";
import { parse } from "ts-command-line-args";

interface IRunBuildArguments {
  testSuiteId: string;
  userKeyId?: string;
  userKeySecret?: string;
  ciBuildId?: string;
  startOnly?: boolean;
  help?: boolean;
}

(async (): Promise<void> => {
  const args = parse<IRunBuildArguments>(
    {
      testSuiteId: { type: String, description: "The test suite id." },
      userKeyId: {
        type: String,
        optional: true,
        description: "The user key id, which can be provided as env variable DEEPCRAWL_TEST_USER_KEY_ID.",
      },
      userKeySecret: {
        type: String,
        optional: true,
        description: "The user key secret, which can be provided as env variable DEEPCRAWL_TEST_USER_KEY_SECRET.",
      },
      ciBuildId: { type: String, optional: true, description: "The corresponding CI Build ID." },
      startOnly: {
        type: Boolean,
        optional: true,
        description: "Only starts the build without waiting for it to finish.",
      },
      help: { type: Boolean, optional: true, alias: "h", description: "Prints this usage guide." },
    },
    {
      helpArg: "help",
    },
  );
  const userKeyId = args.userKeyId ?? process.env.DEEPCRAWL_TEST_USER_KEY_ID ?? "";
  const userKeySecret = args.userKeySecret ?? process.env.DEEPCRAWL_TEST_USER_KEY_SECRET ?? "";
  const testSDKClient = TestSDKClient.create();
  const { testSuiteId, ciBuildId, startOnly: isStartOnly } = args;
  await testSDKClient.runBuild({ userKeyId, userKeySecret, testSuiteId, ciBuildId, isStartOnly });
})()
  .then(() => {})
  .catch(console.log);
