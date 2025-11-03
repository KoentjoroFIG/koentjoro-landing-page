 -include .env

install-dev-deps:
	pip install -r requirement.dev.txt

install-prod-deps:
	pip install -r requirement.prod.txt

update-dev-lock:
	uv pip compile requirement.dev.txt -o uv.dev.lock

update-prod-lock:
	uv pip compile requirement.prod.txt -o uv.prod.lock

run:
	uvicorn src.main:app --host 0.0.0.0 --port 8000 --reload

pre-commit:
	pre-commit run --all-files


.PHONY: create-migration roll-up-one

create-migration:
	beanie new-migration -n $(migration_name) -p src/database/migrations

roll-up-one:
	export PYTHONPATH=$(shell pwd) && beanie migrate -uri $(CONNECTION_STRING) -db $(MONGODB_NAME) -p src/database/migrations --distance 1

roll-up-all:
	export PYTHONPATH=$(shell pwd) && beanie migrate -uri $(CONNECTION_STRING) -db $(MONGODB_NAME) -p src/database/migrations

roll-down-one:
	export PYTHONPATH=$(shell pwd) && beanie migrate -uri $(CONNECTION_STRING) -db $(MONGODB_NAME) -p src/database/migrations --distance -1 --backward

roll-down-all:
	export PYTHONPATH=$(shell pwd) && beanie migrate -uri $(CONNECTION_STRING) -db $(MONGODB_NAME) -p src/database/migrations --backward
