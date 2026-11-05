
FROM python:3.13-slim

LABEL org.opencontainers.image.vendor="Harbormaster"
LABEL org.opencontainers.image.title="demo"
LABEL org.opencontainers.image.version="1.0.0"
LABEL com.harbormaster.blueprint="Django"
LABEL com.harbormaster.model="Banking Industry Domain Model"
LABEL com.harbormaster.generated="2026-11-05"
#LABEL com.harbormaster.certification="${certificationIdentifier}"

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


chmod +x .venv/bin/python

EXPOSE 8000 8080

CMD ["./.venv/bin/python", "demo/manage.py", "runserver", "0.0.0.0:8000"]
