import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User';
import Vehicle from './models/Vehicle';
import bcrypt from 'bcrypt';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/car-dealership';

const indianCars = [
  { make: 'Tata', model: 'Harrier', category: 'SUV', price: 2200000, quantity: 4 },
  { make: 'Tata', model: 'Nexon', category: 'Compact SUV', price: 1200000, quantity: 10 },
  { make: 'Mahindra', model: 'XUV700', category: 'SUV', price: 2500000, quantity: 3 },
  { make: 'Mahindra', model: 'Thar', category: 'Off-Road', price: 1600000, quantity: 5 },
  { make: 'Maruti Suzuki', model: 'Swift', category: 'Hatchback', price: 800000, quantity: 15 },
  { make: 'Maruti Suzuki', model: 'Baleno', category: 'Hatchback', price: 950000, quantity: 12 },
  { make: 'Hyundai', model: 'Creta', category: 'SUV', price: 1800000, quantity: 8 },
  { make: 'Kia', model: 'Seltos', category: 'SUV', price: 1750000, quantity: 7 },
];

async function seed() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB.');

    // 1. Seed Demo Accounts
    const adminEmail = 'admin@gmail.com';
    const customerEmail = 'customer@gmail.com';

    const adminExists = await User.findOne({ email: adminEmail });
    if (!adminExists) {
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

    const customerExists = await User.findOne({ email: customerEmail });
    if (!customerExists) {
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

    // 2. Seed Indian Cars
    for (const car of indianCars) {
      const existingCar = await Vehicle.findOne({ make: car.make, model: car.model });
      if (!existingCar) {
        await Vehicle.create(car);
        console.log(`Added car: ${car.make} ${car.model}`);
      } else {
        console.log(`Car already exists: ${car.make} ${car.model}`);
      }
    }

    console.log('\n✅ Seeding completely finished.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

seed();
