#!/bin/bash

# Metis Platform - E2E Test Runner Script
# This script runs comprehensive end-to-end tests using Playwright and Chrome DevTools

set -e

echo "=========================================="
echo "Metis Platform - E2E Testing Suite"
echo "=========================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if services are running
echo "Checking service availability..."

# Check Frontend
if curl -s http://localhost:3001 > /dev/null 2>&1; then
    echo -e "${GREEN}✓${NC} Frontend (http://localhost:3001) - Running"
else
    echo -e "${RED}✗${NC} Frontend (http://localhost:3001) - Not running"
    echo "Starting services..."
    cd ~/metis-platform && docker compose up -d
    sleep 10
fi

# Check API
if curl -s http://localhost:8081/health > /dev/null 2>&1; then
    echo -e "${GREEN}✓${NC} API (http://localhost:8081) - Running"
else
    echo -e "${RED}✗${NC} API (http://localhost:8081) - Not running"
    exit 1
fi

echo ""
echo "=========================================="
echo "Running Chrome DevTools Network Audit"
echo "=========================================="

# Use curl to simulate Chrome DevTools network audit
echo ""
echo "Testing API endpoints with curl (simulating DevTools)..."
echo ""

# Test API Health
response=$(curl -s -w "\n%{http_code}" http://localhost:8081/health)
http_code=$(echo "$response" | tail -n1)
body=$(echo "$response" | sed '$d')

if [ "$http_code" = "200" ]; then
    echo -e "${GREEN}✓${NC} GET /health - Status: $http_code"
    echo "  Response: $body"
else
    echo -e "${RED}✗${NC} GET /health - Status: $http_code"
fi

# Test API Root
response=$(curl -s -w "\n%{http_code}" http://localhost:8081/)
http_code=$(echo "$response" | tail -n1)
body=$(echo "$response" | sed '$d')

if [ "$http_code" = "200" ]; then
    echo -e "${GREEN}✓${NC} GET / - Status: $http_code"
    echo "  Response: $body"
else
    echo -e "${RED}✗${NC} GET / - Status: $http_code"
fi

# Test API Status
response=$(curl -s -w "\n%{http_code}" http://localhost:8081/api/v1/status)
http_code=$(echo "$response" | tail -n1)
body=$(echo "$response" | sed '$d')

if [ "$http_code" = "200" ]; then
    echo -e "${GREEN}✓${NC} GET /api/v1/status - Status: $http_code"
    echo "  Response: $body"
else
    echo -e "${RED}✗${NC} GET /api/v1/status - Status: $http_code"
fi

# Test Frontend
response=$(curl -s -w "\n%{http_code}" http://localhost:3001)
http_code=$(echo "$response" | tail -n1)

if [ "$http_code" = "200" ]; then
    echo -e "${GREEN}✓${NC} GET http://localhost:3001 - Status: $http_code"
    # Check if it returns HTML
    if echo "$response" | grep -q "<!doctype html"; then
        echo "  Content-Type: HTML (Frontend serving correctly)"
    fi
else
    echo -e "${RED}✗${NC} GET http://localhost:3001 - Status: $http_code"
fi

echo ""
echo "=========================================="
echo "Running Playwright Tests"
echo "=========================================="

# Navigate to frontend directory
cd ~/metis-platform/frontend

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "Installing npm dependencies..."
    npm install
fi

# Install Playwright browsers if needed
if [ ! -d "$HOME/.cache/ms-playwright" ]; then
    echo "Installing Playwright browsers..."
    npx playwright install chromium firefox webkit
fi

# Run Playwright tests
echo ""
echo "Running E2E tests..."
npx playwright test --reporter=html || true

echo ""
echo "=========================================="
echo "Test Summary"
echo "=========================================="

# Count test results
if [ -d "test-results" ]; then
    passed=$(find test-results -name "*.json" -exec grep -l '"status": "passed"' {} \; 2>/dev/null | wc -l)
    failed=$(find test-results -name "*.json" -exec grep -l '"status": "failed"' {} \; 2>/dev/null | wc -l)
    
    echo -e "Tests Passed: ${GREEN}$passed${NC}"
    echo -e "Tests Failed: ${RED}$failed${NC}"
else
    echo "Test results directory not found"
fi

# Open report if tests ran
if [ -d "e2e-report" ]; then
    echo ""
    echo "HTML report generated at: ~/metis-platform/frontend/e2e-report/index.html"
    echo "To view: python3 -m http.server 8888 --directory e2e-report"
fi

echo ""
echo "=========================================="
echo "End-to-End Testing Complete"
echo "=========================================="
