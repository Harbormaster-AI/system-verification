
FROM golang:1.27.4-bookworm AS builder

LABEL org.opencontainers.image.vendor="Harbormaster"
LABEL org.opencontainers.image.title="demo"
LABEL org.opencontainers.image.version="1.0.0"
LABEL com.harbormaster.blueprint="Golang"
LABEL com.harbormaster.model="Banking Industry Domain Model"
LABEL com.harbormaster.generated="2026-11-16"
#LABEL com.harbormaster.certification="c4607296-2172-402e-87c9-793a92e1e105"

WORKDIR /app

COPY bin/demo .

RUN chmod +x demo

EXPOSE 8080

ENTRYPOINT ["./demo"]