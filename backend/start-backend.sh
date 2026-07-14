#!/bin/bash

echo "🔧 Starting Backend Server..."
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Seed database
echo "🌱 Seeding database..."
npm run seed

# Start server
echo "🚀 Starting backend on http://localhost:5000"
echo ""
npm run dev
