# Request Service

Purpose: Manage blood requests posted by patients/hospitals.

Run (PowerShell):

```powershell
cd server\request-service
npm install
npm start
```

Defaults: runs on `http://localhost:3002`. Requires the same Postgres database and `JWT_SECRET` matching auth-service.

Endpoints
- `POST /request` (auth) — add blood request
- `GET /request` (auth) — view all requests
- `GET /request/:id` (auth) — view one request
- `PUT /request/:id/status` (auth, admin only) — update processing status

Development alternative (no JWT)
- If you want to test the request service without using JWTs, set `SKIP_AUTH=true` in the environment. In that mode the service accepts a `user_id` provided in the request body, query string, or `x-user-id` header and uses it as the request owner.
- Example (PowerShell):

```powershell
cd server\request-service
$env:SKIP_AUTH = 'true'; npm start
```

Note: this is insecure and only for local development/testing.

Database: `requests` table defined in `database.sql`.
