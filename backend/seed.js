import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './models/User.js';
import Appointment from './models/Appointment.js';

dotenv.config();

const seedData = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/appointment-system';
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB for seeding');

    // Clear existing data
    await Appointment.deleteMany({});
    await User.deleteMany({});
    console.log('Cleared existing users and appointments');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('Password123!', salt);

    // Create Doctors
    const doctor1 = await User.create({
      name: 'Dr. Sarah Jenkins',
      email: 'doctor@demo.com',
      password: hashedPassword,
      role: 'doctor',
      specialization: 'Cardiology',
      profilePicture: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&auto=format&fit=crop&q=80'
    });

    const doctor2 = await User.create({
      name: 'Dr. Michael Chen',
      email: 'chen@demo.com',
      password: hashedPassword,
      role: 'doctor',
      specialization: 'Neurology',
      profilePicture: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&auto=format&fit=crop&q=80'
    });

    const doctor3 = await User.create({
      name: 'Dr. Emily Rodriguez',
      email: 'emily@demo.com',
      password: hashedPassword,
      role: 'doctor',
      specialization: 'Pediatrics',
      profilePicture: 'https://images.unsplash.com/photo-1594824813511-28562d96c9c6?w=400&auto=format&fit=crop&q=80'
    });

    // Create Patient
    const patient1 = await User.create({
      name: 'John Doe',
      email: 'patient@demo.com',
      password: hashedPassword,
      role: 'patient',
      profilePicture: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80'
    });

    const patient2 = await User.create({
      name: 'Alice Smith',
      email: 'alice@demo.com',
      password: hashedPassword,
      role: 'patient',
      profilePicture: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80'
    });

    // Create Appointments
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(10, 0, 0, 0);

    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 5);
    nextWeek.setHours(14, 30, 0, 0);

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(11, 0, 0, 0);

    await Appointment.create([
      {
        doctor: doctor1._id,
        patient: patient1._id,
        date: tomorrow,
        turnNumber: 1,
        status: 'pending'
      },
      {
        doctor: doctor1._id,
        patient: patient2._id,
        date: tomorrow,
        turnNumber: 2,
        status: 'pending'
      },
      {
        doctor: doctor2._id,
        patient: patient1._id,
        date: nextWeek,
        turnNumber: 1,
        status: 'pending'
      },
      {
        doctor: doctor1._id,
        patient: patient1._id,
        date: yesterday,
        turnNumber: 1,
        status: 'completed'
      }
    ]);

    console.log('Seed data created successfully!');
    console.log('--- Demo Accounts ---');
    console.log('Doctor: doctor@demo.com / Password123!');
    console.log('Patient: patient@demo.com / Password123!');
    console.log('Doctor Secret Key for registration: doctor_secret_123');

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
};

seedData();
