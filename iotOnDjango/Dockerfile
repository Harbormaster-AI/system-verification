
FROM python:3.13-slim

LABEL org.opencontainers.image.vendor="Harbormaster"
LABEL org.opencontainers.image.title="iotOnDjango"
LABEL org.opencontainers.image.version="0.0.1"
LABEL com.harbormaster.blueprint="Django"
LABEL com.harbormaster.model="IoT Industry Domain Model"
LABEL com.harbormaster.generated="2026-09-15"
#LABEL com.harbormaster.certification="18112758-0aee-443e-8211-6acf5650d4ea"

WORKDIR /app

COPY . /app/

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
       pkg-config \
       default-libmysqlclient-dev \
       build-essential \
    && rm -rf /var/lib/apt/lists/* \

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]