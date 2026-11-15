
FROM node:22-alpine

LABEL org.opencontainers.image.vendor="Harbormaster"
LABEL org.opencontainers.image.title="demo"
LABEL org.opencontainers.image.version="1.0.0"
LABEL com.harbormaster.blueprint="Apollo GraphQL"
LABEL com.harbormaster.model="Banking Industry Domain Model"
LABEL com.harbormaster.generated="2026-11-15"
#LABEL com.harbormaster.certification="241a323c-a4dd-41da-898b-78882d9de753"

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY dist ./dist

EXPOSE 4000 8080

CMD ["node", "dist/server.js"]