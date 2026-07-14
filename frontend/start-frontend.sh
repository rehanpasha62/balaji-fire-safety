#!/bin/bash

echo "🎨 Starting Frontend Server..."
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Remove App.css if exists
if [ -f "src/App.css" ]; then
    rm -f src/App.css
fi

# Start server
echo "🚀 Starting frontend on http://localhost:5173"
echo ""
npm run dev
