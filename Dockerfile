FROM python:3.12-alpine

LABEL org.opencontainers.image.vendor="Harbormaster"
LABEL org.opencontainers.image.title="demo"
LABEL org.opencontainers.image.version="1.0.0"
LABEL com.harbormaster.blueprint="Angular-22"
LABEL com.harbormaster.model="Banking Industry Domain Model"
LABEL com.harbormaster.generated="2026-11-14"
#LABEL com.harbormaster.certification="503a0efd-c88b-411e-b193-e905879bb30d"

WORKDIR /app

COPY . .

EXPOSE 8080

CMD ["python3", "-m", "http.server", "8080", "--bind", "0.0.0.0", "--directory", "src"]