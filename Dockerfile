FROM eclipse-temurin:11-jre-alpine

LABEL org.opencontainers.image.vendor="Harbormaster"
LABEL org.opencontainers.image.title="insuranceOnSpringboot"
LABEL org.opencontainers.image.version="0.0.1"
LABEL com.harbormaster.blueprint="Spring Boot 3.5"
LABEL com.harbormaster.model="Insurance Industry Domain Model"
LABEL com.harbormaster.generated="2026-09-14"
#LABEL com.harbormaster.certification="ad8b877e-09d3-4e3e-858a-c8517088d3dd"

RUN addgroup -S spring && adduser -S -G spring spring
USER spring:spring

ARG JAR_FILE_RELATIVE_LOCATION=.
ARG JAR_FILE=${JAR_FILE_RELATIVE_LOCATION}/*.jar

COPY ${JAR_FILE} app.jar

EXPOSE 8080

ENTRYPOINT ["java","-jar","/app.jar"]