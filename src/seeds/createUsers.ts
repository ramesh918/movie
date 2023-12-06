import UserModel from '../models/User'; // Import your user model
import connectToDatabase from "../db";
import mongoose from "mongoose";
import bcrypt from 'bcrypt';

connectToDatabase(
  () => {
    console.log("dbConnection Successful");
    // Call function to seed users after successful database connection
    createUsers();
  },
  (error) => {
    console.error("Unable to connect to database", error);
  }
);

const createUsers = async () => {
  try {
    // Check if any user exists with the provided email
    const adminExistingUser = await UserModel.findOne({ email: 'admin@example.com' });
    const regularExistingUser = await UserModel.findOne({ email: 'user@example.com' });

    // If no user exists, proceed to create
    if (!adminExistingUser && !regularExistingUser) {
      // Hash passwords before saving
      const hashedAdminPassword = await bcrypt.hash('Admin@123@Password', 10);
      const hashedRegularPassword = await bcrypt.hash('User@123@Password', 10);

      // Create users with hashed passwords
      const adminUser = {
        password: hashedAdminPassword,
        role: 'admin',
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@example.com'
      };
      const regularUser = {
        password: hashedRegularPassword,
        role: 'user',
        firstName: 'Regular',
        lastName: 'User',
        email: 'user@example.com'
      };

      // Save users
      await UserModel.create(adminUser);
      await UserModel.create(regularUser);
      console.log('Users seeded successfully.');
    } else {
      console.log('Users already exist.');
    }

    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding users:', error);
  }
};