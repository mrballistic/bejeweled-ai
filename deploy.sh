#!/bin/bash

# Exit on error
set -e

# Store the current branch name
CURRENT_BRANCH=$(git branch --show-current)
echo "Current branch is $CURRENT_BRANCH"

# Install dependencies first
echo "Installing dependencies..."
npm install

# Delete the local gh-pages branch if it exists
if git show-ref --verify --quiet refs/heads/gh-pages; then
    git branch -D gh-pages
fi

# Create a fresh orphan gh-pages branch
git checkout --orphan gh-pages

# Remove all files from the working directory
git rm -rf .

# Checkout files from main
git checkout main -- .

# Install dependencies again (needed after checking out files)
echo "Installing dependencies..."
npm install

# Build the project with relative paths
echo "Building project..."
npx vite build --base=./

# Remove all files except the dist folder and git files
echo "Cleaning up files..."
find . -maxdepth 1 ! -name 'dist' ! -name '.git' ! -name '.' ! -name '..' -exec rm -rf {} +

# Move dist contents to root
mv dist/* .
rm -rf dist

# Add all changes
git add .
git commit -m "Deploy to GitHub Pages"

# Force push to gh-pages
echo "Pushing to GitHub Pages..."
git push -f origin gh-pages

# Return to the original branch
git checkout $CURRENT_BRANCH

# Push main branch
echo "Pushing main branch..."
git push origin main

echo "Installing dependencies..."
npm install

echo "Deployed successfully to GitHub Pages!"
