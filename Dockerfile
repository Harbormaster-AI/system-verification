FROM eclipse-temurin:17-jre

LABEL org.opencontainers.image.vendor="Harbormaster"
LABEL org.opencontainers.image.title="bankingOnSpringboot"
LABEL org.opencontainers.image.version="0.0.1"
LABEL com.harbormaster.blueprint="Spring Boot 3.5"
LABEL com.harbormaster.model="Banking Industry Domain Model"
LABEL com.harbormaster.generated="2026-09-22"
#LABEL com.harbormaster.certification="fc5b34b5-2638-4cf7-b4bb-e1547d8aad77"

RUN groupadd --system spring && useradd --system --gid spring spring
USER spring:spring

ARG JAR_FILE_RELATIVE_LOCATION=.
ARG JAR_FILE=${JAR_FILE_RELATIVE_LOCATION}/*.jar

COPY ${JAR_FILE} app.jar

EXPOSE 8080

ENTRYPOINT ["java","-jar","/app.jar"]