#!/bin/bash

# Exit on error
set -e

# Store the current branch name
CURRENT_BRANCH=$(git branch --show-current)
echo "Current branch is $CURRENT_BRANCH"

# Switch to gh-pages branch (create if it doesn't exist)
if git show-ref --verify --quiet refs/heads/gh-pages; then
    git checkout gh-pages
    git pull origin gh-pages
else
    git checkout --orphan gh-pages
fi

# Get the latest main branch content
git reset --hard origin/main

# Build the project
npm run build

# Remove all files except the dist folder and git files
find . -maxdepth 1 ! -name 'dist' ! -name '.git' ! -name '.' ! -name '..' -exec rm -rf {} +

# Move dist contents to root
mv dist/* .
rm -rf dist

# Add all changes
git add -A
git commit -m "Deploy to GitHub Pages"

# Force push to gh-pages
git push -f origin gh-pages

# Return to the original branch
git checkout $CURRENT_BRANCH

echo "Deployed successfully to GitHub Pages!"
