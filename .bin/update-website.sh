#!/usr/bin/env bash

CWD="$(pwd)"
REPO_DIR="$(basename "$CWD")"
REPO_PARENT_DIR="$(basename "$(dirname "$CWD")")"

if [[ "$REPO_DIR" == "cardboard-iguana.com" ]] && [[ "$REPO_PARENT_DIR" == "_repos" ]] && [[ -d ../../cardboard-iguana.com ]]; then
	find . -mindepth 1 \
	       -maxdepth 1 \
	       -not -iname '.bin' \
	       -not -iname '.git' \
	       -not -iname '.gitignore' \
	       -not -iname 'README.md' \
	       -exec rm -rf "{}" \;

	cp -rf ../../cardboard-iguana.com/* .
else
	echo "Unexpected execution directory"
	exit 1
fi
