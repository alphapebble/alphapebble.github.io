#!/bin/bash

# Simple script to preview the redesigned website

echo "Opening AlphaPebble redesigned website in your default browser..."

# Determine the OS and open the browser accordingly
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    open index-redesign.html
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Linux
    xdg-open index-redesign.html
elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
    # Windows
    start index-redesign.html
else
    echo "Unsupported OS. Please open index-redesign.html manually."
    exit 1
fi

echo "If the browser doesn't open automatically, please open index-redesign.html manually."
