#!/usr/bin/env bash

# Check to make sure that we're running in the repository root.
#
if [[ ! -f _config.yml || ! -d .bin ]]; then
	echo "This script must be run from the repository root!"
	exit 1
fi

# Remove old _theme directory, if it exists
#
[[ -d _theme ]] && rm --recursive --force _theme

# Clone the theme and copy relevant files into the main repository.
#
git clone https://github.com/necopinus/website-theme.git _theme
rm --force _theme/README.md _theme/LICENSE
find _theme -mindepth 1 -maxdepth 1 -not -iname '.*' -exec basename "{}" \; | xargs rm --recursive --force
mv _theme/* .
rm --recursive --force _theme

# Build website.
#
./_build/html.sh
