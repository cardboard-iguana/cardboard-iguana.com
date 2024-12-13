#!/usr/bin/env bash

OBSIDIAN_VAULT="grimoire"

set -e

# Make sure yarn and gawk are available.
#
if [[ -z "$(which yarn 2> /dev/null)" ]]; then
	echo "Could not find yarn in your system's PATH!"
	exit 1
fi

if [[ -z "$(which gawk 2> /dev/null)" ]]; then
	echo "Could not find gawk in your system's PATH!"
	exit 1
fi

# Try to locate the git directory based on the path of this script.
#
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

if [[ ! -d "$SCRIPT_DIR/.git" ]] || [[ ! -d "$SCRIPT_DIR/overlay" ]] || [[ ! -d "$SCRIPT_DIR/www" ]]; then
	echo "Could not locate website git repo!"
	exit 1
fi

# Try to locate Obsidian vault directory.
#
if [[ -d "$HOME/Documents/Obsidian/$OBSIDIAN_VAULT/.obsidian" ]]; then
	DATA_DIR="$HOME/Documents/Obsidian/$OBSIDIAN_VAULT"
elif [[ -d "$HOME/storage/shared/Documents/Obsidian/$OBSIDIAN_VAULT/.obsidian" ]]; then
	DATA_DIR="$HOME/storage/shared/Documents/Obsidian/$OBSIDIAN_VAULT"
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
	mkdir build
	cd build

	cp -af "$DATA_DIR" obsidian
	cd obsidian
	rm -rf .obsidian \
	       .trash \
	       assets/private \
	       metadata \
	       templates
	find . -type f \( -name '.DS_Store' -o -name '.nomedia' \) -delete
	find . -type f -iname '*.md' -exec gawk -i inplace '{ _ = 0 }; \
	     match($0, /(.*)!\[([^\]]+)\]\(([^:\)]+)\)(.*)/, u) { \
	         _ = 1; \
	         gsub("%20", " ", u[3]); \
	         printf("%s![[%s|%s]]%s\n", u[1], u[3], u[2], u[4]) \
	     }; !_ { print $0 }' "{}" \;

	cd ..
	cp -af ../quartz quartz
	cp -af ../overlay/* quartz/
	cd quartz
	rm -rf .git \
	       package-lock.json
	yarn install
)

# Build the site!
#
(
	cd "$SCRIPT_DIR"

	[[ -e "www/$OBSIDIAN_VAULT" ]] && rm -rf "www/$OBSIDIAN_VAULT"
	mkdir -p "www/$OBSIDIAN_VAULT"

	cd build/quartz
	if [[ "$1" == "serve" ]]; then
		yarn run quartz build \
			--directory ../obsidian \
			--output ../../www/"$OBSIDIAN_VAULT" \
			--serve
	else
		yarn run quartz build \
			--directory ../obsidian \
			--output ../../www/"$OBSIDIAN_VAULT"

		cd ../../www/"$OBSIDIAN_VAULT"
		while IFS= read -d '' -r DIR; do
			DIR_NAME="$(basename "$DIR")"
			sed -i'' "s#href=\"\./$DIR_NAME/\.\./\.\./#href=\"./$DIR_NAME/../#g" index.html
		done < <(find . -mindepth 1 -maxdepth 1 -type d -print0)
	fi
)
