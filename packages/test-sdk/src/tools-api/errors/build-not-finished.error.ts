import { BaseError } from "../../_common/errors/base.error";

export class BuildNotFinishedError extends BaseError {
  constructor() {
    super("Build is not finished.");
  }
}
