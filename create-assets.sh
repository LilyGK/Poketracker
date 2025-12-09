#!/bin/bash

# Create placeholder assets using ImageMagick (if available) or download defaults

cd "$(dirname "$0")/assets"

# Function to create a simple colored PNG
create_placeholder() {
  local filename=$1
  local size=$2
  local color=$3
  
  # Try to use ImageMagick if available
  if command -v convert &> /dev/null; then
    convert -size ${size}x${size} xc:${color} "$filename"
    echo "Created $filename using ImageMagick"
  else
    echo "ImageMagick not found. Please add $filename manually or run: npm install -g expo-cli && expo install expo-splash-screen"
  fi
}

# Create placeholders
create_placeholder "icon.png" 1024 "#2196F3"
create_placeholder "splash.png" 2048 "#FFFFFF"
create_placeholder "adaptive-icon.png" 1024 "#2196F3"
create_placeholder "favicon.png" 48 "#2196F3"

echo "Asset placeholder generation complete!"
echo "Note: The app will work with Expo's defaults if these fail to generate."
