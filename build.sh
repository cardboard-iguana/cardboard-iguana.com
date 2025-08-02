#!/usr/bin/env bash

OBSIDIAN_VAULT="grimoire"
WEB_PATH="https://cardboard-iguana.com/grimoire"

set -e

# Try to locate the git directory based on the path of this script.
#
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

if [[ ! -d "$SCRIPT_DIR/.git" ]] || [[ ! -d "$SCRIPT_DIR/overlay" ]] || [[ ! -d "$SCRIPT_DIR/www" ]]; then
	echo "Could not locate website git repo!"
	exit 1
fi

cd "$SCRIPT_DIR"

# Determine which yarn to use
#
if [[ -n "$(which yarn 2> /dev/null)" ]]; then
	YARN="$(which yarn)"
	INSTALL_YARN="no"
elif [[ -n "$(corepack 2> /dev/null)" ]]; then
	YARN="$SCRIPT_DIR/build/quartz/yarn"
	INSTALL_YARN="yes"
else
	echo "Yarn is not installed and Node Corepack is not available!"
	exit 1
fi

# Try to locate Obsidian vault directory.
#
if [[ -d "$HOME/notes/$OBSIDIAN_VAULT/.obsidian" ]]; then
	DATA_DIR="$HOME/notes/$OBSIDIAN_VAULT"
elif [[ -d "$HOME/storage/shared/Documents/Obsidian/$OBSIDIAN_VAULT/.obsidian" ]]; then
	DATA_DIR="$HOME/storage/shared/Documents/Obsidian/$OBSIDIAN_VAULT"
elif [[ -d "$HOME/Documents/Obsidian/$OBSIDIAN_VAULT/.obsidian" ]]; then
	DATA_DIR="$HOME/Documents/Obsidian/$OBSIDIAN_VAULT"
else
	echo "Could not locate Obsidian vault $OBSIDIAN_VAULT in the usual locations!"
	exit 1
fi

# Clean build directory and exit if instructed  to do so
#
if [[ "$1" == "clean" ]]; then
	if [[ -e build ]]; then
		rm -rf build
	fi
	exit
fi

# Set up the build directory.
#
(
	mkdir -p build
	cd build

	if [[ ! -d obsidian ]]; then
		rm -f obsidian
	fi
	if [[ ! -e obsidian ]]; then
		cp -af "$DATA_DIR" obsidian
		cd obsidian
		rm -rf .obsidian \
		       .trash \
		       assets/private \
		       metadata \
		       templates
		find . -type f \( -name '.DS_Store' -o -name '.nomedia' \) -delete
		cd ..
	fi

	if [[ ! -d quartz ]]; then
		rm -f quartz
	fi
	if [[ ! -e quartz ]]; then
		cp -af ../quartz quartz
	fi

	cp -af ../overlay/* quartz/
	cd quartz
	if [[ -e .git ]]; then
		rm -rf .git
	fi
	if [[ -e package-lock.json ]]; then
		rm -f package-lock.json
	fi
	if [[ ! -f quartz/styles/custom-fonts.scss ]]; then
		curl -fsSL -o quartz/styles/custom-fonts.scss "https://fonts.googleapis.com/css2?family=Noto+Emoji:wght@300..700&display=swap"
	fi
	if [[ "$INSTALL_YARN" == "yes" ]]; then
		corepack enable --install-directory .
	fi
	$YARN install
)

# Build the site!
#
(
	if [[ -e "www/$OBSIDIAN_VAULT" ]]; then
		rm -rf "www/$OBSIDIAN_VAULT"
	fi
	mkdir -p "www/$OBSIDIAN_VAULT"

	cd build/quartz
	if [[ "$1" == "serve" ]]; then
		$YARN run quartz build \
		    --directory ../obsidian \
		    --output ../../www/"$OBSIDIAN_VAULT" \
		    --serve
	else
		$YARN run quartz build \
		    --directory ../obsidian \
		    --output ../../www/"$OBSIDIAN_VAULT"
	fi
	sed -i.bak -e "s#href=\&quot;[\./]*/#href=\&quot;$WEB_PATH/#g;s#src=\&quot;[\./]*/#src=\&quot;$WEB_PATH/#g;s#$WEB_PATH/[\./]*/#$WEB_PATH/#g" ../../www/"$OBSIDIAN_VAULT"/index.xml
	rm ../../www/"$OBSIDIAN_VAULT"/index.xml.bak
)
