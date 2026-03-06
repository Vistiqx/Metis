# Metis Platform

A modular OSINT fusion, investigation, graph analysis, and early-warning platform.

## Overview

Metis combines:
- Source ingestion from multiple platforms
- Event intelligence and detection
- Graph linking and analysis
- Manual evidence handling
- Candidate event detection
- Source monitoring over time
- AI analyst assistance
- Visual intelligence
- Threat and conflict modeling

## Architecture

### Core Modules
1. **Core Platform** - Authentication, RBAC, workspace management
2. **Data Architecture** - PostgreSQL, PostGIS, Graph DB, OpenSearch
3. **Ingestion & Source Connectors** - Multi-platform data ingestion
4. **Intelligence Analysis Engine** - Signal processing, event clustering
5. **AI Analyst & Report Generation** - Automated reporting and analysis
6. **Frontend Investigation UI** - React-based investigation workspace
7. **Deployment & Infrastructure** - Docker, Kubernetes, observability
8. **Visual Intelligence** - Media analysis, artifact detection
9. **Threat & Conflict Modeling** - Threat scoring, campaign detection

### Core Entities
- **Case** - Investigation container
- **Event** - Detected incident or occurrence
- **CandidateEvent** - Emerging possible event
- **Actor** - Person or entity of interest
- **Account** - Online identity (social media, forums)
- **Device** - Physical or virtual device
- **Artifact** - Objects, logos, markers in evidence
- **Location** - Geospatial data
- **Source** - Data origin (RSS, APIs, feeds)
- **Evidence** - Supporting documentation
- **Claim** - Assertions about events
- **Narrative** - Story or explanation
- **Watchlist** - Monitored entities
- **Alert** - Notifications and warnings
- **Task** - Action items
- **Collection** - Grouped items

## Tech Stack

### Frontend
- React 18+
- Vite
- Tailwind CSS
- Lucide React
- Framer Motion

### Backend
- Python 3.11+
- FastAPI
- SQLAlchemy
- Celery (task queue)
- Redis (caching)

### Data Stores
- PostgreSQL 15+ (primary data)
- PostGIS (geospatial)
- Neo4j or ArangoDB (graph relationships)
- OpenSearch (full-text search)
- S3-compatible object storage (evidence files)

### Infrastructure
- Docker & Docker Compose
- Kubernetes (production)
- Prometheus & Grafana (monitoring)

## Quick Start

### Prerequisites
- Docker & Docker Compose
- Node.js 20+ (frontend development)
- Python 3.11+ (backend development)

### Local Development

```bash
# Clone repository
git clone https://github.com/Vistiqx/Metis.git
cd Metis

# Copy environment variables
cp .env.example .env
# Edit .env with your configuration

# Start infrastructure services
docker-compose up -d postgres redis neo4j opensearch

# Start backend
cd backend
pip install -r requirements.txt
uvicorn main:app --reload

# Start frontend (new terminal)
cd frontend
npm install
npm run dev
```

### Environment Setup

1. Copy `.env.example` to `.env`
2. Configure database connections
3. Set up API keys for ingestion sources
4. Configure object storage credentials

## Documentation

See `docs/` directory for:
- Architecture documentation
- API specifications
- Deployment guides
- Development guides

## License

Proprietary - Vistiqx
