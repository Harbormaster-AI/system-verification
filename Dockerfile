
FROM node:22-alpine

LABEL org.opencontainers.image.vendor="Harbormaster"
LABEL org.opencontainers.image.title="iotonapollo"
LABEL org.opencontainers.image.version="0.0.1"
LABEL com.harbormaster.blueprint="Apollo GraphQL"
LABEL com.harbormaster.model="IoT Industry Domain Model"
LABEL com.harbormaster.generated="2026-09-15"
#LABEL com.harbormaster.certification="baa3979d-674c-44da-ab9a-5edcc33f79b9"

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY dist ./dist

EXPOSE 4000

CMD ["node", "dist/server.js"]