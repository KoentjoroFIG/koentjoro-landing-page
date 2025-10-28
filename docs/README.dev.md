# KoentjoroLandingPage - Development Guide

## Quick Start

### Prerequisites

- Docker & Docker Compose
- Git

### Start Development Environment

```bash
# Clone and navigate to the repository
cd /path/to/KoentjoroLandingPage

# Start all services
docker compose up -d

# Watch frontend logs (optional)
docker compose logs -f frontend
```

**Frontend will be available at:** http://localhost:5173/

---

## Development Workflow

### Frontend Development with Hot Module Replacement (HMR)

The frontend is configured for optimal Docker-based development:

#### How HMR Works

1. **Bind Mount**: Your local `./frontend` folder is mounted into the container at `/frontend`
2. **File Watching**: Vite uses polling to detect file changes in Docker (configured in `vite.config.ts`)
3. **Live Updates**: Changes to any file in `frontend/src/` automatically reload in the browser

#### Verify HMR is Working

1. Start the frontend container:

   ```bash
   docker compose up -d frontend
   ```

2. Open http://localhost:5173/ in your browser

3. Edit any file in `frontend/src/` (e.g., `frontend/src/components/pages/home.tsx`)

4. Save the file and watch:
   - Terminal shows: `hmr update /src/components/pages/home.tsx`
   - Browser updates automatically without full reload

#### Troubleshooting HMR

If changes aren't detected:

- **Check container logs**: `docker compose logs -f frontend`
- **Verify bind mount**: `docker compose exec frontend ls -la /frontend/src`
- **Restart container**: `docker compose restart frontend`
- **Rebuild if needed**: `docker compose up -d --build frontend`

---

## Architecture Overview

### Services

| Service    | Port  | Description               |
| ---------- | ----- | ------------------------- |
| `frontend` | 5173  | React + Vite + TypeScript |
| `mongodb`  | 27017 | MongoDB Community Server  |

### Frontend Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite 7.1.0
- **Router**: TanStack Router (file-based routing)
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui (Radix UI primitives)

### Key Configuration Files

#### `docker-compose.yml`

- **Bind mount**: `./frontend:/frontend:cached` — enables HMR
- **Volume**: `frontend_node_modules:/frontend/node_modules` — isolates container dependencies
- **Healthcheck**: Pings `http://localhost:5173/` every 30s

#### `frontend/vite.config.ts`

```typescript
server: {
  host: true,          // Listen on 0.0.0.0 (required for Docker)
  port: 5173,
  strictPort: true,
  watch: {
    usePolling: true,  // Required for Docker file watching
  },
}
```

#### `frontend/.dockerignore`

Excludes `node_modules`, `dist`, `.git`, IDE files, etc. from build context

---

## Common Commands

### Container Management

```bash
# Start all services
docker compose up -d

# Stop all services
docker compose down

# Rebuild and restart frontend
docker compose up -d --build frontend

# View logs
docker compose logs -f frontend
docker compose logs -f mongodb

# Check service health
docker compose ps
```

### Frontend Development

```bash
# Install new package (inside container)
docker compose exec frontend pnpm add <package-name>

# Run linting
docker compose exec frontend pnpm run lint

# Build for production
docker compose exec frontend pnpm run build

# Access container shell
docker compose exec frontend sh
```

### MongoDB

```bash
# Access MongoDB shell
docker compose exec mongodb mongosh -u $MONGODB_INITDB_ROOT_USERNAME -p $MONGODB_INITDB_ROOT_PASSWORD

# View MongoDB logs
docker compose logs -f mongodb
```

---

## Best Practices

### Development

1. **Always use the bind mount** — Never copy files manually into the container
2. **Install packages in container** — Use `docker compose exec frontend pnpm add <pkg>`
3. **Check logs regularly** — `docker compose logs -f frontend` shows HMR events and errors
4. **Commit lock files** — `pnpm-lock.yaml` ensures consistent dependencies

### Performance

- **Cached bind mount** — `:cached` flag (macOS/Linux) improves I/O performance
- **Polling interval** — Vite's default polling is optimized; no need to change
- **Node modules volume** — Prevents host/container module conflicts and improves speed

### Docker

- **Multi-stage builds** — For production, create a separate Dockerfile with build stage
- **Layer caching** — `pnpm install` runs only when `package.json` changes
- **.dockerignore** — Keeps build context small and fast

---

## Troubleshooting

### Container won't start

```bash
# Check container status
docker compose ps

# View error logs
docker compose logs frontend

# Rebuild from scratch
docker compose down -v
docker compose up -d --build
```

### Port already in use

```bash
# Find process using port 5173
netstat -ano | findstr :5173   # Windows
lsof -i :5173                  # macOS/Linux

# Kill the process or change the port in docker-compose.yml
```

### Changes not reflecting (HMR not working)

1. Verify bind mount exists:

   ```bash
   docker compose exec frontend ls -la /frontend/src
   ```

2. Check Vite config has `usePolling: true`:

   ```bash
   docker compose exec frontend cat vite.config.ts | grep -A 3 "watch:"
   ```

3. Restart with clean build:
   ```bash
   docker compose restart frontend
   ```

### Node modules issues

```bash
# Recreate the node_modules volume
docker compose down
docker volume rm koentjoro_frontend_node_modules
docker compose up -d --build frontend
```

---

## Production Deployment

### Build for Production

```bash
# Build optimized static assets
docker compose exec frontend pnpm run build

# Output will be in frontend/dist/
```

### Multi-stage Dockerfile (Recommended)

Create `frontend/docker/Dockerfile.prod`:

```dockerfile
# Build stage
FROM node:22-alpine AS builder
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile
COPY . .
RUN pnpm run build

# Production stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Build and run:

```bash
docker build -f frontend/docker/Dockerfile.prod -t koentjoro-frontend:prod ./frontend
docker run -p 80:80 koentjoro-frontend:prod
```

---

## Additional Resources

- [Vite Documentation](https://vitejs.dev/)
- [TanStack Router](https://tanstack.com/router)
- [Docker Compose Reference](https://docs.docker.com/compose/compose-file/)
- [React Documentation](https://react.dev/)

---

## Support

For issues or questions:

1. Check container logs: `docker compose logs -f frontend`
2. Verify configuration matches this guide
3. Open an issue in the repository with logs and error messages
