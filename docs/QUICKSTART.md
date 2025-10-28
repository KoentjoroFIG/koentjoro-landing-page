# Quick Start - Development Commands

## 🚀 Start Development

```bash
# Start all services
docker compose up -d

# Start and watch logs
docker compose up
```

**Frontend:** http://localhost:5173/

---

## 🔥 Hot Module Replacement (HMR)

✅ **Already configured!** Just edit files in `frontend/src/` and save.

```bash
# Watch HMR events in real-time
docker compose logs -f frontend
```

**How to test:**

1. Open http://localhost:5173/
2. Edit `frontend/src/components/pages/home.tsx`
3. Save and watch browser update automatically

---

## 📦 Common Commands

```bash
# Install new package
docker compose exec frontend pnpm add <package-name>

# Restart frontend
docker compose restart frontend

# Rebuild frontend
docker compose up -d --build frontend

# Stop all services
docker compose down

# View logs
docker compose logs -f frontend
docker compose logs -f mongodb

# Access container shell
docker compose exec frontend sh
```

---

## 🩺 Troubleshooting

```bash
# HMR not working? Restart container
docker compose restart frontend

# Container won't start? Check logs
docker compose logs frontend

# Clean rebuild
docker compose down -v
docker compose up -d --build
```

---

## 📖 Full Documentation

See `README.dev.md` for complete guide including:

- Architecture overview
- Best practices
- Production deployment
- Detailed troubleshooting

---

## ✨ What's Configured

✅ Docker bind mount for instant file sync  
✅ Vite HMR with polling for Docker  
✅ Isolated container node_modules  
✅ Health checks for all services  
✅ Optimized .dockerignore  
✅ Multi-service orchestration

**You're ready to code!** 🎉
