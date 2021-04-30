.DEFAULT_GOAL := help

# Job parameter: src directory.
CURRENT_DIR := $(shell pwd)
SRC_DIR := $(shell basename `pwd` | sed "s|-|_|g")

.PHONY: help build test push format lint install.dependencies version.get version.set version.bump

#help:	@ List available tasks on this project
help:
	@grep -E '[a-zA-Z\.\-]+:.*?@ .*$$' $(MAKEFILE_LIST)| tr -d '#'  | awk 'BEGIN {FS = ":.*?@ "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

#install.dependencies: @ install dependencies.
install.dependencies:
	@exec >&2; \
	echo "> Installing dependencies."; \
	npm -s install

#build: @ Builds the package.
build: install.dependencies
	@exec >&2; \
	echo "> Building."; \
	npm run build

#test: @ Tests the package.
test: install.dependencies
	@exec >&2; \
	echo "> Testing."; \
	npm test

#test: @ Push the package.
push:
	@exec >&2; \
	echo "> Pushing."; \
	echo "NOOP."

#format: @ Format code
format: install.dependencies
	@exec >&2; \
	echo "> Formatting."; \
	npm run format:fix

#lint: @ Lint package
lint: install.dependencies
	@exec >&2; \
	echo "> Linting."; \
	npm run format:check

#version.get: @ Gets the version value.
version.get: install.dependencies
	@npm -s run get-version

#version.get-released: @ Gets the released version value.
version.get-released: version.get

#version.set: @ Sets the version value.
version.set: install.dependencies
	@exec >&2; \
	echo "> Setting version $(VERSION)"; \
	npm --no-git-tag-version --allow-same-version version $(VERSION)

#version.bump: @ Bump the version value.
version.bump: install.dependencies
	@exec >&2; \
	echo "> Bumping version."; \
	npm --no-git-tag-version version patch
