#!/usr/bin/env node

console.log(`
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║        🔥 BALAJI FIRE SAFETY - FIRE SAFETY WEBSITE 🔥       ║
║                                                               ║
║           Complete Full-Stack Business Website               ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝

📚 SETUP INSTRUCTIONS:

1️⃣  Start MongoDB:
   macOS:    brew services start mongodb-community
   Linux:    sudo systemctl start mongod
   Windows:  Start MongoDB service from Services

2️⃣  Setup Backend (Terminal 1):
   cd backend
   npm install
   npm run seed
   npm run dev

3️⃣  Setup Frontend (Terminal 2):
   cd frontend
   npm install
   npm run dev

4️⃣  Access the Application:
   🌐 Website:      http://localhost:5173
   🔐 Admin Panel:  http://localhost:5173/admin
   
   Admin Credentials:
   Username: admin
   Password: admin123

📖 For detailed documentation, see README.md
⚡ For quick setup, see QUICKSTART.md

🚀 Happy Coding!
`);
