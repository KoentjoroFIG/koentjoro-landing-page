run-dev:
	docker compose up -d

build-dev:
	docker compose up --build -d

run-prod:
	docker compose -f docker-compose.prod.yml up -d

build-prod:
	docker compose -f docker-compose.prod.yml up --build -d