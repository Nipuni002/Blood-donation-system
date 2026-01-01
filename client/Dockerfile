# Client (React + Vite) Dockerfile
# Build stage
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN ./node_modules/.bin/vite build

# Nginx stage
FROM nginx:stable-alpine
# Copy build output
COPY --from=build /app/dist /usr/share/nginx/html
# Optional: custom nginx config for SPA fallback
# Uncomment if you create nginx.conf in client folder
# COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
