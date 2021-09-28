import nock from "nock";

import { BuildResultPollingTimeoutError } from "./errors/build-result-polling-timeout.error";
import { ToolsAPIClient } from "./tools-api-client";

const url = "http://test.com";
const toolsAPIClient = new ToolsAPIClient({ url });

describe("ToolsAPIClient", () => {
  describe("#startBuild", () => {
    it("should throw error if API throws error", async () => {
      nock(url).post("/start").replyWithError("error");
      await expect(toolsAPIClient.startBuild("auth-token", "test-suite-id")).rejects.toEqual(new Error("error"));
    });

    it("should return build id", async () => {
      const authToken = "auth-token";
      const testSuiteId = "test-suite-id";
      const ciBuildId = "ci-build-id";
      const buildId = `${authToken}-${testSuiteId}-${ciBuildId}`;
      nock(url)
        .post("/start")
        .reply(function (_uri, body) {
          expect(body).toEqual({
            authToken,
            testSuiteId,
            ciBuildId,
          });
          expect(this.req.headers["content-type"]).toEqual("application/json");
          return [200, { buildId }];
        });
      expect(await toolsAPIClient.startBuild(authToken, testSuiteId, ciBuildId)).toEqual(buildId);
    });
  });

  describe("#poll", () => {
    it("should throw error if API throws error", async () => {
      nock(url).post("/poller").replyWithError("error");
      await expect(toolsAPIClient.poll("token", "build-id")).rejects.toEqual(new Error("error"));
    });

    it("should end execution if test results have been processed", async () => {
      const authToken = "auth-token";
      const buildId = "build-id";
      nock(url)
        .post("/poller")
        .reply(function (_uri, body) {
          expect(body).toEqual({
            authToken,
            buildId,
          });
          expect(this.req.headers["content-type"]).toEqual("application/json");
          return [200, { passed: true }];
        });
      await toolsAPIClient.poll(authToken, buildId);
    });

    it("should throw error if max polling time reached", async () => {
      nock(url).post("/poller").reply(202);
      await expect(
        toolsAPIClient.poll("token", "build-id", 1, { pollingInterval: 1, maxPollingTime: 0 }),
      ).rejects.toEqual(new BuildResultPollingTimeoutError(0));
    });

    it("should poll correctly", async () => {
      nock(url)
        .post("/poller")
        .reply(function () {
          nock(url)
            .post("/poller")
            .reply(function () {
              expect(true).toEqual(true);
              return [200, { passed: true }];
            });
          return [202];
        });
      await toolsAPIClient.poll("token", "build-id", 0, { pollingInterval: 1, maxPollingTime: 10 });
    });
  });
});
