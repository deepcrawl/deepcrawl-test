import { ApolloClient, HttpLink, InMemoryCache, NormalizedCacheObject } from "@apollo/client/core";
import fetch from "node-fetch";

import { deleteAuthTokenGQL } from "./gql/delete-auth-token.gql";
import { getAuthTokenGQL } from "./gql/get-auth-token.gql";
import { IGraphAPIClientOptions } from "./interfaces/graph-api-client-options.interface";
import { IGraphAPIClient } from "./interfaces/graph-api-client.interface";

export class GraphAPIClient implements IGraphAPIClient {
  private readonly apolloClient: ApolloClient<NormalizedCacheObject>;

  constructor(options?: IGraphAPIClientOptions) {
    this.apolloClient = new ApolloClient({
      cache: new InMemoryCache(),
      link: new HttpLink({
        uri: options?.url ?? "https://api.lumar.io/graphql",
        // TODO: https://github.com/apollographql/apollo-link/issues/513
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        fetch: <any>fetch,
      }),
    });
  }

  public async getAuthToken(userKeyId: string, userKeySecret: string): Promise<string> {
    const response = await this.apolloClient.mutate({
      mutation: getAuthTokenGQL,
      variables: {
        userKeyId,
        userKeySecret,
      },
    });
    return <string>response.data.createSessionUsingUserKey.token;
  }

  public async deleteAuthToken(token: string): Promise<string> {
    const response = await this.apolloClient.mutate({
      mutation: deleteAuthTokenGQL,
      context: {
        headers: {
          "X-Auth-Token": token,
        },
      },
    });
    return <string>response.data.deleteSession.token;
  }
}
