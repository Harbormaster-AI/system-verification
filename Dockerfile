
FROM node:22-alpine

LABEL org.opencontainers.image.vendor="Harbormaster"
LABEL org.opencontainers.image.title="demo"
LABEL org.opencontainers.image.version="1.0.0"
LABEL com.harbormaster.blueprint="Apollo GraphQL"
LABEL com.harbormaster.model="Banking Industry Domain Model"
LABEL com.harbormaster.generated="2026-11-18"
#LABEL com.harbormaster.certification="98ef231d-8bc4-47a8-a237-ac1e3d864254"

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY dist ./dist

EXPOSE 4000 8080

CMD ["node", "dist/server.js"]