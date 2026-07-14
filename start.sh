#!/bin/bash

echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║        🔥 BALAJI FIRE SAFETY - SETUP & RUN SCRIPT 🔥        ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if MongoDB is running
echo "📦 Step 1: Checking MongoDB..."
# Check multiple ways MongoDB might be running on macOS
if pgrep -f "mongod" > /dev/null || brew services list | grep mongodb-community | grep started > /dev/null 2>&1 || lsof -i:27017 > /dev/null 2>&1; then
    echo -e "${GREEN}✅ MongoDB is running${NC}"
else
    echo -e "${YELLOW}⚠️  MongoDB is not running. Starting MongoDB...${NC}"
    
    # Try to start MongoDB with brew services
    if brew services start mongodb-community 2>/dev/null; then
        echo -e "${GREEN}✅ MongoDB started successfully${NC}"
        sleep 3
    else
        # If brew services fails, try mongod directly
        echo -e "${YELLOW}Trying to start MongoDB directly...${NC}"
        if command -v mongod &> /dev/null; then
            mongod --config /opt/homebrew/etc/mongod.conf --fork 2>/dev/null || mongod --dbpath ~/data/db --fork 2>/dev/null || {
                echo -e "${RED}❌ Could not start MongoDB. Please start it manually:${NC}"
                echo "   brew services start mongodb-community"
                echo "   OR"
                echo "   mongod --dbpath ~/data/db"
                exit 1
            }
            sleep 3
        else
            echo -e "${RED}❌ MongoDB not installed. Please install it first:${NC}"
            echo "   brew tap mongodb/brew"
            echo "   brew install mongodb-community"
            echo "   brew services start mongodb-community"
            exit 1
        fi
    fi
fi

# Backend setup
echo ""
echo "🔧 Step 2: Setting up Backend..."
cd backend

if [ ! -d "node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    npm install
else
    echo -e "${GREEN}✅ Backend dependencies already installed${NC}"
fi

# Seed database
echo ""
echo "🌱 Step 3: Seeding database..."
npm run seed

echo ""
echo "🚀 Step 4: Starting Backend Server..."
echo -e "${YELLOW}Backend will run on http://localhost:5001${NC}"
npm run dev &
BACKEND_PID=$!

# Wait for backend to start
sleep 3

# Frontend setup
echo ""
echo "🎨 Step 5: Setting up Frontend..."
cd ../frontend

if [ ! -d "node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    npm install
else
    echo -e "${GREEN}✅ Frontend dependencies already installed${NC}"
fi

echo ""
echo "🚀 Step 6: Starting Frontend Server..."
echo -e "${YELLOW}Frontend will run on http://localhost:5173${NC}"
npm run dev &
FRONTEND_PID=$!

echo ""
echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║                    🎉 ALL SERVERS RUNNING! 🎉                 ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""
echo -e "${GREEN}🌐 Website:     ${NC}http://localhost:5173"
echo -e "${GREEN}🔐 Admin Panel: ${NC}http://localhost:5173/admin"
echo -e "${GREEN}📡 Backend API: ${NC}http://localhost:5000"
echo ""
echo "Admin Credentials:"
echo "  Username: admin"
echo "  Password: admin123"
echo ""
echo "Press Ctrl+C to stop all servers"
echo ""

# Wait for user interrupt
wait
