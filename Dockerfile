FROM eclipse-temurin:11-jre-alpine

LABEL org.opencontainers.image.vendor="Harbormaster"
LABEL org.opencontainers.image.title="iotOnSpringboot"
LABEL org.opencontainers.image.version="0.0.1"
LABEL com.harbormaster.blueprint="Spring Boot 3.5"
LABEL com.harbormaster.model="IoT Industry Domain Model"
LABEL com.harbormaster.generated="2026-09-15"
#LABEL com.harbormaster.certification="595d4c3f-4985-4759-85dc-cb4e4c54ab08"

RUN addgroup -S spring && adduser -S -G spring spring
USER spring:spring

ARG JAR_FILE_RELATIVE_LOCATION=.
ARG JAR_FILE=${JAR_FILE_RELATIVE_LOCATION}/*.jar

COPY ${JAR_FILE} app.jar

EXPOSE 8080

ENTRYPOINT ["java","-jar","/app.jar"]