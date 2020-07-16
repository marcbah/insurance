import ApolloClient from "apollo-client";
import {InMemoryCache} from "apollo-cache-inmemory";
import {HttpLink} from "apollo-link-http";
import {graphQlServiceUrl} from "../config";

const cache = new InMemoryCache();
const link = new HttpLink({
    uri: `${graphQlServiceUrl}`
});

export const GraphQlClientApi = new ApolloClient({
    cache,
    link
});