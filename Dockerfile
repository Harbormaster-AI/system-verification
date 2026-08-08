
FROM golang:1.22-alpine AS builder

LABEL org.opencontainers.image.vendor="Harbormaster"
LABEL org.opencontainers.image.title="WealthManagement-on-golang"
LABEL org.opencontainers.image.version="0.0.1"
LABEL com.harbormaster.blueprint="Golang"
LABEL com.harbormaster.model="Wealth Management Capabilities Model"
LABEL com.harbormaster.generated="2026-08-08"
#LABEL com.harbormaster.certification="${certificationIdentifier}"

WORKDIR /app

COPY bin/WealthManagementongolang .

RUN chmod +x WealthManagementongolang

EXPOSE 8080

ENTRYPOINT ["./WealthManagementongolang"]