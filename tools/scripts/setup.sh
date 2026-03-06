#!/bin/bash
# Metis Platform - Development Setup Script

set -e

echo "Setting up Metis development environment..."

# Check prerequisites
command -v docker-compose >/dev/null 2>&1 || { echo "docker-compose is required but not installed. Aborting." >&2; exit 1; }
command -v python3 >/dev/null 2>&1 || { echo "python3 is required but not installed. Aborting." >&2; exit 1; }

# Create environment file if it doesn't exist
if [ ! -f .env ]; then
    echo "Creating .env file from template..."
    cp .env.example .env
    echo "Please edit .env with your configuration"
fi

# Start infrastructure services
echo "Starting infrastructure services..."
docker-compose up -d postgres redis neo4j opensearch minio

# Wait for services to be ready
echo "Waiting for services to be ready..."
sleep 10

# Setup Python virtual environment
echo "Setting up Python virtual environment..."
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

echo "Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit .env file with your configuration"
echo "2. Start backend: cd backend && source .venv/bin/activate && uvicorn main:app --reload"
echo "3. Start frontend: cd frontend && npm install && npm run dev"
