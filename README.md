# Koentjoro Landing Page

A modern, full-stack portfolio and reverse hiring platform built with React, FastAPI, and GraphQL. This project showcases professional experience, skills, and provides a platform for potential employers to connect.

## 🚀 Tech Stack

### Frontend

- **React 19** with TypeScript
- **Vite** - Lightning-fast build tool
- **TanStack Router** - Type-safe routing
- **Tailwind CSS 4** - Utility-first styling
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icons

### Backend

- **FastAPI** - Modern Python web framework
- **Strawberry GraphQL** - GraphQL implementation for Python
- **MongoDB** - NoSQL database
- **Beanie ODM** - Async MongoDB object document mapper
- **JWT Authentication** - Secure authentication
- **Pydantic** - Data validation using Python type hints

### Infrastructure

- **Docker & Docker Compose** - Containerized development and deployment
- **pnpm** - Fast, disk space efficient package manager

## 📋 Features

- 🎨 **Modern UI/UX** - Responsive design with smooth animations
- 🔐 **Authentication System** - Secure sign-in/sign-up with JWT
- 🔄 **GraphQL API** - Efficient data fetching
- 📱 **Mobile Responsive** - Works seamlessly on all devices
- 🎯 **Portfolio Showcase** - Display skills, projects, and experience
- 💼 **Reverse Hiring** - Allow employers to submit bids/proposals

## 🛠️ Getting Started

### Prerequisites

- **Node.js** 18+ and **pnpm** (or npm/yarn)
- **Python** 3.11+
- **Docker** and **Docker Compose** (optional, for containerized setup)
- **MongoDB** (or use Docker setup)

### Environment Setup

1. Clone the repository:

```bash
git clone https://github.com/yourusername/KoentjoroLandingPage.git
cd KoentjoroLandingPage
```

2. Create a `.env` file in the root directory:

```env
# MongoDB Configuration
MONGODB_INITDB_ROOT_USERNAME=admin
MONGODB_INITDB_ROOT_PASSWORD=yourpassword

# Backend Configuration
APP_STAGE=development
DATABASE_URL=mongodb://admin:yourpassword@localhost:27017
JWT_SECRET_KEY=your-secret-key-here
```

### Running with Docker (Recommended)

The easiest way to run the entire stack:

```bash
docker-compose up
```

This will start:

- Frontend at `http://localhost:5173`
- MongoDB at `mongodb://localhost:27017`

### Running Locally

#### Frontend Development

```bash
cd frontend
pnpm install
pnpm dev
```

The frontend will be available at `http://localhost:5173`

#### Backend Development

```bash
cd backend-python
pip install -r requirement.txt
python src/main.py
```

Or with uvicorn directly:

```bash
cd backend-python
uvicorn src.main:app --host 0.0.0.0 --port 1911 --reload
```

The API will be available at `http://localhost:1911`

- API Docs: `http://localhost:1911/docs`
- GraphQL Playground: `http://localhost:1911/graphql`
- Health Check: `http://localhost:1911/health`

## 📁 Project Structure

```
.
├── frontend/                  # React + TypeScript frontend
│   ├── src/
│   │   ├── components/       # React components (atoms, molecules, organisms)
│   │   ├── routes/          # TanStack Router routes
│   │   ├── lib/             # Utility functions
│   │   └── assets/          # Static assets
│   ├── docker/              # Frontend Docker configuration
│   └── package.json
│
├── backend-python/           # FastAPI backend
│   ├── src/
│   │   ├── auth/           # Authentication module
│   │   ├── email/          # Email service module
│   │   ├── graphql/        # GraphQL schema and resolvers
│   │   ├── database/       # Database configuration and migrations
│   │   ├── core/           # Core settings and security
│   │   └── main.py         # Application entry point
│   ├── docker/             # Backend Docker configuration
│   ├── test/               # Test files
│   └── requirement.txt
│
├── docs/                    # Project documentation
├── docker-compose.yml       # Multi-service orchestration
└── README.md
```

## 👤 Author

**Koentjoro**

- Portfolio: koentjoro.cloud
- GitHub: @KoentjoroFIG(https://github.com/KoentjoroFIG)
- LinkedIn: Koentjoro(https://linkedin.com/in/koentjoro)
