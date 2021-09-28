import * as sinon from "sinon";

import { GraphAPIClientMock } from "./__tests__/mock/graph-api-client.mock";
import { ToolsAPIClientMock } from "./__tests__/mock/tools-api-client.mock";
import { TestSDKClient } from "./test-sdk-client";

const graphAPIClient = new GraphAPIClientMock();
const toolsAPIClient = new ToolsAPIClientMock();
const testSDKClient = new TestSDKClient(graphAPIClient, toolsAPIClient);

const sandbox = sinon.createSandbox();
const deleteAuthTokenSpy = sandbox.spy(graphAPIClient, "deleteAuthToken");
const pollSpy = sandbox.spy(toolsAPIClient, "poll");

beforeEach(() => sandbox.resetHistory());
afterAll(() => sandbox.restore());

describe("TestSDKClient", () => {
  describe("#runBuild", () => {
    it("should throw error if graph api client #getAuthToken throws error", async () => {
      await expect(
        testSDKClient.runBuild({
          userKeyId: "user-key-id-error",
          userKeySecret: "user-key-secret",
          testSuiteId: "test-suite-id",
        }),
      ).rejects.toEqual(new Error("user-key-id-error"));
    });

    it("should throw error and delete token if tools api client #startBuild throws error", async () => {
      const userKeyId = "user-key-id";
      const userKeySecret = "user-key-secret";
      const testSuiteId = "test-suite-id-error";
      const ciBuildId = "ci-build-id";
      await expect(
        testSDKClient.runBuild({
          userKeyId,
          userKeySecret,
          testSuiteId,
          ciBuildId,
        }),
      ).rejects.toEqual(new Error(testSuiteId));
      expect(deleteAuthTokenSpy.calledOnceWith(`${userKeyId}|${userKeySecret}`)).toEqual(true);
    });

    it("should throw error and delete token if tools api client #poll throws error", async () => {
      const userKeyId = "user-key-id";
      const userKeySecret = "user-key-secret";
      const testSuiteId = "test-suite-id-build-error";
      const ciBuildId = "ci-build-id";
      await expect(
        testSDKClient.runBuild({
          userKeyId,
          userKeySecret,
          testSuiteId,
          ciBuildId,
        }),
      ).rejects.toEqual(new Error("build-id-error"));
    });

    it("should not poll and delete token in the end if start build option is set", async () => {
      const userKeyId = "user-key-id";
      const userKeySecret = "user-key-secret";
      const testSuiteId = "test-suite-id";
      const ciBuildId = "ci-build-id";
      await testSDKClient.runBuild({
        userKeyId,
        userKeySecret,
        testSuiteId,
        ciBuildId,
        isStartOnly: true,
      });
      expect(pollSpy.notCalled).toEqual(true);
      expect(deleteAuthTokenSpy.calledOnceWith(`${userKeyId}|${userKeySecret}`)).toEqual(true);
    });

    it("should delete token in the end", async () => {
      const userKeyId = "user-key-id";
      const userKeySecret = "user-key-secret";
      const testSuiteId = "test-suite-id";
      const ciBuildId = "ci-build-id";
      await testSDKClient.runBuild({
        userKeyId,
        userKeySecret,
        testSuiteId,
        ciBuildId,
      });
      expect(deleteAuthTokenSpy.calledOnceWith(`${userKeyId}|${userKeySecret}`)).toEqual(true);
    });
  });
});
