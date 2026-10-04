
FROM python:3.13-slim

LABEL org.opencontainers.image.vendor="Harbormaster"
LABEL org.opencontainers.image.title="bankingOnDjango"
LABEL org.opencontainers.image.version="0.0.1"
LABEL com.harbormaster.blueprint="Django"
LABEL com.harbormaster.model="Banking Industry Domain Model"
LABEL com.harbormaster.generated="2026-10-04"
#LABEL com.harbormaster.certification="837875a4-d4ca-4381-9651-2a0cefbedf37"

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

CMD ["./.venv/bin/python", "manage.py", "runserver", "0.0.0.0:8000"]
