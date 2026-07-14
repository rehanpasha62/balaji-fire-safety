# BALAJI FIRE SAFETY - Fire Safety Website

## 🚀 Complete Full-Stack Website for Fire Safety Business

A modern, production-ready website for **BALAJI FIRE SAFETY**, a fire safety equipment supplier and service provider. Built with React.js, Node.js, Express, and MongoDB.

---

## 📋 Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Admin Panel](#admin-panel)
- [Environment Variables](#environment-variables)
- [Screenshots](#screenshots)

---

## ✨ Features

### Frontend Features
- **Home Page**: Hero section, services overview, product categories, featured products
- **About Us**: Company information, mission, vision, experience
- **Products Page**: Searchable product catalog with category filters
- **Services Page**: Detailed service offerings (Installation, Maintenance, AMC, Training)
- **Contact Page**: Contact form with validation, Google Maps integration
- **Admin Panel**: Secure login with JWT authentication
- **Responsive Design**: Mobile-first approach, works on all devices
- **Modern UI**: Clean, professional design with fire safety theme (Red, White, Dark)

### Backend Features
- **RESTful API**: Well-structured API endpoints
- **JWT Authentication**: Secure admin authentication
- **MongoDB Database**: Efficient data storage and retrieval
- **CRUD Operations**: Full product management
- **Contact Form**: Store and manage customer inquiries
- **Error Handling**: Comprehensive error handling and validation
- **CORS Enabled**: Cross-origin resource sharing configured

### Admin Panel Features
- **Dashboard**: Overview with statistics
- **Product Management**: Add, edit, delete products
- **Contact Management**: View and manage customer inquiries
- **Status Tracking**: Track contact form submissions
- **Secure Routes**: Protected with JWT authentication

---

## 🛠️ Tech Stack

### Frontend
- **React.js** (v19.2.0) - UI library
- **Vite** - Build tool
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **React Icons** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express.js** (v5.2.1) - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcrypt.js** - Password hashing
- **CORS** - Cross-origin support

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v5 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **npm** or **yarn** - Package manager

---

## 🔧 Installation

### 1. Clone the Repository
```bash
cd "My first project"
```

### 2. Install Backend Dependencies
```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies
```bash
cd ../frontend
npm install
npm install react-router-dom axios react-icons
npm install -D tailwindcss postcss autoprefixer
```

### 4. Configure Environment Variables

#### Backend (.env)
Create a `.env` file in the `backend` directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/rdtech_db
JWT_SECRET=rdtech_super_secret_key_2026_change_in_production
JWT_EXPIRE=7d
NODE_ENV=development
```

#### Frontend (.env)
Create a `.env` file in the `frontend` directory:
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🚀 Running the Application

### 1. Start MongoDB
Make sure MongoDB is running on your system:
```bash
# On macOS (if installed via Homebrew)
brew services start mongodb-community

# On Linux
sudo systemctl start mongod

# On Windows
# Start MongoDB service from Services panel
```

### 2. Seed the Database (First Time Only)
```bash
cd backend
npm run seed
```

This will:
- Create sample products (16 fire safety products)
- Create default admin user:
  - **Username**: `admin`
  - **Password**: `admin123`

### 3. Start Backend Server
```bash
cd backend
npm run dev
```
Backend will run on: **http://localhost:5000**

### 4. Start Frontend Development Server
Open a new terminal:
```bash
cd frontend
npm run dev
```
Frontend will run on: **http://localhost:5173**

---

## 📁 Project Structure

```
My first project/
├── backend/
│   ├── data/
│   │   └── sampleProducts.js       # Sample product data
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js               # MongoDB connection
│   │   ├── controllers/
│   │   │   ├── adminController.js  # Admin auth logic
│   │   │   ├── productController.js # Product CRUD
│   │   │   └── contactController.js # Contact form logic
│   │   ├── middleware/
│   │   │   └── auth.js             # JWT authentication
│   │   ├── models/
│   │   │   ├── Admin.js            # Admin schema
│   │   │   ├── Product.js          # Product schema
│   │   │   └── Contact.js          # Contact schema
│   │   ├── routes/
│   │   │   ├── adminRoutes.js      # Admin routes
│   │   │   ├── productRoutes.js    # Product routes
│   │   │   └── contactRoutes.js    # Contact routes
│   │   └── utils/
│   │       └── generateToken.js    # JWT token utility
│   ├── .env                        # Environment variables
│   ├── .env.example                # Example env file
│   ├── server.js                   # Express server
│   ├── seed.js                     # Database seeder
│   └── package.json
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   └── shared/
    │   │       ├── Navbar.jsx      # Navigation bar
    │   │       └── Footer.jsx      # Footer component
    │   ├── context/
    │   │   └── AuthContext.jsx     # Authentication context
    │   ├── pages/
    │   │   ├── Home.jsx            # Home page
    │   │   ├── About.jsx           # About page
    │   │   ├── Products.jsx        # Products page
    │   │   ├── Services.jsx        # Services page
    │   │   ├── Contact.jsx         # Contact page
    │   │   ├── AdminLogin.jsx      # Admin login
    │   │   └── AdminDashboard.jsx  # Admin dashboard
    │   ├── services/
    │   │   └── api.js              # Axios configuration
    │   ├── App.jsx                 # Main app component
    │   ├── main.jsx                # Entry point
    │   └── index.css               # Global styles
    ├── .env                        # Environment variables
    ├── tailwind.config.js          # Tailwind configuration
    ├── postcss.config.js           # PostCSS configuration
    ├── vite.config.js              # Vite configuration
    └── package.json
```

---

## 🔌 API Endpoints

### Admin Routes
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/admin/register` | Register new admin | No |
| POST | `/api/admin/login` | Admin login | No |
| GET | `/api/admin/profile` | Get admin profile | Yes |

### Product Routes
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/products` | Get all products | No |
| GET | `/api/products/featured` | Get featured products | No |
| GET | `/api/products/category/:category` | Get products by category | No |
| GET | `/api/products/:id` | Get single product | No |
| POST | `/api/products` | Create product | Yes |
| PUT | `/api/products/:id` | Update product | Yes |
| DELETE | `/api/products/:id` | Delete product | Yes |

### Contact Routes
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/contact` | Submit contact form | No |
| GET | `/api/contact` | Get all contacts | Yes |
| GET | `/api/contact/:id` | Get single contact | Yes |
| PUT | `/api/contact/:id` | Update contact status | Yes |
| DELETE | `/api/contact/:id` | Delete contact | Yes |

---

## 🔐 Admin Panel

### Access Admin Panel
1. Navigate to: **http://localhost:5173/admin**
2. Use default credentials:
   - **Username**: `admin`
   - **Password**: `admin123`

### Admin Features
- View dashboard with statistics
- Add, edit, delete products
- Manage product categories
- View and respond to customer inquiries
- Update contact form submission status
- Logout functionality

---

## 🌍 Environment Variables

### Backend Variables
```env
PORT=5000                          # Server port
MONGODB_URI=mongodb://...          # MongoDB connection string
JWT_SECRET=your_secret_key         # JWT secret for token generation
JWT_EXPIRE=7d                      # Token expiration time
NODE_ENV=development               # Environment (development/production)
```

### Frontend Variables
```env
VITE_API_URL=http://localhost:5000/api  # Backend API URL
```

---

## 🎨 Product Categories

1. **Fire Extinguishers** - ABC, CO2, Foam extinguishers
2. **Fire Alarm Systems** - Addressable panels, smoke detectors, manual call points
3. **Fire Hydrant Systems** - Landing valves, hose pipes, fire pumps
4. **Fire Sprinkler Systems** - Wet pipe systems, sprinkler heads
5. **Fire Suppression Systems** - FM-200, kitchen suppression
6. **Fire Safety Accessories** - Fire blankets, exit signs, safety signage

---

## 📝 Sample Data

The seed script includes:
- **16 Sample Products** across all categories
- **1 Admin User** for testing
- All products have detailed specifications

---

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token-based authentication
- Protected API routes
- CORS configuration
- Input validation
- XSS protection

---

## 📱 Responsive Design

The website is fully responsive and works perfectly on:
- Desktop (1920px and above)
- Laptop (1024px - 1919px)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

---

## 🚀 Deployment

### Backend Deployment (Heroku/Railway/Render)
1. Update `MONGODB_URI` to your production MongoDB
2. Update `JWT_SECRET` to a strong secret key
3. Set `NODE_ENV=production`
4. Deploy using your preferred platform

### Frontend Deployment (Vercel/Netlify)
1. Build the project: `npm run build`
2. Update `VITE_API_URL` to your production API URL
3. Deploy the `dist` folder

---

## 📄 License

This project is licensed under the ISC License.

---

## Contact

For support or inquiries:
- Website: [Your Website URL]
- Email: primeventures07@gmail.com
- Phone: +977 9802940260

## Troubleshooting

If you encounter any issues:

1. Check that MongoDB is running
2. Verify all environment variables are set correctly
3. Contact support at primeventures07@gmail.com

---

## 👨‍💻 Author

**BALAJI FIRE SAFETY**
- Website: [www.rdtecheng.com](http://www.rdtecheng.com)
- Email: info@rdtecheng.com
- Phone: +91 98765 43210

---

## 🙏 Support

For any issues or questions:
1. Check the documentation
2. Review the code comments
3. Contact support at info@rdtecheng.com

---

## 🎯 Future Enhancements

- [ ] Image upload for products
- [ ] Email notifications for contact forms
- [ ] PDF generation for quotes
- [ ] Multi-language support
- [ ] Payment gateway integration
- [ ] Customer portal
- [ ] Testimonials section
- [ ] Blog/News section

---

**Built with ❤️ for Fire Safety**
