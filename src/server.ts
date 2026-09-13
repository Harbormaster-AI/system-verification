import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { typeDefs } from "./graphql/schema";
import { resolvers } from "./graphql/resolvers";
import { HttpBackendAPI } from "./backend/http-apis";

const backend = new HttpBackendAPI();

const server = new ApolloServer({
    typeDefs,
    resolvers
});

const { url } = await startStandaloneServer(server, {
    listen: {
        port: Number(process.env.PORT) || 4000
    },
    context: async () => ({
        backend
    })
});

console.log(`Apollo Server running at ${url}`);