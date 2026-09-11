# ==============================================================================
# Multi-Stage Dockerfile for Industrial Textile QC System
# Optimized for Render, Railway, Fly.io, Google Cloud Run, and Docker Engine
# ==============================================================================

# ------------------------------------------------------------------------------
# Stage 1: Build React Frontend
# ------------------------------------------------------------------------------
FROM node:20-alpine AS frontend-builder
WORKDIR /app/client

# Install dependencies (cached layer)
COPY client/package*.json ./
RUN npm ci --prefer-offline --no-audit || npm install

# Copy source code and build Vite production bundle
COPY client/ ./
RUN npm run build

# ------------------------------------------------------------------------------
# Stage 2: Build Spring Boot Backend & Bundle Static Assets
# ------------------------------------------------------------------------------
FROM maven:3.9.6-eclipse-temurin-17-alpine AS backend-builder
WORKDIR /app/server

# Cache Maven dependencies
COPY server/pom.xml ./
RUN mvn dependency:go-offline -B || true

# Copy backend source code
COPY server/src ./src

# Inject built frontend assets into Spring Boot's static resources directory
COPY --from=frontend-builder /app/client/dist ./src/main/resources/static/

# Package executable standalone JAR
RUN mvn clean package -DskipTests -B

# ------------------------------------------------------------------------------
# Stage 3: Lightweight Production JRE Runtime
# ------------------------------------------------------------------------------
FROM eclipse-temurin:17-jre-alpine AS runner
WORKDIR /app

# Set environment variables
ENV PORT=8080
ENV JAVA_OPTS="-Xms128m -Xmx512m -XX:+UseG1GC"

# Create a non-privileged application user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy compiled JAR from backend builder stage
COPY --from=backend-builder /app/server/target/*.jar /app/app.jar

# Set permissions
RUN chown -R appuser:appgroup /app
USER appuser

# Expose container port (overridden dynamically by Render via $PORT)
EXPOSE 8080

# Health check endpoint
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:${PORT}/api/batches/current || exit 1

# Launch Spring Boot with dynamic port mapping
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -Dserver.port=${PORT:-8080} -jar /app/app.jar"]

