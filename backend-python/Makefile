# Install dependencies
install-deps:
	pip install -r requirement.txt

# uv.lock file
update-lock:
	uv pip compile requirement.txt -o uv.lock

# Run the application
run:
	uvicorn src.main:app --host 0.0.0.0 --port 8000 --reload