# 🚀 Quick Start Guide - BALAJI FIRE SAFETY Website

## Step-by-Step Setup (5 Minutes)

### 1️⃣ Start MongoDB
```bash
# macOS (Homebrew)
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows - Start MongoDB service from Services panel
```

### 2️⃣ Setup Backend
```bash
cd backend
npm install
npm run seed
npm run dev
```

**Backend will run on:** http://localhost:5000

### 3️⃣ Setup Frontend (New Terminal)
```bash
cd frontend
npm install
npm run dev
```

**Frontend will run on:** http://localhost:5173

---

## 🎉 You're Ready!

### Access the Website
- **Public Website:** http://localhost:5173
- **Admin Panel:** http://localhost:5173/admin

### Default Admin Credentials
- **Username:** admin
- **Password:** admin123

---

## 📱 Test the Features

### Public Pages
1. ✅ Home - Hero section, services, products
2. ✅ About - Company information
3. ✅ Products - Browse all 16 products with filters
4. ✅ Services - View all service offerings
5. ✅ Contact - Submit inquiry form

### Admin Panel
1. ✅ Login with admin credentials
2. ✅ View dashboard statistics
3. ✅ Add/Edit/Delete products
4. ✅ Manage contact form submissions
5. ✅ Update contact status (New/Read/Responded)

---

## 🔧 Troubleshooting

### MongoDB Connection Error
- Make sure MongoDB is running
- Check if port 27017 is available

### Port Already in Use
- Backend: Change PORT in backend/.env
- Frontend: Vite will auto-select next available port

### Module Not Found Error
- Run `npm install` in both backend and frontend directories

---

## 📞 Need Help?

Check the main README.md for detailed documentation!
