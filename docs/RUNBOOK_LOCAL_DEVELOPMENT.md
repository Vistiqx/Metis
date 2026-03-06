# Metis Platform - Local Development Runbook

## Quick Start (5 minutes)

### 1. Prerequisites Check
```bash
docker --version
docker-compose --version
node --version  # Should be 20+
python3 --version  # Should be 3.11+
```

### 2. Clone and Enter
```bash
git clone https://github.com/Vistiqx/Metis.git
cd Metis
```

### 3. Environment Setup
```bash
cp .env.example .env
# Edit .env (optional - defaults work for dev)
```

### 4. Start Infrastructure
```bash
docker-compose up -d postgres redis neo4j opensearch minio
```

Wait 30 seconds for services to initialize.

### 5. Start Backend
```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

Backend available at: http://localhost:8000

### 6. Start Frontend (new terminal)
```bash
cd frontend
npm install
npm run dev
```

Frontend available at: http://localhost:5173

### 7. Verify
- ✅ Frontend: http://localhost:5173
- ✅ API: http://localhost:8000
- ✅ API Docs: http://localhost:8000/docs
- ✅ Health: http://localhost:8000/health

## Full Docker Stack (Alternative)

```bash
# Start everything including frontend and API
docker-compose up -d

# View logs
docker-compose logs -f api
docker-compose logs -f frontend
```

## Service URLs

| Service | URL | Credentials |
|---------|-----|-------------|
| Frontend | http://localhost:5173 | - |
| API | http://localhost:8000 | - |
| API Docs | http://localhost:8000/docs | - |
| Grafana | http://localhost:3000 | admin/admin |
| Neo4j Browser | http://localhost:7474 | neo4j/neo4j_password |
| OpenSearch | http://localhost:9200 | - |
| MinIO Console | http://localhost:9001 | minioadmin/minioadmin |
| Prometheus | http://localhost:9090 | - |

## Development Commands

### Backend
```bash
cd backend
source .venv/bin/activate

# Run with hot reload
uvicorn main:app --reload

# Run tests
pytest

# Linting
black .
flake8 .
mypy .
```

### Frontend
```bash
cd frontend

# Development server
npm run dev

# Build for production
npm run build

# Type checking
npm run typecheck

# Linting
npm run lint

# Testing
npm run test
```

### Database

```bash
# Access PostgreSQL
docker-compose exec postgres psql -U metis -d metis

# Access Neo4j
docker-compose exec neo4j cypher-shell -u neo4j -p neo4j_password

# Access Redis
docker-compose exec redis redis-cli

# View OpenSearch indices
curl http://localhost:9200/_cat/indices
```

## Common Tasks

### Reset Database
```bash
docker-compose down -v
docker-compose up -d postgres
```

### Add Sample Data
```bash
cd backend
source .venv/bin/activate
python -c "from data.seed import seed_database; seed_database()"
```

### Check Service Health
```bash
# All services
docker-compose ps

# Specific service
docker-compose exec postgres pg_isready -U metis
```

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f api
docker-compose logs -f postgres
```

### Rebuild After Changes
```bash
# Frontend
cd frontend && npm run build

# Backend (Docker)
docker-compose build api

# Full rebuild
docker-compose up -d --build
```

## Troubleshooting

### Port Already in Use
```bash
# Find process using port
lsof -i :8000
# or
netstat -tlnp | grep 8000

# Kill process
kill -9 <PID>
```

### Database Connection Failed
```bash
# Check if postgres is running
docker-compose ps postgres

# Restart postgres
docker-compose restart postgres

# Check logs
docker-compose logs postgres
```

### Frontend Won't Start
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Module Not Found (Backend)
```bash
cd backend
source .venv/bin/activate
pip install -r requirements.txt
```

### Permission Denied (Scripts)
```bash
chmod +x tools/scripts/*.sh
```

## Testing API Endpoints

### Register User
```bash
curl -X POST http://localhost:8000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "analyst@metis.local",
    "username": "analyst",
    "password": "password123",
    "full_name": "Test Analyst"
  }'
```

### Login
```bash
curl -X POST http://localhost:8000/api/v1/auth/login \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=analyst&password=password123"
```

### Create Case
```bash
curl -X POST http://localhost:8000/api/v1/cases \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Investigation",
    "description": "Test case",
    "priority": "high"
  }'
```

## Environment Variables

Edit `.env` file to customize:

```env
# Database
POSTGRES_PASSWORD=metis_password
NEO4J_PASSWORD=neo4j_password

# Security
JWT_SECRET_KEY=your-secret-key

# AI (optional)
OPENAI_API_KEY=sk-...

# Ports (if defaults conflict)
POSTGRES_PORT=5433
REDIS_PORT=6380
```

## Performance Tips

1. **Use Docker for databases** - Faster than local install
2. **Enable hot reload** - `uvicorn main:app --reload`
3. **Use npm ci** - Faster than npm install
4. **Limit OpenSearch memory** - Already set to 1GB in docker-compose
5. **Close unused services** - `docker-compose stop <service>`

## IDE Setup

### VS Code
Recommended extensions:
- Python
- Pylance
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- Error Lens

### PyCharm
- Set Python interpreter to `.venv`
- Enable Django support (for FastAPI patterns)

## Git Workflow

```bash
# Create feature branch
git checkout -b feature/my-feature

# Make changes, commit
git add .
git commit -m "feat: description"

# Push to remote
git push -u origin feature/my-feature

# Create PR, merge, pull
git checkout main
git pull origin main
```

## Debugging

### Backend (VS Code)
Create `.vscode/launch.json`:
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Python: FastAPI",
      "type": "python",
      "request": "launch",
      "module": "uvicorn",
      "args": ["main:app", "--reload"],
      "jinja": true
    }
  ]
}
```

### Frontend
Use Chrome DevTools or React Developer Tools extension.

## Updates

### Update Dependencies
```bash
# Backend
pip install -r requirements.txt --upgrade

# Frontend
npm update
```

### Update Docker Images
```bash
docker-compose pull
docker-compose up -d
```

## Getting Help

1. Check logs: `docker-compose logs <service>`
2. API docs: http://localhost:8000/docs
3. Health check: http://localhost:8000/health
4. Review this document
5. Check GitHub issues

---

**Happy developing! 🚀**
