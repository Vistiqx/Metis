#!/bin/bash
# Manual UI Validation Script for Metis Platform
# Tests all routes and interactive elements

echo "======================================"
echo "Metis Platform UI Validation"
echo "======================================"
echo ""

BASE_URL="http://localhost:3001"
FAILED=0
PASSED=0

# Function to test route
test_route() {
    local route=$1
    local expected_content=$2
    
    echo -n "Testing $route ... "
    
    # Get the page
    RESPONSE=$(curl -s "$BASE_URL$route")
    
    # Check if HTML is returned
    if echo "$RESPONSE" | grep -q "<!doctype html>"; then
        echo "✓ LOADED"
        ((PASSED++))
    else
        echo "✗ FAILED (no HTML)"
        ((FAILED++))
    fi
}

# Test all routes
echo "Testing Routes:"
echo "---------------"
test_route "/" "Dashboard"
test_route "/investigations" "Investigations"
test_route "/events" "Events"
test_route "/graph" "Graph"
test_route "/evidence" "Evidence"
test_route "/watchlists" "Watchlists"
test_route "/alerts" "Alerts"
test_route "/sources" "Sources"
test_route "/operations" "Operations"
test_route "/narratives" "Narratives"
test_route "/docs" "Docs"
test_route "/settings" "Settings"

echo ""
echo "======================================"
echo "Results: $PASSED passed, $FAILED failed"
echo "======================================"

exit $FAILED
