import { GraphAPIClient } from "./graph-api/graph-api-client";
import { IGraphAPIClient } from "./graph-api/interfaces/graph-api-client.interface";
import { ITestSDKClientCreateOptions } from "./interfaces/test-sdk-client-create-options.interface";
import { IToolsAPIClient } from "./tools-api/interfaces/tools-api-client.interface";
import { ToolsAPIClient } from "./tools-api/tools-api-client";

export interface IRunBuildOptions {
  userKeyId: string;
  userKeySecret: string;
  testSuiteId: string;
  ciBuildId?: string;
  isStartOnly?: boolean;
}

export class TestSDKClient {
  constructor(private readonly graphAPIClient: IGraphAPIClient, private readonly toolsAPIClient: IToolsAPIClient) {}

  public static create(options?: ITestSDKClientCreateOptions): TestSDKClient {
    const graphAPIClient = new GraphAPIClient(options?.graphAPI);
    const toolsAPIClient = new ToolsAPIClient(options?.toolsAPI);
    return new TestSDKClient(graphAPIClient, toolsAPIClient);
  }

  public async runBuild({
    userKeyId,
    userKeySecret,
    testSuiteId,
    ciBuildId,
    isStartOnly,
  }: IRunBuildOptions): Promise<void> {
    const token = await this.graphAPIClient.getAuthToken(userKeyId, userKeySecret);
    try {
      const buildId = await this.toolsAPIClient.startBuild(token, testSuiteId, ciBuildId);
      if (!isStartOnly) await this.toolsAPIClient.poll(token, buildId);
    } finally {
      await this.graphAPIClient.deleteAuthToken(token);
    }
  }
}
