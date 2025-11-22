# Docker & Compose Setup (PERN Microservices)

## Images Built
- yourhubuser/pern-auth:latest (auth-service, port 4000)
- yourhubuser/pern-donor:latest (donor service, port 3000)
- yourhubuser/pern-request:latest (request service, port 3002)
- yourhubuser/pern-appointment:latest (appointment service, port 3010)
- yourhubuser/pern-client:latest (React build served by nginx on port 80)
- postgres:15 (database)

## Build All (Local)
```powershell
# From project root
docker compose build
```

## Run Stack
```powershell
docker compose up -d
```
Access:
- Client: http://localhost:5173
- Auth API: http://localhost:4000
- Donor API: http://localhost:3000
- Request API: http://localhost:3002
- Appointment API: http://localhost:3010

## View Logs
```powershell
docker compose logs -f auth
```

## Stop & Clean
```powershell
docker compose down
# With volumes (drops Postgres data)
docker compose down -v
```

## Push Images to Docker Hub
```powershell
# Login
docker login
# Build & tag explicitly
docker build -t yourhubuser/pern-auth:latest ./server/auth-service
docker push yourhubuser/pern-auth:latest
# Repeat for each service and client
```

## Environment Variables
Set secrets via Compose `environment:` or `.env` + variable substitution.
- JWT_SECRET=your_jwt_secret_here
- DATABASE_URL=postgres://postgres:example@postgres:5432/perndb

## Healthchecks
Postgres includes a healthcheck; services depend_on Postgres becoming healthy before starting.

## Production Notes
- Pin image tags (e.g., node:18.19.0-alpine). Avoid `latest` in production.
- Use Docker secrets / vault for sensitive values.
- Add a reverse proxy / TLS termination (nginx, Traefik) in front of client + APIs.
- Consider multi-stage with builder (already applied) for smaller images.
- Add separate migration jobs if needed before service start.

## Optional Tools
Pull if needed:
```powershell
docker pull dpage/pgadmin4:latest
```
Add to compose with service pointing to `postgres` host.

## Updating
```powershell
docker compose build --no-cache
docker compose up -d
```

## Troubleshooting
- If client 404 on deep routes, add a custom nginx config with SPA fallback (copy `nginx.conf` overriding `try_files`).
- If services cannot reach DB, ensure `DATABASE_URL` uses service name `postgres` not `localhost`.
- Use `docker exec -it <container> sh` to inspect running container.
