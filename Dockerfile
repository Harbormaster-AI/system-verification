FROM golang:1.22-alpine AS builder

LABEL org.opencontainers.image.vendor="Harbormaster"
LABEL org.opencontainers.image.title="demo"
LABEL org.opencontainers.image.version="1.0.0"
LABEL com.harbormaster.blueprint="Golang"
LABEL com.harbormaster.model="Banking Industry Domain Model"
LABEL com.harbormaster.generated="2026-09-12"
#LABEL com.harbormaster.certification="${certificationIdentifier}"

WORKDIR /app

COPY bin/demo .

RUN chmod +x demo

EXPOSE 8080

ENTRYPOINT ["./demo"]