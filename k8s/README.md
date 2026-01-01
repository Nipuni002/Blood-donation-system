# Kubernetes Deployment Guide

This folder contains manifests to run the Blood Donation System on Kubernetes.

## Contents

| File | Purpose |
|------|---------|
| `namespace.yaml` | Dedicated namespace `blood-donation` |
| `configmap.yaml` | Shared non‑secret configuration (DB URL) |
| `secret-example.yaml` | Template for secrets (JWT) – do not commit real values |
| `postgres-statefulset.yaml` | PostgreSQL headless `Service` + `StatefulSet` + PVC |
| `auth-deployment.yaml` | Auth service `Deployment` + `Service` |
| `donor-deployment.yaml` | Donor service `Deployment` + `Service` |
| `request-deployment.yaml` | Request service `Deployment` + `Service` |
| `appointment-deployment.yaml` | Appointment service `Deployment` + `Service` |
| `client-deployment.yaml` | Client (Nginx) `Deployment` + `Service` |
| `ingress.yaml` | Ingress routing to client + API services |

## Prerequisites

1. A Kubernetes cluster (kind, k3d, minikube, managed, etc.).
2. NGINX Ingress Controller (for `ingress.yaml`). Install for minikube:
   ```bash
   minikube addons enable ingress
   ```
3. Container images pushed to a registry reachable by the cluster (update `yourhubuser/*` to your real registry path).

## Build & Push Images (example)

```bash
docker build -t YOUR_REGISTRY/pern-auth:latest server/auth-service
docker push YOUR_REGISTRY/pern-auth:latest

docker build -t YOUR_REGISTRY/pern-donor:latest server/donor
docker push YOUR_REGISTRY/pern-donor:latest

docker build -t YOUR_REGISTRY/pern-request:latest server/request-service
docker push YOUR_REGISTRY/pern-request:latest

docker build -t YOUR_REGISTRY/pern-appointment:latest server/appointment-service
docker push YOUR_REGISTRY/pern-appointment:latest

docker build -t YOUR_REGISTRY/pern-client:latest client
docker push YOUR_REGISTRY/pern-client:latest
```

Replace `YOUR_REGISTRY` with something like `docker.io/username` or `ghcr.io/org`.

## Apply Manifests

Apply in logical order (namespace first, then shared resources, then DB, then apps, then ingress):

```bash
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/configmap.yaml
kubectl apply -f k8s/secret-example.yaml   # Replace value before applying or use kubectl create secret
kubectl apply -f k8s/postgres-statefulset.yaml
kubectl apply -f k8s/auth-deployment.yaml
kubectl apply -f k8s/donor-deployment.yaml
kubectl apply -f k8s/request-deployment.yaml
kubectl apply -f k8s/appointment-deployment.yaml
kubectl apply -f k8s/client-deployment.yaml
kubectl apply -f k8s/ingress.yaml
```

## Creating Real Secrets (Preferred)

Instead of editing `secret-example.yaml`, create the secret directly:

```bash
kubectl create secret generic app-secrets \
  --namespace blood-donation \
  --from-literal=JWT_SECRET="your_real_long_random_secret"
```

If you do this, you can skip applying `secret-example.yaml`.

## Verifying Deployments

```bash
kubectl get pods -n blood-donation
kubectl describe pod <pod-name> -n blood-donation
kubectl logs deployment/auth -n blood-donation --tail=100
```

## Ingress Access

Add host mapping for local clusters:

```bash
echo "$(minikube ip) blood.local" | sudo tee -a /etc/hosts
```

Then access:
- Client: http://blood.local/
- Auth API: http://blood.local/auth/...
- Donor API: http://blood.local/donor/...
- Request API: http://blood.local/request/...
- Appointment API: http://blood.local/appointment/...

## Customization

- Scale a service: `kubectl scale deployment/auth -n blood-donation --replicas=2`
- Change image: `kubectl set image deployment/auth auth=YOUR_REGISTRY/pern-auth:NEW_TAG -n blood-donation`
- Rollout status: `kubectl rollout status deployment/auth -n blood-donation`

## Next Improvements

1. Add NetworkPolicies to restrict cross-namespace traffic.
2. Add resource requests/limits for each container.
3. Add HorizontalPodAutoscaler (HPA) for scaling based on CPU.
4. Externalize Postgres (managed DB) and remove statefulset for production.
5. Configure TLS (Ingress + cert-manager) for real domains.
6. Add separate secret for database credentials (instead of inline ConfigMap values).

## Cleanup

```bash
kubectl delete namespace blood-donation
```

---
Generated manifests are a starting point; review security (secrets, resource limits) before production use.
