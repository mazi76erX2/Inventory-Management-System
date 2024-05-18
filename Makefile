SHELL = /bin/bash
.ONESHELL:
.SHELLFLAGS := -eu -o pipefail -c
.DELETE_ON_ERROR:
.DEFAULT_GOAL := help

include .env
export $(shell sed 's/=.*//' .env)
export PYTHONPATH
export PIPENV_VENV_IN_PROJECT=1

PYTHON := python3
PIP := $(PYTHON) -m pip
PIPENV := $(PYTHON) -m pipenv

POSTGRES_COMMAND := /Applications/Postgres.app/Contents/Versions/latest/bin

APP_NAME = inventory-mnagement-system:0.0.1
APP_DIR = backend
TEST_SRC = $(APP_DIR)/tests

help: ## Show available targets
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN \
	{FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

### Local commands ###

venv:
	$(PIP) install -U pipenv
	$(PIPENV) shell

install-packages:
	$(PIPENV) install --dev

create-local-database-linux:
	sudo -u postgres psql -c 'create database $(DATABASE_NAME);'
	sudo -u postgres psql -c 'grant all privileges on database $(DATABASE_NAME) \
	to $(DATABASE_USERNAME);'

create-local-database-mac:
	sudo mkdir -p /etc/paths.d && \
  	echo $(POSTGRES_COMMAND) \
  	| sudo tee /etc/paths.d/postgresapp

	sudo $(POSTGRES_COMMAND)/psql -U postgres -c 'create database $(DATABASE_NAME);'
	sudo $(POSTGRES_COMMAND)/psql -U postgres -c 'grant all privileges \
	 on database $(DATABASE_NAME) to $(DATABASE_USERNAME);'

drop-local-database-linux:
	sudo psql -U postgres -c 'drop database $(DATABASE_NAME);'

drop-local-database-mac:
	sudo $(POSTGRES_COMMAND)/psql -U postgres -c 'drop database $(DATABASE_NAME);'

run-local:
	$(PYTHON) -m uvicorn --chdir $(APP_DIR) main:app --reload

makemigrations:
	$(PYTHON) -m alembic $(APP_DIR) revision --autogenerate

migrate:
	$(PYTHON) -m alembic $(APP_DIR) upgrade head

create-mock-data:
	$(PYTHON) management/create_mock_data.py

test:
	$(PYTHON) -m pytest $(TEST_SRC)

### Docker commands ###
up:
	docker compose up -d --build

down:
	docker compose down -v

logs:
	docker compose logs -f

docker-makemigrations:
	docker compose exec backend python -m alembic $(APP_DIR) revision --autogenerate -m

docker-migrate:
	docker compose exec backend python -m alembic $(APP_DIR) upgrade head

docker-test:
	docker compose exec backend python -m pytest $(TEST_SRC)

create-mock-data:
	docker compose exec backend python management/create_mock_data.py

### Docker production commands ###
prod-migrate:
	docker compose -f docker-compose.prod.yml exec backend python -m alembic $(APP_DIR) upgrade head

prod-up:
	docker compose -f docker-compose.prod.yml up -d --build

prod-down:
	docker compose -f docker-compose.prod.yml down -v

copy-env:
	exec cp .env.example .env

push-image-aws:
	docker build -t $(AWS_ACCOUNT_URI):latest .

	aws ecr get-login-password --region $(AWS_REGION) | docker login \
    --username AWS --password-stdin \
    $(AWS_ACCOUNT_ID).dkr.ecr.$(AWS_REGION).amazonaws.com

	docker push $(AWS_ACCOUNT_ID).dkr.ecr.$(AWS_REGION).amazonaws.com/django-app:latest

.PHONY: help venv install-packages create-local-database-linux
	create-local-database-mac drop-local-database run-local migrate test up down
	test-docker copy-env push-image-aws prod-migrate prod-download-ml-models
	prod-up prod-down logs
