
FROM #Go_Lang_Image() AS builder

LABEL org.opencontainers.image.vendor="Harbormaster"
LABEL org.opencontainers.image.title="iotOnGolang"
LABEL org.opencontainers.image.version="0.0.1"
LABEL com.harbormaster.blueprint="Golang"
LABEL com.harbormaster.model="IoT Industry Domain Model"
LABEL com.harbormaster.generated="2026-09-15"
#LABEL com.harbormaster.certification="152c86cc-dccc-4c6c-93bc-aced8c85418f"

WORKDIR /app

COPY bin/iotOnGolang .

RUN chmod +x iotOnGolang

EXPOSE 8080

ENTRYPOINT ["./iotOnGolang"]