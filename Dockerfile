
FROM golang:1.27.4-bookworm AS builder

LABEL org.opencontainers.image.vendor="Harbormaster"
LABEL org.opencontainers.image.title="demo"
LABEL org.opencontainers.image.version="1.0.0"
LABEL com.harbormaster.blueprint="Golang"
LABEL com.harbormaster.model="Banking Industry Domain Model"
LABEL com.harbormaster.generated="2026-11-15"
#LABEL com.harbormaster.certification="004ad4ab-14ca-45f9-b72b-ff5c1cce3daf"

WORKDIR /app

COPY bin/demo .

RUN chmod +x demo

EXPOSE 8080

ENTRYPOINT ["./demo"]