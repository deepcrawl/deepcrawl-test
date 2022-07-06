import axios, { AxiosResponse } from "axios";

import { MAX_POLLING_TIME, POLLING_INTERVAL } from "../_common/constants";
import { sleep } from "../_common/helpers/sleep.helper";
import { loggerService } from "../_common/services/logger.service";

import { BuildNotFinishedError, BuildResultPollingTimeoutError } from "./errors";
import {
  BuildStatus,
  IPollBuildResultsResponse,
  IStartBuildResponse,
  IToolsAPIClient,
  IToolsAPIClientOptions,
} from "./interfaces";

enum ToolsAPIRoute {
  StartBuild,
  PollBuildResults,
}

interface IRequestParameters {
  route: ToolsAPIRoute;
  body: Record<string, unknown>;
}

export class ToolsAPIClient implements IToolsAPIClient {
  private routes: Map<ToolsAPIRoute, string>;

  constructor(options?: IToolsAPIClientOptions) {
    this.routes = this.initRoutes(options);
  }

  private initRoutes(options?: Pick<IToolsAPIClientOptions, "url">): Map<ToolsAPIRoute, string> {
    const routes = new Map<ToolsAPIRoute, string>();
    const url = options?.url ?? "https://tools.automator.deepcrawl.com";
    routes.set(ToolsAPIRoute.StartBuild, new URL("/start", url).toString());
    routes.set(ToolsAPIRoute.PollBuildResults, new URL("/poller", url).toString());
    return routes;
  }

  public async startBuild(authToken: string, testSuiteId: string, ciBuildId?: string): Promise<string> {
    const response = await this.makePostRequest<IStartBuildResponse>({
      route: ToolsAPIRoute.StartBuild,
      body: {
        authToken,
        testSuiteId,
        ciBuildId,
      },
    });
    return response.data.buildId;
  }

  public async poll(
    token: string,
    buildId: string,
    currentRunTime = 0,
    options = { pollingInterval: POLLING_INTERVAL, maxPollingTime: MAX_POLLING_TIME },
  ): Promise<void> {
    try {
      const results = await this.getResults(token, buildId);
      this.logResults(results);
    } catch (e) {
      if (!(e instanceof BuildNotFinishedError)) throw e;
      loggerService.info("Waiting for DeepCrawl Test Results ...");
      if (currentRunTime > options.maxPollingTime) throw new BuildResultPollingTimeoutError(options.maxPollingTime);
      await sleep(options.pollingInterval);
      return this.poll(token, buildId, currentRunTime + options.pollingInterval);
    }
  }

  private async getResults(token: string, buildId: string): Promise<IPollBuildResultsResponse> {
    const response = await this.makePostRequest<IPollBuildResultsResponse>({
      route: ToolsAPIRoute.PollBuildResults,
      body: {
        authToken: token,
        buildId,
      },
    });
    if (response.status !== 200) throw new BuildNotFinishedError();
    return response.data;
  }

  private makePostRequest<T>(parameters: IRequestParameters): Promise<AxiosResponse<T>> {
    const routeURL = this.routes.get(parameters.route);
    if (!routeURL) throw new Error("Route URL not available");
    return axios.post<T>(routeURL, JSON.stringify(parameters.body), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  private logResults({ passed: didTestsPass, status }: IPollBuildResultsResponse): void {
    if (status === BuildStatus.Aborted || status === BuildStatus.Cancelled) {
      loggerService.info(`Build was ${status}`);
    } else {
      loggerService.info(`DeepCrawl Tests ${didTestsPass ? "Passed" : "Failed"}`);
    }
  }
}
