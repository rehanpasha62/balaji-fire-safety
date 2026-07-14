# 🚀 COMPLETE SETUP & RUN INSTRUCTIONS

## ✅ **EASIEST WAY - One Command Setup**

Just run this single command in your terminal:

```bash
cd "/Users/aashutoshdas/Documents/My first project" && ./start.sh
```

This will automatically:
- ✅ Check and start MongoDB
- ✅ Install all dependencies
- ✅ Seed the database
- ✅ Start backend server (port 5000)
- ✅ Start frontend server (port 5173)

---

## 📋 **MANUAL SETUP (If Script Doesn't Work)**

### **Step 1: Start MongoDB**
```bash
brew services start mongodb-community
```

### **Step 2: Setup Backend**
```bash
cd backend
npm install
npm run seed
npm run dev
```
Keep this terminal open!

### **Step 3: Setup Frontend (New Terminal)**
```bash
cd frontend
npm install
npm run dev
```
Keep this terminal open too!

---

## 🌐 **Access Your Application**

- **Website:** http://localhost:5173
- **Admin Panel:** http://localhost:5173/admin
- **Backend API:** http://localhost:5000

**Admin Login:**
- Username: `admin`
- Password: `admin123`

---

## ❌ **Troubleshooting**

### MongoDB Not Installed?
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

### Port Already in Use?
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Kill process on port 5173
lsof -ti:5173 | xargs kill -9
```

### Need to Reinstall Dependencies?
```bash
# Backend
cd backend
rm -rf node_modules package-lock.json
npm install

# Frontend
cd frontend
rm -rf node_modules package-lock.json
npm install
```

---

## 🎯 **What to Test After Running**

1. ✅ Home page - Hero section with services
2. ✅ Products - Browse 16 fire safety products
3. ✅ Services - View all service offerings
4. ✅ About - Company information
5. ✅ Contact - Submit a test inquiry
6. ✅ Admin Panel - Add/edit/delete products
7. ✅ Responsive - Test on mobile view

---

**Ready? Run the script or follow manual steps!** 🚀
