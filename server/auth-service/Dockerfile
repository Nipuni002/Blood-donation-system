# Auth Service Dockerfile
# --- Build dependencies stage ---
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# --- Runtime stage ---
FROM node:18-alpine
WORKDIR /app
ENV NODE_ENV=production
# Avoid running as root in production (simple user add)
RUN addgroup -S nodegrp && adduser -S nodeusr -G nodegrp
COPY --from=deps /app/node_modules ./node_modules
COPY . .
USER nodeusr
EXPOSE 4000
CMD ["node", "server.js"]
