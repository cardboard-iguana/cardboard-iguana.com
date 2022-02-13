#!/usr/bin/env bash

# Check to make sure that we're running in the repository root.
#
if [[ ! -f _config.yml || ! -d .bin ]]; then
	echo "This script must be run from the repository root!"
	exit 1
fi

# Clean destination directory.
#
[[ -d _site ]] && rm --recursive --force _site
#[[ -d _theme ]] && rm --recursive --force _theme

# Clone the theme and copy relevant files into the main repository.
#
#git clone https://github.com/necopinus/website-theme.git _theme
#rm --recursive --force _theme/README.md _theme/LICENSE
#mv _theme/* .
#rm --recursive --force _theme

# Build the site using either system Jekyll (assume that our
# environment has installed the necessary gems automatically) or via
# bundler.
#
if [[ -n "$(which jekyll)" ]]; then
	jekyll build --profile || exit 4
elif [[ -n "$(which bundle)" ]]; then
	bundle config set path vendor/bundle || exit 8
	bundle install || exit 3
	bundle exec jekyll build --profile || exit 16
else
	echo "Cannot find Bundler, and Jekyll does not seem to be installed."
	exit 32
fi

# Make all URLs relative (required for most web3 hosting solutions).
#
npm install
(
	cd _site
	../node_modules/.bin/all-relative
)

# Minify: https://github.com/tdewolff/minify
#
# Current version: 2.9.22 (last checked 2021-11-14)
#
# It's too bad we need to cart this binary around as part of the repo,
# but Fleek doesn't support installing our own tools (otherwise we'd
# just `apt install minify`).
#
# Note that sometimes `minify` will fail on a file, but when it does it
# simply leaves it untouched. We therefore return "true" at the end of
# the process in order to prevent Fleek from seeing this as a bad build.
#
# WARNING! Running `minify` AND Fleek's built-in optimization tends to
# result in invalid HTML/CSS/JS output! Fleek's optimization should
# therefore be turned off when "hand optimization" like this is used.
#
#chmod +x bin/minify
#mv _site _site.original
#(
#	cd _site.original
#	../.bin/minify --all --recursive --sync --output ../_site .
#)
#rm -rf _site.original
