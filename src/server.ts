import express from "express";
import http from "http";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

import { typeDefs } from "./graphql/schema.js";
import { resolvers } from "./graphql/resolvers.js";
import { HttpBackendAPI } from "./backend/http-api.js";

const backend = new HttpBackendAPI();

const app = express();

const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [
    ApolloServerPluginDrainHttpServer({
      httpServer,
    }),
  ],
});

await server.start();

app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "UP",
  });
});

app.use(
  "/",
  cors(),
  express.json(),
  expressMiddleware(server, {
    context: async () => ({
      backend,
    }),
  }),
);

const port = Number(process.env.PORT) || 4000;

httpServer.listen(port, () => {
  console.log(`Apollo Server running at http://localhost:${port}/`);
});
