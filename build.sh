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

if [[ -d "$SCRIPT_DIR/.git" ]] && [[ -d "$SCRIPT_DIR/quartz" ]] && [[ -d "$SCRIPT_DIR/quartz.overlay" ]] && [[ -d "$SCRIPT_DIR/www/$OBSIDIAN_VAULT" ]]; then
	QUARTZ_DIR="$SCRIPT_DIR/quartz"
	OVERLAY_DIR="$SCRIPT_DIR/quartz.overlay"
	OUTPUT_DIR="$SCRIPT_DIR/www/$OBSIDIAN_VAULT"
else
	echo "Could not locate git repo!"
	echo ""
	echo "---"
	echo ""
	echo "git clone git@github.com:cardboard-iguana/cardboard-iguana.com.git"
	echo "cd cardboard-iguana.com"
	echo "./build.sh"
	echo "git add -A -v"
	echo "git commit -m \"Some commit message\""
	echo "git push"
	echo ""
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
BUILD_DIR="$(mktemp --directory --tmpdir="$SCRIPT_DIR")"

cp -af "$QUARTZ_DIR"/* "$BUILD_DIR"/
cp -af "$OVERLAY_DIR"/* "$BUILD_DIR"/

(
	cd "$BUILD_DIR"

	rm -rf "$OUTPUT_DIR"
	mkdir -p "$OUTPUT_DIR"

	rm -f package-lock.json
	yarn install
)

# Build the site!
#
if [[ "$1" == "serve" ]]; then
	(
		cd "$BUILD_DIR"
		yarn run quartz build --directory "$DATA_DIR" --output "$OUTPUT_DIR" --serve
	)
else
	(
		cd "$BUILD_DIR"
		yarn run quartz build --directory "$DATA_DIR" --output "$OUTPUT_DIR"
	)
fi

# Directory clean-up.
#
while IFS= read -d '' -r EXTRA_DIR; do
	rm -rvf "$EXTRA_DIR"
done < <(find "$OUTPUT_DIR" -mindepth 2 -maxdepth 2 -type d -print0)

rm -rf "$BUILD_DIR"
