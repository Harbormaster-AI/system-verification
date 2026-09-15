
FROM golang:1.22-alpine AS builder

LABEL org.opencontainers.image.vendor="Harbormaster"
LABEL org.opencontainers.image.title="iotOnGolang"
LABEL org.opencontainers.image.version="0.0.1"
LABEL com.harbormaster.blueprint="Golang"
LABEL com.harbormaster.model="IoT Industry Domain Model"
LABEL com.harbormaster.generated="2026-09-15"
#LABEL com.harbormaster.certification="6b0d4f79-cb9a-4568-a683-28cda6256ed3"

WORKDIR /app

COPY bin/iotOnGolang .

RUN chmod +x iotOnGolang

EXPOSE 8080

ENTRYPOINT ["./iotOnGolang"]