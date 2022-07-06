export enum BuildStatus {
  Aborted = "Aborted",
  Cancelled = "Cancelled",
  Finished = "Finished",
  Queued = "Queued",
  Running = "Running",
}

export interface IPollBuildResultsResponse {
  status: BuildStatus;
  passed: boolean;
}
