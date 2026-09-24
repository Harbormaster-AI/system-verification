
FROM python:3.13-slim

LABEL org.opencontainers.image.vendor="Harbormaster"
LABEL org.opencontainers.image.title="bankingOnDjango"
LABEL org.opencontainers.image.version="0.0.1"
LABEL com.harbormaster.blueprint="Django"
LABEL com.harbormaster.model="Banking Industry Domain Model"
LABEL com.harbormaster.generated="2026-09-23"
#LABEL com.harbormaster.certification="a1a8ecbe-4761-4301-8f34-d921127df36c"

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