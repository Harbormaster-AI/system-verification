
FROM node:22-alpine

LABEL org.opencontainers.image.vendor="Harbormaster"
LABEL org.opencontainers.image.title="bankingonapollo"
LABEL org.opencontainers.image.version="0.0.1"
LABEL com.harbormaster.blueprint="Apollo GraphQL"
LABEL com.harbormaster.model="Banking Industry Domain Model"
LABEL com.harbormaster.generated="2026-09-24"
#LABEL com.harbormaster.certification="1a392863-8f1f-4ec9-a33e-3ae1b3def6f8"

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY dist ./dist

EXPOSE 4000

CMD ["node", "dist/server.js"]