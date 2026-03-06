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
uvicorn main:app --reload --port 8081

# Terminal 2 - Frontend
cd frontend
npm install
npm run dev
```

### 4. Access Services

| Service | URL | Notes |
|---------|-----|-------|
| Frontend | http://localhost:3001 | (was 5173) |
| API | http://localhost:8081 | (was 8000) |
| API Docs | http://localhost:8081/docs | Swagger UI |
| Grafana | http://localhost:3002 | (was 3000) |
| Neo4j Browser | http://localhost:7475 | (was 7474) |
| OpenSearch | http://localhost:9201 | (was 9200) |
| MinIO Console | http://localhost:9003 | (was 9001) |
| Prometheus | http://localhost:9091 | (was 9090) |

## Port Configuration

All ports have been updated to avoid common conflicts:
- **Frontend**: 3001 (was 5173)
- **API**: 8081 (was 8000)
- **PostgreSQL**: 5433 (was 5432)
- **Redis**: 6380 (was 6379)
- **Neo4j HTTP**: 7475 (was 7474)
- **Neo4j Bolt**: 7688 (was 7687)
- **OpenSearch**: 9201 (was 9200)
- **MinIO API**: 9002 (was 9000)
- **MinIO Console**: 9003 (was 9001)
- **Prometheus**: 9091 (was 9090)
- **Grafana**: 3002 (was 3000)

## Development Commands

### Backend
```bash
cd backend
source .venv/bin/activate

# Run tests
pytest

# Run with hot reload on port 8081
uvicorn main:app --reload --port 8081

# Run linting
black .
flake8 .
```

### Frontend
```bash
cd frontend

# Install dependencies
npm install

# Development server (runs on port 3001)
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
# Access PostgreSQL (port 5433)
docker-compose exec postgres psql -U metis -d metis

# Access Neo4j (port 7688 for bolt)
docker-compose exec neo4j cypher-shell -u neo4j -p neo4j_password

# Access Redis (port 6380)
docker-compose exec redis redis-cli -p 6380
```

## Architecture Overview

```
┌─────────────────┐
│   Frontend      │  React + Vite + Tailwind
│   Port: 3001    │
└────────┬────────┘
         │
┌────────▼────────┐
│   API           │  FastAPI + Python
│   Port: 8081    │
└────────┬────────┘
         │
    ┌────┴────┬────────┬────────┐
    │         │        │        │
┌───▼───┐ ┌──▼───┐ ┌──▼───┐ ┌──▼────┐
│PostGIS│ │Neo4j │ │Redis │ │OpenS. │
│5433   │ │7688  │ │6380  │ │9201   │
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
