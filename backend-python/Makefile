# Install dependencies
install-dev-deps:
	pip install -r requirement.dev.txt

install-prod-deps:
	pip install -r requirement.prod.txt

# uv.lock file
update-dev-lock:
	uv pip compile requirement.dev.txt -o uv.dev.lock

update-prod-lock:
	uv pip compile requirement.prod.txt -o uv.prod.lock

# Run the application
run:
	uvicorn src.main:app --host 0.0.0.0 --port 8000 --reload

pre-commit:
	pre-commit run --all-files
