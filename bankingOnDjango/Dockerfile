
FROM python:3.13-slim

LABEL org.opencontainers.image.vendor="Harbormaster"
LABEL org.opencontainers.image.title="bankingOnDjango"
LABEL org.opencontainers.image.version="0.0.1"
LABEL com.harbormaster.blueprint="Django"
LABEL com.harbormaster.model="Banking Industry Domain Model"
LABEL com.harbormaster.generated="2026-10-03"
#LABEL com.harbormaster.certification="09b538ee-c11e-404e-91bf-f4c70d487114"

WORKDIR /app

COPY . /app/

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
       pkg-config \
       default-libmysqlclient-dev \
       build-essential \
    && rm -rf /var/lib/apt/lists/*

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 8000 8080

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]