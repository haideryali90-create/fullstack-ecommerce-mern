import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Category from '../models/Category.js';
import Product from '../models/Product.js';
import dns from "node:dns";

dns.setServers(["8.8.8.8", "1.1.1.1"]);
dotenv.config();

const categoriesData = [
  { name: 'Phones', icon: '📱', slug: 'phones', description: 'Latest smartphones and mobile devices' },
  { name: 'Computers', icon: '💻', slug: 'computers', description: 'Laptops, desktops, and computer accessories' },
  { name: 'SmartWatch', icon: '⌚', slug: 'wearables', description: 'Smartwatches and fitness trackers' },
  { name: 'Camera', icon: '📷', slug: 'camera', description: 'Cameras and photography equipment' },
  { name: 'Headphones', icon: '🎧', slug: 'audio', description: 'Headphones, speakers, and audio equipment' },
  { name: 'Gaming', icon: '🎮', slug: 'gaming', description: 'Gaming consoles, controllers, and accessories' },
];

const productsData = [
  // Phones Category
  {
    name: 'iPhone 15 Pro Max',
    description: 'The most advanced iPhone ever with A17 Pro chip, titanium design, and Pro camera system. Features 6.7-inch Super Retina XDR display, 48MP main camera, and all-day battery life.',
    price: 1199,
    oldPrice: 1299,
    discount: 8,
    stock: 15,
    rating: 4.8,
    reviews: 324,
    brand: 'Apple',
    features: ['A17 Pro Chip', '48MP Camera System', 'Titanium Design', 'Action Button', 'USB-C'],
    colors: ['#1C1C1E', '#F5F5F7', '#E8E8ED'],
    images: ['https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&h=800&fit=crop'],
  },
  {
    name: 'Samsung Galaxy S24 Ultra',
    description: 'Premium Android flagship with S Pen, 200MP camera, and Snapdragon 8 Gen 3. Features 6.8-inch Dynamic AMOLED display, 12GB RAM, and advanced AI capabilities.',
    price: 1099,
    oldPrice: 1199,
    discount: 8,
    stock: 12,
    rating: 4.7,
    reviews: 289,
    brand: 'Samsung',
    features: ['S Pen Included', '200MP Camera', 'Snapdragon 8 Gen 3', 'AI Features', '5G'],
    colors: ['#1C1C1E', '#F5F5F7', '#FF6B6B'],
    images: ['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=800&fit=crop'],
  },
  {
    name: 'Google Pixel 8 Pro',
    description: 'Google\'s flagship phone with Tensor G3 chip, exceptional camera system, and pure Android experience. Features 6.7-inch LTPO OLED display and advanced computational photography.',
    price: 899,
    oldPrice: 999,
    discount: 10,
    stock: 18,
    rating: 4.6,
    reviews: 156,
    brand: 'Google',
    features: ['Tensor G3 Chip', '50MP Camera', 'Magic Eraser', '7 Years Updates', 'Wireless Charging'],
    colors: ['#1C1C1E', '#F5F5F7', '#4285F4'],
    images: ['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=800&fit=crop'],
  },
  {
    name: 'OnePlus 12',
    description: 'Flagship killer with Snapdragon 8 Gen 3, 100W fast charging, and Hasselblad camera. Features 6.82-inch LTPO display and premium design.',
    price: 799,
    oldPrice: 899,
    discount: 11,
    stock: 20,
    rating: 4.5,
    reviews: 142,
    brand: 'OnePlus',
    features: ['Snapdragon 8 Gen 3', '100W Charging', 'Hasselblad Camera', 'OxygenOS', 'Premium Design'],
    colors: ['#1C1C1E', '#F5F5F7', '#FF5722'],
    images: ['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=800&fit=crop'],
  },

  // Computers Category
  {
    name: 'MacBook Pro 16" M3 Max',
    description: 'Powerful laptop with M3 Max chip, 16-inch Liquid Retina XDR display, and up to 22 hours battery life. Perfect for professionals and creators.',
    price: 3499,
    oldPrice: 3999,
    discount: 13,
    stock: 8,
    rating: 4.9,
    reviews: 89,
    brand: 'Apple',
    features: ['M3 Max Chip', '16-inch Display', '22h Battery', '18-core GPU', 'Up to 128GB RAM'],
    colors: ['#1C1C1E', '#F5F5F7'],
    images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=800&fit=crop'],
  },
  {
    name: 'Dell XPS 15',
    description: 'Premium Windows laptop with Intel Core i9, NVIDIA RTX graphics, and 15.6-inch OLED display. Ideal for productivity and creative work.',
    price: 1999,
    oldPrice: 2299,
    discount: 13,
    stock: 10,
    rating: 4.7,
    reviews: 234,
    brand: 'Dell',
    features: ['Intel Core i9', 'NVIDIA RTX 4060', '15.6" OLED', '32GB RAM', '1TB SSD'],
    colors: ['#1C1C1E', '#F5F5F7'],
    images: ['https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=800&fit=crop'],
  },
  {
    name: 'ASUS ROG Zephyrus G16',
    description: 'Gaming laptop with Intel Core i9, NVIDIA RTX 4090, and 16-inch Nebula Display. Built for high-performance gaming and content creation.',
    price: 2499,
    oldPrice: 2799,
    discount: 11,
    stock: 6,
    rating: 4.8,
    reviews: 167,
    brand: 'ASUS',
    features: ['Intel Core i9', 'RTX 4090', '16" Display', '32GB RAM', '2TB SSD'],
    colors: ['#1C1C1E'],
    images: ['https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=800&fit=crop'],
  },
  {
    name: 'HP Spectre x360',
    description: 'Convertible 2-in-1 laptop with Intel Core i7, 13.5-inch OLED touchscreen, and premium design. Perfect for work and entertainment.',
    price: 1499,
    oldPrice: 1699,
    discount: 12,
    stock: 14,
    rating: 4.6,
    reviews: 198,
    brand: 'HP',
    features: ['2-in-1 Design', '13.5" OLED', 'Intel Core i7', '16GB RAM', '512GB SSD'],
    colors: ['#1C1C1E', '#F5F5F7'],
    images: ['https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=800&fit=crop'],
  },
  {
    name: 'Lenovo ThinkPad X1 Carbon',
    description: 'Business laptop with Intel Core i7, 14-inch display, and legendary ThinkPad durability. Built for professionals on the go.',
    price: 1699,
    oldPrice: 1899,
    discount: 11,
    stock: 12,
    rating: 4.7,
    reviews: 145,
    brand: 'Lenovo',
    features: ['ThinkPad Durability', '14" Display', 'Intel Core i7', '32GB RAM', '1TB SSD'],
    colors: ['#1C1C1E'],
    images: ['https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=800&fit=crop'],
  },

  // SmartWatch Category
  {
    name: 'Apple Watch Ultra 2',
    description: 'The most rugged and capable Apple Watch with titanium case, Action Button, and advanced fitness tracking. Perfect for athletes and adventurers.',
    price: 799,
    oldPrice: 899,
    discount: 11,
    stock: 20,
    rating: 4.8,
    reviews: 456,
    brand: 'Apple',
    features: ['Titanium Case', 'Action Button', 'Dual-Frequency GPS', '100m Water Resistant', '49mm Display'],
    colors: ['#1C1C1E', '#F5F5F7'],
    images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop'],
  },
  {
    name: 'Samsung Galaxy Watch 6 Classic',
    description: 'Premium smartwatch with rotating bezel, advanced health monitoring, and long battery life. Features 47mm display and comprehensive fitness tracking.',
    price: 399,
    oldPrice: 449,
    discount: 11,
    stock: 25,
    rating: 4.6,
    reviews: 312,
    brand: 'Samsung',
    features: ['Rotating Bezel', '47mm Display', 'Health Monitoring', '5ATM Water Resistant', 'Wear OS'],
    colors: ['#1C1C1E', '#F5F5F7'],
    images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop'],
  },
  {
    name: 'Garmin Fenix 7 Pro',
    description: 'Premium multisport GPS watch with advanced training metrics, maps, and solar charging. Built for serious athletes and outdoor enthusiasts.',
    price: 799,
    oldPrice: 899,
    discount: 11,
    stock: 15,
    rating: 4.9,
    reviews: 234,
    brand: 'Garmin',
    features: ['Solar Charging', 'Advanced Metrics', 'Topo Maps', '100m Water Resistant', '51mm Display'],
    colors: ['#1C1C1E', '#F5F5F7'],
    images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop'],
  },
  {
    name: 'Fitbit Charge 6',
    description: 'Advanced fitness tracker with Google apps, built-in GPS, and 6+ day battery life. Track your health and stay connected on the go.',
    price: 159,
    oldPrice: 199,
    discount: 20,
    stock: 30,
    rating: 4.4,
    reviews: 567,
    brand: 'Fitbit',
    features: ['Built-in GPS', 'Google Apps', '6+ Day Battery', 'Health Metrics', 'Water Resistant'],
    colors: ['#1C1C1E', '#F5F5F7', '#FF6B6B'],
    images: ['https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&h=800&fit=crop'],
  },

  // Camera Category
  {
    name: 'Canon EOS R5',
    description: 'Professional mirrorless camera with 45MP full-frame sensor, 8K video recording, and advanced autofocus. Perfect for professional photographers.',
    price: 3899,
    oldPrice: 4299,
    discount: 9,
    stock: 5,
    rating: 4.9,
    reviews: 123,
    brand: 'Canon',
    features: ['45MP Full-Frame', '8K Video', 'Advanced AF', 'IBIS', 'Dual Card Slots'],
    colors: ['#1C1C1E'],
    images: ['https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=800&h=800&fit=crop'],
  },
  {
    name: 'Sony A7 IV',
    description: 'Full-frame mirrorless camera with 33MP sensor, 4K 60p video, and real-time tracking. Ideal for photographers and videographers.',
    price: 2499,
    oldPrice: 2799,
    discount: 11,
    stock: 8,
    rating: 4.8,
    reviews: 289,
    brand: 'Sony',
    features: ['33MP Full-Frame', '4K 60p Video', 'Real-Time Tracking', 'IBIS', '10fps Shooting'],
    colors: ['#1C1C1E'],
    images: ['https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=800&h=800&fit=crop'],
  },
  {
    name: 'Nikon Z6 III',
    description: 'Professional mirrorless camera with 24.5MP sensor, 6K video, and advanced autofocus system. Perfect for creative professionals.',
    price: 1999,
    oldPrice: 2299,
    discount: 13,
    stock: 10,
    rating: 4.7,
    reviews: 156,
    brand: 'Nikon',
    features: ['24.5MP Sensor', '6K Video', 'Advanced AF', 'IBIS', '20fps Shooting'],
    colors: ['#1C1C1E'],
    images: ['https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=800&h=800&fit=crop'],
  },
  {
    name: 'DJI Mini 4 Pro',
    description: 'Compact drone with 4K HDR video, omnidirectional obstacle sensing, and 34-minute flight time. Perfect for aerial photography and videography.',
    price: 759,
    oldPrice: 899,
    discount: 16,
    stock: 18,
    rating: 4.8,
    reviews: 412,
    brand: 'DJI',
    features: ['4K HDR Video', 'Omnidirectional Sensing', '34min Flight', 'ActiveTrack 360', 'Compact Design'],
    colors: ['#1C1C1E', '#F5F5F7'],
    images: ['https://images.unsplash.com/photo-1473968512647-3f17f1c0d0e6?w=800&h=800&fit=crop'],
  },

  // Headphones Category
  {
    name: 'Sony WH-1000XM5',
    description: 'Premium noise-canceling headphones with industry-leading ANC, 30-hour battery, and exceptional sound quality. Perfect for travel and music lovers.',
    price: 399,
    oldPrice: 449,
    discount: 11,
    stock: 25,
    rating: 4.8,
    reviews: 1234,
    brand: 'Sony',
    features: ['Industry-Leading ANC', '30h Battery', 'LDAC Support', 'Quick Attention', 'Comfortable Design'],
    colors: ['#1C1C1E', '#F5F5F7'],
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop'],
  },
  {
    name: 'Apple AirPods Pro 2',
    description: 'Premium wireless earbuds with Active Noise Cancellation, Spatial Audio, and MagSafe charging case. Features H2 chip for superior sound.',
    price: 249,
    oldPrice: 279,
    discount: 11,
    stock: 35,
    rating: 4.7,
    reviews: 2345,
    brand: 'Apple',
    features: ['Active Noise Cancellation', 'Spatial Audio', 'H2 Chip', 'MagSafe Charging', '6h Battery'],
    colors: ['#1C1C1E'],
    images: ['https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=800&h=800&fit=crop'],
  },
  {
    name: 'Bose QuietComfort Ultra',
    description: 'Premium noise-canceling headphones with Immersive Audio, 24-hour battery, and comfortable design. Experience music like never before.',
    price: 429,
    oldPrice: 479,
    discount: 10,
    stock: 20,
    rating: 4.6,
    reviews: 678,
    brand: 'Bose',
    features: ['Immersive Audio', '24h Battery', 'Comfortable Design', 'Touch Controls', 'Quick Pair'],
    colors: ['#1C1C1E', '#F5F5F7'],
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop'],
  },
  {
    name: 'JBL Flip 6',
    description: 'Portable Bluetooth speaker with powerful sound, IP67 waterproof rating, and 12-hour battery. Perfect for outdoor adventures and parties.',
    price: 129,
    oldPrice: 149,
    discount: 13,
    stock: 40,
    rating: 4.5,
    reviews: 890,
    brand: 'JBL',
    features: ['Powerful Sound', 'IP67 Waterproof', '12h Battery', 'PartyBoost', 'Compact Design'],
    colors: ['#1C1C1E', '#F5F5F7', '#FF6B6B', '#4285F4'],
    images: ['https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&h=800&fit=crop'],
  },
  {
    name: 'Sennheiser Momentum 4',
    description: 'Premium wireless headphones with exceptional sound quality, 60-hour battery, and adaptive noise cancellation. For true audiophiles.',
    price: 349,
    oldPrice: 399,
    discount: 13,
    stock: 18,
    rating: 4.7,
    reviews: 456,
    brand: 'Sennheiser',
    features: ['Exceptional Sound', '60h Battery', 'Adaptive ANC', 'Smart Pause', 'Premium Design'],
    colors: ['#1C1C1E', '#F5F5F7'],
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop'],
  },

  // Gaming Category
  {
    name: 'PlayStation 5',
    description: 'Next-generation gaming console with ultra-high-speed SSD, ray tracing, and 4K gaming. Includes DualSense wireless controller.',
    price: 499,
    oldPrice: 599,
    discount: 17,
    stock: 15,
    rating: 4.9,
    reviews: 2345,
    brand: 'Sony',
    features: ['Ultra-High-Speed SSD', 'Ray Tracing', '4K Gaming', 'DualSense Controller', 'Backward Compatible'],
    colors: ['#1C1C1E', '#F5F5F7'],
    images: ['https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800&h=800&fit=crop'],
  },
  {
    name: 'Xbox Series X',
    description: 'Most powerful Xbox console with 12 TFLOPs GPU, 4K gaming, and backward compatibility. Experience next-gen gaming at its finest.',
    price: 499,
    oldPrice: 599,
    discount: 17,
    stock: 12,
    rating: 4.8,
    reviews: 1890,
    brand: 'Microsoft',
    features: ['12 TFLOPs GPU', '4K Gaming', 'Backward Compatible', 'Quick Resume', 'Xbox Game Pass'],
    colors: ['#1C1C1E'],
    images: ['https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800&h=800&fit=crop'],
  },
  {
    name: 'Nintendo Switch OLED',
    description: 'Enhanced Nintendo Switch with 7-inch OLED screen, improved audio, and 64GB storage. Play at home or on the go.',
    price: 349,
    oldPrice: 399,
    discount: 13,
    stock: 25,
    rating: 4.7,
    reviews: 3456,
    brand: 'Nintendo',
    features: ['7" OLED Screen', '64GB Storage', 'Improved Audio', 'Wide Adjustable Stand', 'Dock with LAN'],
    colors: ['#1C1C1E', '#F5F5F7', '#FF6B6B'],
    images: ['https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800&h=800&fit=crop'],
  },
  {
    name: 'Steam Deck OLED',
    description: 'Handheld gaming PC with 7.4-inch OLED display, improved battery life, and access to thousands of Steam games.',
    price: 549,
    oldPrice: 649,
    discount: 15,
    stock: 10,
    rating: 4.6,
    reviews: 567,
    brand: 'Valve',
    features: ['7.4" OLED Display', 'Improved Battery', 'Steam Library', 'Custom AMD APU', 'Portable PC Gaming'],
    colors: ['#1C1C1E'],
    images: ['https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800&h=800&fit=crop'],
  },
  {
    name: 'Logitech G Pro X Superlight 2',
    description: 'Ultra-lightweight gaming mouse with HERO 2 sensor, 32K DPI, and 95-hour battery. Used by professional esports players.',
    price: 159,
    oldPrice: 179,
    discount: 11,
    stock: 30,
    rating: 4.8,
    reviews: 1234,
    brand: 'Logitech',
    features: ['63g Weight', 'HERO 2 Sensor', '32K DPI', '95h Battery', 'Lightspeed Wireless'],
    colors: ['#1C1C1E', '#F5F5F7', '#FF6B6B'],
    images: ['https://images.unsplash.com/photo-1527814050087-3793815479db?w=800&h=800&fit=crop'],
  },
  {
    name: 'Razer BlackWidow V4 Pro',
    description: 'Premium mechanical gaming keyboard with Razer Green switches, per-key RGB, and command dial. Built for competitive gaming.',
    price: 229,
    oldPrice: 279,
    discount: 18,
    stock: 22,
    rating: 4.7,
    reviews: 890,
    brand: 'Razer',
    features: ['Razer Green Switches', 'Per-Key RGB', 'Command Dial', 'Wrist Rest', 'USB Passthrough'],
    colors: ['#1C1C1E'],
    images: ['https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&h=800&fit=crop'],
  },
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce');
    console.log('✅ Connected to MongoDB');

    // Clear existing data (optional - comment out if you want to keep existing data)
    // await User.deleteMany({});
    // await Category.deleteMany({});
    // await Product.deleteMany({});
    // console.log('✅ Cleared existing data');

    // Check if admin user exists, if not create it
    let admin = await User.findOne({ email: 'admin@example.com' });
    if (!admin) {
      admin = await User.create({
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'admin123',
        role: 'admin',
      });
      console.log('✅ Created admin user');
    } else {
      console.log('✅ Admin user already exists');
    }

    // Check if test user exists, if not create it
    let user = await User.findOne({ email: 'user@example.com' });
    if (!user) {
      user = await User.create({
        name: 'Test User',
        email: 'user@example.com',
        password: 'user123',
        role: 'user',
      });
      console.log('✅ Created test user');
    } else {
      console.log('✅ Test user already exists');
    }

    // Create or update categories
    const categories = [];
    for (const catData of categoriesData) {
      let category = await Category.findOne({ slug: catData.slug });
      if (!category) {
        category = await Category.create(catData);
        console.log(`✅ Created category: ${category.name}`);
      } else {
        console.log(`✅ Category already exists: ${category.name}`);
      }
      categories.push(category);
    }

    // Create category map
    const categoryMap = {
      'Phones': categories.find(c => c.name === 'Phones'),
      'Computers': categories.find(c => c.name === 'Computers'),
      'SmartWatch': categories.find(c => c.name === 'SmartWatch'),
      'Camera': categories.find(c => c.name === 'Camera'),
      'Headphones': categories.find(c => c.name === 'Headphones'),
      'Gaming': categories.find(c => c.name === 'Gaming'),
    };

    // Create products with categories
    let productsCreated = 0;
    let productsSkipped = 0;

    for (const productData of productsData) {
      // Determine category based on product name or index
      let category;
      if (productData.name.includes('iPhone') || productData.name.includes('Galaxy') || productData.name.includes('Pixel') || productData.name.includes('OnePlus')) {
        category = categoryMap['Phones'];
      } else if (productData.name.includes('MacBook') || productData.name.includes('XPS') || productData.name.includes('ROG') || productData.name.includes('Spectre') || productData.name.includes('ThinkPad')) {
        category = categoryMap['Computers'];
      } else if (productData.name.includes('Watch') || productData.name.includes('Fenix') || productData.name.includes('Charge')) {
        category = categoryMap['SmartWatch'];
      } else if (productData.name.includes('EOS') || productData.name.includes('A7') || productData.name.includes('Z6') || productData.name.includes('DJI')) {
        category = categoryMap['Camera'];
      } else if (productData.name.includes('AirPods') || productData.name.includes('WH-') || productData.name.includes('QuietComfort') || productData.name.includes('JBL') || productData.name.includes('Momentum')) {
        category = categoryMap['Headphones'];
      } else {
        category = categoryMap['Gaming'];
      }

      // Check if product already exists
      const existingProduct = await Product.findOne({ name: productData.name });
      if (!existingProduct) {
        await Product.create({
          ...productData,
          category: category._id,
        });
        productsCreated++;
        console.log(`✅ Created product: ${productData.name}`);
      } else {
        // Update existing product with new image
        existingProduct.images = productData.images;
        await existingProduct.save();
        productsSkipped++;
        console.log(`🔄 Updated product image: ${productData.name}`);
      }
    }

    console.log(`\n🎉 Database seeding completed!`);
    console.log(`✅ Created ${productsCreated} new products`);
    console.log(`🔄 Updated ${productsSkipped} existing products`);
    console.log('\nAdmin credentials:');
    console.log('Email: admin@example.com');
    console.log('Password: admin123');
    console.log('\nUser credentials:');
    console.log('Email: user@example.com');
    console.log('Password: user123');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
