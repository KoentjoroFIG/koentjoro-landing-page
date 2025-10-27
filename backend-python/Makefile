# Install dependencies
install-deps:
	pip install -r requirement.txt

# uv.lock file
update-lock:
	uv pip compile requirement.txt -o uv.lock

# Run the application
run:
	uvicorn src.main:app --reload