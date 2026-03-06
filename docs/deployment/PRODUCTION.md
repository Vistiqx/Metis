# Metis Platform - Production Deployment

## Kubernetes Deployment

### Prerequisites
- Kubernetes cluster (v1.25+)
- kubectl configured
- Helm 3 (optional)

### Quick Deploy

```bash
# Set environment
export METIS_VERSION=latest
export K8S_NAMESPACE=metis

# Run deployment script
./tools/scripts/deploy.sh
```

### Manual Deployment

```bash
# Create namespace
kubectl create namespace metis

# Apply manifests
kubectl apply -f infrastructure/kubernetes/ -n metis

# Verify
kubectl get pods -n metis
kubectl get svc -n metis
```

### Services

| Service | Type | Port |
|---------|------|------|
| metis-api | ClusterIP | 80 |
| metis-frontend | LoadBalancer | 80 |
| postgres | ClusterIP | 5432 |
| redis | ClusterIP | 6379 |
| neo4j | ClusterIP | 7687 |
| opensearch | ClusterIP | 9200 |

### Configuration

Use ConfigMaps and Secrets for configuration:

```bash
# Create config
kubectl create configmap metis-config --from-env-file=.env -n metis

# Create secrets
kubectl create secret generic metis-secrets \
  --from-literal=postgres-password=secret \
  --from-literal=jwt-secret=secret -n metis
```

### Monitoring

Prometheus and Grafana are deployed automatically.

Access Grafana:
```bash
kubectl port-forward svc/grafana 3000:3000 -n metis
```

## Docker Compose Production

For single-node deployments:

```bash
docker-compose -f docker-compose.yml up -d
```

## Database Migration

```bash
# Run migrations
cd backend
alembic upgrade head
```

## Backup

### PostgreSQL
```bash
docker-compose exec postgres pg_dump -U metis metis > backup.sql
```

### Neo4j
```bash
docker-compose exec neo4j neo4j-admin database dump --to-path=/backups neo4j
```

## Scaling

### Horizontal Pod Autoscaler
```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: metis-api-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: metis-api
  minReplicas: 3
  maxReplicas: 10
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70
```

## Security

- Use TLS certificates for all external services
- Enable network policies
- Use secrets management (Vault, Sealed Secrets)
- Regular security updates

## Troubleshooting

```bash
# Check pod status
kubectl get pods -n metis

# View logs
kubectl logs -f deployment/metis-api -n metis

# Describe pod
kubectl describe pod <pod-name> -n metis

# Exec into container
kubectl exec -it <pod-name> -n metis -- /bin/bash
```
