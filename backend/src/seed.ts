import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User';
import bcrypt from 'bcrypt';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/car-dealership';

async function seed() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected.');

    const adminEmail = 'admin@gmail.com';
    const customerEmail = 'customer@gmail.com';

    // Seed Admin
    let admin = await User.findOne({ email: adminEmail });
    if (!admin) {
      const hashedPassword = await bcrypt.hash('admin1234', 10);
      await User.create({
        name: 'Demo Admin',
        email: adminEmail,
        password: hashedPassword,
        role: 'admin',
      });
      console.log(`Created admin user: ${adminEmail}`);
    } else {
      console.log(`Admin user ${adminEmail} already exists.`);
    }

    // Seed Customer
    let customer = await User.findOne({ email: customerEmail });
    if (!customer) {
      const hashedPassword = await bcrypt.hash('cust1234', 10);
      await User.create({
        name: 'Demo Customer',
        email: customerEmail,
        password: hashedPassword,
        role: 'user',
      });
      console.log(`Created customer user: ${customerEmail}`);
    } else {
      console.log(`Customer user ${customerEmail} already exists.`);
    }

    console.log('Seeding complete.');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
}

seed();
