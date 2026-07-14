#!/bin/bash

echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║     🔥 BALAJI FIRE SAFETY - AUTOMATIC STARTUP SCRIPT 🔥     ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Stopping all servers..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    exit 0
}

trap cleanup SIGINT SIGTERM

# Check Node.js
echo "✅ Checking Node.js..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install it from https://nodejs.org/"
    exit 1
fi
echo "   Node.js version: $(node -v)"

# Check MongoDB
echo ""
echo "📦 Checking MongoDB..."
if ! command -v mongod &> /dev/null; then
    echo "❌ MongoDB is not installed."
    echo "   Install with: brew tap mongodb/brew && brew install mongodb-community"
    exit 1
fi

# Start MongoDB if not running
if ! pgrep -x "mongod" > /dev/null; then
    echo "   Starting MongoDB..."
    brew services start mongodb-community 2>/dev/null
    sleep 3
else
    echo "   ✅ MongoDB is already running"
fi

# Backend Setup
echo ""
echo "🔧 Setting up Backend..."
cd backend

if [ ! -d "node_modules" ]; then
    echo "   📦 Installing backend dependencies (this may take 1-2 minutes)..."
    npm install --silent
else
    echo "   ✅ Backend dependencies already installed"
fi

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "   ⚠️  Creating .env file..."
    cat > .env << EOF
PORT=5000
MONGODB_URI=mongodb://localhost:27017/rdtech_db
JWT_SECRET=rdtech_super_secret_key_2026_change_in_production
JWT_EXPIRE=7d
NODE_ENV=development
EOF
fi

# Seed database
echo "   🌱 Seeding database with sample data..."
node seed.js

# Start Backend
echo ""
echo "🚀 Starting Backend Server on port 5000..."
npm run dev > ../backend.log 2>&1 &
BACKEND_PID=$!

sleep 3

# Check if backend started successfully
if ps -p $BACKEND_PID > /dev/null; then
    echo "   ✅ Backend server started successfully!"
else
    echo "   ❌ Backend failed to start. Check backend.log for errors."
    cat ../backend.log
    exit 1
fi

# Frontend Setup
echo ""
echo "🎨 Setting up Frontend..."
cd ../frontend

if [ ! -d "node_modules" ]; then
    echo "   📦 Installing frontend dependencies (this may take 1-2 minutes)..."
    npm install --silent
else
    echo "   ✅ Frontend dependencies already installed"
fi

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "   ⚠️  Creating .env file..."
    echo "VITE_API_URL=http://localhost:5000/api" > .env
fi

# Remove unnecessary App.css if it exists
if [ -f "src/App.css" ]; then
    rm -f src/App.css
fi

# Start Frontend
echo ""
echo "🚀 Starting Frontend Server on port 5173..."
npm run dev > ../frontend.log 2>&1 &
FRONTEND_PID=$!

sleep 3

# Check if frontend started successfully
if ps -p $FRONTEND_PID > /dev/null; then
    echo "   ✅ Frontend server started successfully!"
else
    echo "   ❌ Frontend failed to start. Check frontend.log for errors."
    cat ../frontend.log
    exit 1
fi

echo ""
echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║              🎉 ALL SERVERS ARE NOW RUNNING! 🎉              ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""
echo "🌐 Website:      http://localhost:5173"
echo "🔐 Admin Panel:  http://localhost:5173/admin"
echo "📡 Backend API:  http://localhost:5000"
echo ""
echo "Admin Login Credentials:"
echo "  Username: admin"
echo "  Password: admin123"
echo ""
echo "📊 Server Logs:"
echo "  Backend:  tail -f backend.log"
echo "  Frontend: tail -f frontend.log"
echo ""
echo "Press Ctrl+C to stop all servers"
echo ""

# Open browser automatically
sleep 2
open http://localhost:5173 2>/dev/null || echo "💡 Open http://localhost:5173 in your browser"

# Keep script running
wait
