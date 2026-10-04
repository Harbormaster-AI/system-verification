
FROM python:3.13-slim

LABEL org.opencontainers.image.vendor="Harbormaster"
LABEL org.opencontainers.image.title="bankingOnDjango"
LABEL org.opencontainers.image.version="0.0.1"
LABEL com.harbormaster.blueprint="Django"
LABEL com.harbormaster.model="Banking Industry Domain Model"
LABEL com.harbormaster.generated="2026-10-04"
#LABEL com.harbormaster.certification="e4383178-7e42-4de5-8813-9116bb8baee2"

COPY . .
RUN echo "=== INSIDE IMAGE AFTER COPY ===" && \
    echo "--- / ---" && \
    ls -la / && \
    echo "--- /bankingOnDjango ---" && \
    ls -la /bankingOnDjango || true && \
    echo "--- Find .venv ---" && \
    find / -maxdepth 4 -type d -name ".venv" -print 2>/dev/null || true && \
    echo "--- Find python executables ---" && \
    find / -maxdepth 6 -type f -path "*/.venv/bin/python*" -print 2>/dev/null || true
ENV PYTHONPATH=/

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
       pkg-config \
       default-libmysqlclient-dev \
       build-essential \
    && rm -rf /var/lib/apt/lists/*

chmod +x .venv/bin/python

EXPOSE 8000 8080

CMD ["./.venv/bin/python", "bankingOnDjango/manage.py", "runserver", "0.0.0.0:8000"]
