import { IGraphAPIClientOptions } from "../graph-api/interfaces";
import { IToolsAPIClientOptions } from "../tools-api";

export interface ITestSDKClientCreateOptions {
  graphAPI?: IGraphAPIClientOptions;
  toolsAPI?: IToolsAPIClientOptions;
}
