import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product.js';
import Category from '../models/Category.js';

dotenv.config();

const clearProductsAndCategories = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce');
    console.log('✅ Connected to MongoDB');

    // Clear products and categories
    const productsDeleted = await Product.deleteMany({});
    const categoriesDeleted = await Category.deleteMany({});

    console.log(`✅ Deleted ${productsDeleted.deletedCount} products`);
    console.log(`✅ Deleted ${categoriesDeleted.deletedCount} categories`);
    console.log('\n🎉 Products and categories cleared successfully!');
    console.log('You can now add new products and categories through the admin dashboard.');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error clearing data:', error);
    process.exit(1);
  }
};

clearProductsAndCategories();

