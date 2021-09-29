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
  console.log("test");
  const args = parse<IRunBuildArguments>(
    {
      testSuiteId: String,
      userKeyId: { type: String, optional: true },
      userKeySecret: { type: String, optional: true },
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
  testSDKClient.runBuild({ userKeyId, userKeySecret, testSuiteId, ciBuildId, isStartOnly });
})().then(() => {});
