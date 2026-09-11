#!/bin/bash
echo "========================================================="
echo "  Industrial Color-Matching & Formulation QC System"
echo "  Autoclave Dyeing & Pre-Treatment Quality Control"
echo "========================================================="

# Free port 8080 if previously in use
if lsof -t -i :8080 >/dev/null 2>&1; then
    echo "Port 8080 was in use. Freeing port 8080..."
    kill -9 $(lsof -t -i :8080) 2>/dev/null || true
    sleep 1
fi

export PATH="/usr/local/opt/openjdk@17/bin:$PATH"
export JAVA_HOME="/usr/local/opt/openjdk@17"

echo "[1/2] Starting Java Spring Boot API on port 8080..."
(cd server && mvn spring-boot:run) &
BACKEND_PID=$!

echo "[2/2] Starting React Frontend on port 5173..."
(cd client && npm run dev) &
FRONTEND_PID=$!

trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" INT TERM EXIT
wait
