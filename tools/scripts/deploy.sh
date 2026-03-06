#!/bin/bash
# Metis Platform - Production Deployment Script

set -e

METIS_VERSION=${METIS_VERSION:-latest}
K8S_NAMESPACE=${K8S_NAMESPACE:-metis}

echo "Deploying Metis Platform v${METIS_VERSION} to Kubernetes..."

# Create namespace if it doesn't exist
kubectl create namespace ${K8S_NAMESPACE} --dry-run=client -o yaml | kubectl apply -f -

# Apply Kubernetes manifests
echo "Applying Kubernetes manifests..."
kubectl apply -f infrastructure/kubernetes/ -n ${K8S_NAMESPACE}

# Wait for deployments
echo "Waiting for deployments to be ready..."
kubectl wait --for=condition=available --timeout=300s deployment/metis-api -n ${K8S_NAMESPACE}

echo "Deployment complete!"
echo ""
echo "Access the application:"
echo "  kubectl port-forward svc/metis-api 8000:80 -n ${K8S_NAMESPACE}"
