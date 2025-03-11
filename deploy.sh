#!/bin/bash

# Exit on error and print commands
set -ex

# Check for uncommitted changes
if ! git diff-index --quiet HEAD --; then
    echo "Error: You have uncommitted changes. Please commit or stash them first."
    exit 1
fi

# Store the current branch name and repo info
CURRENT_BRANCH=$(git branch --show-current)
echo "Current branch is $CURRENT_BRANCH"

# Get repository info for GitHub Pages URL
REMOTE_URL=$(git config --get remote.origin.url)
if [[ $REMOTE_URL == https://* ]]; then
    # HTTPS URL format
    REPO_NAME=$(basename -s .git "$REMOTE_URL")
    GH_USERNAME=$(echo "$REMOTE_URL" | cut -d'/' -f4)
else
    # SSH URL format
    REPO_NAME=$(basename -s .git "$REMOTE_URL")
    GH_USERNAME=$(echo "$REMOTE_URL" | cut -d: -f2 | cut -d/ -f1)
fi

# Build the project
echo "Building project..."
npm install
npm run build

# Verify build output exists
if [ ! -f dist/index.html ]; then
    echo "Error: Build failed! index.html not found in dist/"
    exit 1
fi

echo "Build successful!"

# Create a temporary directory for the build
echo "Creating temporary directory for build artifacts..."
TEMP_DIR=$(mktemp -d)
cp -r dist/* "$TEMP_DIR/"

# Prepare gh-pages branch
echo "Preparing gh-pages branch..."
if git show-ref --verify --quiet refs/heads/gh-pages; then
    git branch -D gh-pages
fi

# Create a fresh gh-pages branch with no history
git checkout --orphan gh-pages

# Save important files
echo "Saving important files..."
if [ -f .env ]; then
    cp .env .env.temp
fi
if [ -f .gitignore ]; then
    cp .gitignore .gitignore.temp
fi

# Remove everything from working directory except .git and temp files
find . -maxdepth 1 ! -name '.git' ! -name '.' ! -name '..' ! -name '*.temp' -exec rm -rf {} +

# Copy the build files from temp directory
cp -r "$TEMP_DIR"/* .

# Restore important files
echo "Restoring important files..."
if [ -f .env.temp ]; then
    mv .env.temp .env
fi
if [ -f .gitignore.temp ]; then
    mv .gitignore.temp .gitignore
fi

# Clean up temp directory
rm -rf "$TEMP_DIR"

# Add all files in the current directory
git add .

# Commit the changes
git commit -m "Deploy to GitHub Pages"

# Force push to gh-pages
echo "Pushing to GitHub Pages..."
git push -f origin gh-pages

# Return to the original branch and restore dependencies
echo "Returning to $CURRENT_BRANCH branch..."
git checkout "$CURRENT_BRANCH"

echo "Installing dependencies..."
npm install

echo "Checking repository status..."
git status

echo "Deployed successfully to GitHub Pages!"
echo "Visit https://$GH_USERNAME.github.io/$REPO_NAME to see the deployment"
echo "Note: It may take a few minutes for the changes to be visible"
