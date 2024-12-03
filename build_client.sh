#!/bin/bash

# Navigate to the client directory
cd client || { echo "Failed to navigate to /client directory"; exit 1; }

# Run the build process
echo "Running 'bun run build'..."
if ! bun run build; then
    echo "Build failed!"
    exit 1
fi

# Ensure the ../server directory exists
if [ ! -d "../server" ]; then
    echo "Creating ../server directory..."
    mkdir -p ../server || { echo "Failed to create ../server directory"; exit 1; }
fi

# Copy the 'dist' directory to the ../server directory
echo "Copying 'dist' to ../server..."
if ! cp -r dist ../server/; then
    echo "Failed to copy 'dist' to ../server"
    exit 1
fi

# Navigate to the ../server directory
cd ../server || { echo "Failed to navigate to ../server directory"; exit 1; }

# Rename the 'dist' directory to 'client'
echo "Renaming 'dist' to 'client' in ../server..."
if ! mv dist client; then
    echo "Failed to rename 'dist' to 'client'"
    exit 1
fi

echo "Script completed successfully!"
