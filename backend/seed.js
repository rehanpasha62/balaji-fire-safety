import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import Admin from './src/models/Admin.js';
import Product from './src/models/Product.js';
import Service from './src/models/Service.js';
import { sampleProducts } from './data/sampleProducts.js';
import { sampleServices } from './data/sampleServices.js';
import { fireExtinguishers } from './data/fireExtinguishers.js';

dotenv.config();

const seedDatabase = async () => {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await connectDB();

    console.log('🗑️  Clearing existing data...');
    await Product.deleteMany({});
    await Service.deleteMany({});
    
    console.log('📦 Seeding products...');
    await Product.insertMany(sampleProducts);
    console.log(`✅ ${sampleProducts.length} products added successfully!`);

    console.log('🧯 Seeding fire extinguishers...');
    await Product.insertMany(fireExtinguishers);
    console.log(`✅ ${fireExtinguishers.length} fire extinguishers added successfully!`);

    console.log('🔧 Seeding services...');
    await Service.insertMany(sampleServices);
    console.log(`✅ ${sampleServices.length} services added successfully!`);

    // Check if admin exists
    const adminExists = await Admin.findOne({ username: 'admin' });
    
    if (!adminExists) {
      console.log('👤 Creating default admin user...');
      const newAdmin = await Admin.create({
        username: 'admin',
        email: 'admin@rdtecheng.com',
        password: 'admin123',
      });
      console.log('✅ Admin user created successfully!');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('📝 ADMIN CREDENTIALS:');
      console.log('   Username: admin');
      console.log('   Password: admin123');
      console.log('   Email:', newAdmin.email);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    } else {
      console.log('ℹ️  Admin user already exists');
      console.log('   Username:', adminExists.username);
      console.log('   Email:', adminExists.email);
      console.log('   Use password: admin123 (if not changed)');
    }

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n🚀 You can now start the servers:');
    console.log('   Backend:  npm run dev (in backend folder)');
    console.log('   Frontend: npm run dev (in frontend folder)');
    console.log('\n🔐 Login URL: http://localhost:5173/admin');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    console.error('Make sure MongoDB is running: brew services start mongodb-community');
    process.exit(1);
  }
};

seedDatabase();
