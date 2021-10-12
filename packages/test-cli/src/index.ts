import { TestSDKClient } from "@deepcrawl/test-nodejs-sdk";
import { parse } from "ts-command-line-args";

interface IRunBuildArguments {
  testSuiteId: string;
  userKeyId: string;
  userKeySecret: string;
  ciBuildId?: string;
  startOnly?: boolean;
  help?: boolean;
}

function validateArgs({ testSuiteId, userKeyId, userKeySecret }: IRunBuildArguments): void {
  if (testSuiteId === "") throw new Error("--testSuiteId cannot be empty.");
  if (userKeyId === "") throw new Error("--userKeyId cannot be empty.");
  if (userKeySecret === "") throw new Error("--userKeySecret cannot be empty.");
}

// eslint-disable-next-line max-lines-per-function
(async (): Promise<void> => {
  try {
    const args = parse<IRunBuildArguments>(
      {
        testSuiteId: { type: String, description: "The test suite ID." },
        userKeyId: {
          type: String,
          defaultValue: process.env.DEEPCRAWL_TEST_USER_KEY_ID,
          description: "The user key ID, which can also be provided as env variable DEEPCRAWL_TEST_USER_KEY_ID.",
        },
        userKeySecret: {
          type: String,
          defaultValue: process.env.DEEPCRAWL_TEST_USER_KEY_SECRET,
          description:
            "The user key secret, which can also be provided as env variable DEEPCRAWL_TEST_USER_KEY_SECRET.",
        },
        ciBuildId: { type: String, optional: true, description: "The corresponding build ID in your CI/CD pipeline." },
        startOnly: {
          type: Boolean,
          optional: true,
          description: "Flags if should only start the build without waiting for it to finish.",
        },
        help: { type: Boolean, optional: true, alias: "h", description: "Prints the usage guide." },
      },
      {
        helpArg: "help",
      },
    );
    validateArgs(args);
    const testSDKClient = TestSDKClient.create();
    await testSDKClient.runBuild({ ...args, isStartOnly: args.startOnly });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e.message);
  }
})()
  .then(() => {
    return;
  })
  // eslint-disable-next-line no-console
  .catch(console.log);
