# Spring Boot Backend Standalone Dockerfile
FROM maven:3.9.6-eclipse-temurin-17-alpine AS builder
WORKDIR /app
COPY pom.xml ./
RUN mvn dependency:go-offline -B || true
COPY src ./src
RUN mvn clean package -DskipTests -B

FROM eclipse-temurin:17-jre-alpine AS runner
WORKDIR /app
ENV PORT=8080
ENV JAVA_OPTS="-Xms128m -Xmx512m"
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
COPY --from=builder /app/target/*.jar /app/app.jar
RUN chown -R appuser:appgroup /app
USER appuser
EXPOSE 8080
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -Dserver.port=${PORT:-8080} -jar /app/app.jar"]

