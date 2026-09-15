
FROM #Go_Lang_Image() AS builder

LABEL org.opencontainers.image.vendor="Harbormaster"
LABEL org.opencontainers.image.title="iotOnGolang"
LABEL org.opencontainers.image.version="0.0.1"
LABEL com.harbormaster.blueprint="Golang"
LABEL com.harbormaster.model="IoT Industry Domain Model"
LABEL com.harbormaster.generated="2026-09-14"
#LABEL com.harbormaster.certification="869ab2a2-c7c1-471f-a00c-394d73d15be3"

WORKDIR /app

COPY bin/iotOnGolang .

RUN chmod +x iotOnGolang

EXPOSE 8080

ENTRYPOINT ["./iotOnGolang"]