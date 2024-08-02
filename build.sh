#!/usr/bin/env bash

OBSIDIAN_VAULT="grimoire"

set -e

# Make sure yarn is available.
#
if [[ -z "$(which yarn 2> /dev/null)" ]]; then
	echo "Could not find yarn in the system PATH!"
	exit 1
fi

# Try to locate the git directory based on the path of this script.
#
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

if [[ ! -d "$SCRIPT_DIR/.git" ]] || [[ ! -d "$SCRIPT_DIR/overlay" ]] || [[ ! -d "$SCRIPT_DIR/www/$OBSIDIAN_VAULT" ]]; then
	echo "Could not locate website git repo!"
	exit 1
fi

# Try to locate Obsidian vault directory.
#
if [[ -d "$HOME/Documents/Obsidian/$OBSIDIAN_VAULT/.obsidian" ]]; then
	DATA_DIR="$HOME/Documents/Obsidian/$OBSIDIAN_VAULT"
elif [[ -d "$HOME/storgage/shared/Documents/Obsidian/$OBSIDIAN_VAULT/.obsidian" ]]; then
	DATA_DIR="$HOME/storgage/shared/Documents/Obsidian/$OBSIDIAN_VAULT"
elif [[ -d "$HOME/Obsidian/$OBSIDIAN_VAULT/.obsidian" ]]; then
	DATA_DIR="$HOME/Obsidian/$OBSIDIAN_VAULT"
elif [[ -d "$HOME/obsidian/$OBSIDIAN_VAULT/.obsidian" ]]; then
	DATA_DIR="$HOME/obsidian/$OBSIDIAN_VAULT"
else
	echo "Could not locate Obsidian vault $OBSIDIAN_VAULT in the usual locations!"
	exit 1
fi

# Set up the build directory.
#
(
	cd "$SCRIPT_DIR"

	[[ -e build ]] && rm -rf build
	git clone https://github.com/jackyzha0/quartz.git build
	rm -rf build/.git
	rm -f build/package-lock.json

	cp -af overlay/* build/

	[[ -e "www/$OBSIDIAN_VAULT" ]] && rm -rf "www/$OBSIDIAN_VAULT"
	mkdir -p "www/$OBSIDIAN_VAULT"

	cd build
	yarn install
)

# Build the site!
#
if [[ "$1" == "serve" ]]; then
	(
		cd "$SCRIPT_DIR/build"
		yarn run quartz build \
			--directory "$DATA_DIR" \
			--output "$SCRIPT_DIR/www/$OBSIDIAN_VAULT" \
			--serve
	)
else
	(
		cd "$SCRIPT_DIR/build"
		yarn run quartz build \
			--directory "$DATA_DIR" \
			--output "$SCRIPT_DIR/www/$OBSIDIAN_VAULT"
	)
fi
