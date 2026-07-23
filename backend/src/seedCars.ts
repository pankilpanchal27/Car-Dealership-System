import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Vehicle from './models/Vehicle'; // Need to make sure this is exported correctly, earlier we saw it was `Vehicle.ts`

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

async function seedCars() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected.');

    for (const car of indianCars) {
      // Check if it exists so we don't duplicate
      const existing = await Vehicle.findOne({ make: car.make, model: car.model });
      if (!existing) {
        await Vehicle.create(car);
        console.log(`Added: ${car.make} ${car.model}`);
      } else {
        console.log(`Already exists: ${car.make} ${car.model}`);
      }
    }

    console.log('Indian cars seeding complete.');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
}

seedCars();
