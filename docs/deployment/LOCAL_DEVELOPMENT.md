# Metis Platform - Local Development Guide

## Quick Start

### Prerequisites
- Docker & Docker Compose
- Node.js 20+
- Python 3.11+
- Git

### 1. Clone and Setup

```bash
git clone https://github.com/Vistiqx/Metis.git
cd Metis

# Run setup script
./tools/scripts/setup.sh
```

### 2. Configure Environment

```bash
cp .env.example .env
# Edit .env with your settings
```

### 3. Start Services

**Option A: Docker Compose (Full Stack)**
```bash
docker-compose up -d
```

**Option B: Local Development**
```bash
# Terminal 1 - Backend
cd backend
source .venv/bin/activate
uvicorn main:app --reload

# Terminal 2 - Frontend
cd frontend
npm install
npm run dev
```

### 4. Access Services

| Service | URL |
|---------|-----|
| Frontend | http://localhost:5173 |
| API | http://localhost:8000 |
| API Docs | http://localhost:8000/docs |
| Grafana | http://localhost:3000 |
| Neo4j Browser | http://localhost:7474 |
| OpenSearch | http://localhost:9200 |
| MinIO Console | http://localhost:9001 |

## Development Commands

### Backend
```bash
cd backend
source .venv/bin/activate

# Run tests
pytest

# Run with hot reload
uvicorn main:app --reload

# Run linting
black .
flake8 .
```

### Frontend
```bash
cd frontend

# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Type checking
npm run typecheck
```

### Database

```bash
# Access PostgreSQL
docker-compose exec postgres psql -U metis -d metis

# Access Neo4j
docker-compose exec neo4j cypher-shell -u neo4j -p neo4j_password

# Access Redis
docker-compose exec redis redis-cli
```

## Architecture Overview

```
┌─────────────────┐
│   Frontend      │  React + Vite + Tailwind
│   Port: 5173    │
└────────┬────────┘
         │
┌────────▼────────┐
│   API           │  FastAPI + Python
│   Port: 8000    │
└────────┬────────┘
         │
    ┌────┴────┬────────┬────────┐
    │         │        │        │
┌───▼───┐ ┌──▼───┐ ┌──▼───┐ ┌──▼────┐
│PostGIS│ │Neo4j │ │Redis │ │OpenS. │
│5432   │ │7687  │ │6379  │ │9200   │
└───────┘ └───────┘ └───────┘ └───────┘
```

## Troubleshooting

### Docker Issues
```bash
# Reset everything
docker-compose down -v
docker-compose up -d

# View logs
docker-compose logs -f api
docker-compose logs -f postgres
```

### Database Issues
```bash
# Reset database
docker-compose down -v
docker-compose up -d postgres
```

### Port Conflicts
If ports are already in use, modify `.env` file to use different ports.

## Production Deployment

See `infrastructure/kubernetes/` for Kubernetes manifests.

```bash
# Deploy to Kubernetes
./tools/scripts/deploy.sh
```

## Support

For issues, check:
- GitHub Issues: https://github.com/Vistiqx/Metis/issues
- Documentation: `docs/` directory
