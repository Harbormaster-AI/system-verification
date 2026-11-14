
FROM golang:1.27.4-bookworm AS builder

LABEL org.opencontainers.image.vendor="Harbormaster"
LABEL org.opencontainers.image.title="demo"
LABEL org.opencontainers.image.version="1.0.0"
LABEL com.harbormaster.blueprint="Golang"
LABEL com.harbormaster.model="Banking Industry Domain Model"
LABEL com.harbormaster.generated="2026-11-14"
#LABEL com.harbormaster.certification="36dcd100-6699-435e-9141-5404269f28b4"

WORKDIR /app

COPY bin/demo .

RUN chmod +x demo

EXPOSE 8080

ENTRYPOINT ["./demo"]