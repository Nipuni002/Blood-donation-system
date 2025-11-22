# Donor Service

This is the donor microservice for the Blood Donor app.

Environment
- `PORT` (optional, default `3000`)
- Postgres connection is read from `server/donor/db.js` (update DB credentials there or via env when using a Pool)
- `JWT_SECRET` must match the `auth-service` JWT secret for token verification

Install & run (PowerShell):

```powershell
cd server\donor
npm install
npm start
```

Health endpoints
- `GET /` → { message: 'API running' }
- `GET /db` → returns DB time
- `GET /auth/debug` → requires Authorization header and returns decoded token payload for debugging

Notes
- All donor endpoints require a Bearer JWT in the `Authorization` header.
- The server sets `user_id` on created donors from the decoded token; the client should not attempt to override it.

Development alternative (no JWT)
- For quick development/testing you can run the service without verifying JWTs by setting `SKIP_AUTH=true` in the environment. In this mode the server will accept a `user_id` provided in the request body, query string or `x-user-id` header.
- Example (PowerShell):

```powershell
cd server\donor
# run without JWT verification (supply user_id in the POST body or header)
$env:SKIP_AUTH = 'true'; node index.js
```

Note: running with `SKIP_AUTH=true` is insecure and should only be used for local development.
