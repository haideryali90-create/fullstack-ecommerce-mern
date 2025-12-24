// 📦 Categories
export const categories = [
  { label: "Phones", icon: "📱", to: "/category/phones" },
  { label: "Computers", icon: "💻", to: "/category/computers" },
  { label: "SmartWatch", icon: "⌚", to: "/category/wearables" },
  { label: "Camera", icon: "📷", to: "/category/camera" },
  { label: "Headphones", icon: "🎧", to: "/category/audio" },
  { label: "Gaming", icon: "🎮", to: "/category/gaming" },
];

// helper fn for unsplash images
const img = (q) =>
  `https://images.unsplash.com/${q}?q=80&w=900&auto=format&fit=crop`;

// ⚡ Flash Deals
export const flashDeals = [
  {
    id: 1,
    title: "Wireless Headphones",
    image:
      "https://xcessorieshub.com/wp-content/uploads/2023/06/JBL-Tune-720BT-price-in-pakistan-eezepc-1.jpg",
    price: 49.99,
    oldPrice: 79.99,
    description: "Experience high-quality sound with these wireless headphones. Featuring noise cancellation and long battery life, they're perfect for music lovers on the go.",
    rating: 5,
    discount: 40,
    reviews: 88,
    stock: 12,
  },
  {
    id: 2,
    title: "4K Action Camera",
    image:
      "https://djistore.pk/wp-content/uploads/2024/02/01d17afc-f2d9-4bac-adb7-81fc021aa0fd_removalai_preview.png",
    price: 129,
    oldPrice: 199,
    description: "Capture your adventures in stunning 4K resolution with this compact action camera. Waterproof and durable, it's designed for extreme sports enthusiasts.",
    rating: 5,
    discount: 35,
    reviews: 75,
    stock: 0,
  },
  {
    id: 3,
    title: "Bluetooth Speaker",
    image:
      "https://xcessorieshub.com/wp-content/uploads/2024/01/jbl_flipessential_side_001_x1.png",
    price: 39,
    oldPrice: 59,
    description: "Enjoy your favorite tunes anywhere with this portable Bluetooth speaker. It offers rich sound quality, a built-in microphone for calls, and a sleek design.",
    rating: 5,
    discount: 30,
    reviews: 99,
    stock: 7,
  },
  {
    id: 4,
    title: "Gaming Mouse",
    image:
      "https://globalcomputers.pk/wp-content/uploads/2021/06/logitech_g_pro_wireless_gaming_mouse1_-_tejar.jpg",
    price: 29,
    oldPrice: 49,
    description: "Enhance your gaming experience with this high-precision gaming mouse. Featuring customizable buttons and RGB lighting, it's built for performance and style.",
    rating: 5,
    discount: 25,
    reviews: 99,
    stock: 15,
  },
  {
    id: 5,
    title: "Smart Watch",
    image:
      "https://xcessorieshub.com/wp-content/uploads/2024/10/Apple-Watch-Ultra-2-Titanium-49MM-Black-Trail-Loop-scaled.webp",
    price: 89,
    oldPrice: 129,
    description: "Stay connected and track your fitness with this sleek smart watch. It features heart rate monitoring, GPS, and customizable watch faces to suit your style.",
    rating: 5,
    discount: 30,
    reviews: 120,
    stock: 5,
  },
  {
    id: 6,
    title: "Mechanical Keyboard",
    image:
      "https://static.webx.pk/files/821/Images/7793122-l-1024x1024-821-0-020923110902293.jpg",
    price: 69,
    oldPrice: 99,
    description: "Type with precision and comfort using this mechanical keyboard. It features tactile switches, customizable backlighting, and a durable design for long-lasting use.",
    rating: 4,
    discount: 30,
    reviews: 60,
    stock: 20,
  },
  {
    id: 7,
    title: "Portable SSD",
    image:
      "https://alhamdtech.pk/cdn/shop/files/sandisk-external-ssd-extreme-319180_2048x.png?v=1722252796",
    price: 79,
    oldPrice: 109,
    description: "Store and transfer your files quickly with this portable SSD. It offers fast read/write speeds, a compact design, and robust data protection features.",
    rating: 5,
    discount: 28,
    reviews: 45,
    stock: 10,
  },
  {
    id: 8,
    title: "Fitness Tracker",
    image:
      "https://i5.walmartimages.com/seo/Fitbit-Charge-5-Fitness-Tracker-Black-Graphite-Stainless-Steel_fe2ec232-431a-42d8-92b5-2b548d12d728.ac4090b6583f80fef99395be32294a92.jpeg",
    price: 39,
    oldPrice: 59,
    description: "Monitor your health and activity levels with this advanced fitness tracker. It features sleep tracking, heart rate monitoring, and a sleek, comfortable design.",
    rating: 4,
    discount: 34,
    reviews: 32,
    stock: 25,
  },
];

// 🏆 Best Selling
export const bestSelling = [
  {
    id: 9,
    title: "Mirrorless Camera",
    image:
      "https://www.nikon.com.pk/wp-content/uploads/2024/06/1-pslider-nikon-z6iii-mirrorless-camera-nikon-cameras-lenses-accessories.webp",
    price: 699,
    oldPrice: 799,
    description: "Capture stunning photos and videos with this high-performance mirrorless camera. Featuring a full-frame sensor, 4K video recording, and interchangeable lenses for creative flexibility.",
    rating: 4.7,
    reviews: 35,
    stock: 8,
  },
  {
    id: 10,
    title: "Ultrabook 14”",
    image: img("photo-1517336714731-489689fd1ca8"),
    price: 999,
    oldPrice: 1199,
    description: "Experience powerful performance in a sleek design with this ultrabook. It features a high-resolution display, long battery life, and fast processing speeds for productivity on the go.",
    rating: 4.6,
    reviews: 95,
    stock: 4,
  },
  {
    id: 11,
    title: "Pro Phone 128GB",
    image: img("photo-1511707171634-5f897ff02aa9"),
    price: 799,
    oldPrice: 899,
    description: "Stay connected with this feature-packed smartphone. It offers a stunning display, advanced camera system, and fast performance for all your mobile needs.",
    rating: 4.5,
    reviews: 62,
    stock: 0,
  },
  {
    id: 12,
    title: "Noise Canceling Headset",
    image:
      "https://static.webx.pk/files/821/Images/pro-x-821-648170-060621072210.jpg",
    price: 149,
    oldPrice: 179,
    description: "Immerse yourself in music with this noise-canceling headset. It features superior sound quality, comfortable ear cups, and a long-lasting battery for extended listening sessions.",
    rating: 4.8,
    reviews: 57,
    stock: 11,
  },
];

// 🔎 Explore Products
export const exploreProducts = [
  {
    id: 13,
    title: "Mechanical Keyboard",
    image:
      "https://static.webx.pk/files/821/Images/7793122-l-1024x1024-821-0-020923110902293.jpg",
    price: 119,
    description: "Type with precision and comfort using this mechanical keyboard. It features tactile switches, customizable backlighting, and a durable design for long-lasting use.",
    rating: 4.4,
    reviews: 40,
    stock: 14,
  },
  {
    id: 14,
    title: "Drone Quadcopter",
    image: "https://www.t-drones.com/images/202404/231713860948114704.jpg",
    price: 499,
    description: "Capture breathtaking aerial footage with this advanced drone quadcopter. It features a high-resolution camera, GPS navigation, and easy-to-use controls for both beginners and experienced pilots.",
    rating: 4.3,
    reviews: 22,
    stock: 6,
  },
  {
    id: 15,
    title: "Portable SSD 1TB",
    image:
      "https://alhamdtech.pk/cdn/shop/files/sandisk-external-ssd-extreme-319180_2048x.png?v=1722252796",
    price: 139,
    description: "Store and transfer your files quickly with this portable SSD. It offers fast read/write speeds, a compact design, and robust data protection features.",
    rating: 4.6,
    reviews: 18,
    stock: 9,
  },
  {
    id: 16,
    title: "Smart Home Speaker",
    image:
      "https://www.apple.com/newsroom/images/product/homepod/standard/Apple_homepod-mini-white-10132020.jpg.landing-big_2x.jpg",
    price: 89,
    description: "Control your smart home and enjoy high-quality sound with this smart home speaker. It features voice assistant integration, multi-room audio support, and a sleek design to complement any room.",
    rating: 4.2,
    reviews: 110,
    stock: 18,
  },
  {
    id: 17,
    title: "Gaming Controller",
    image:
      "https://www.venturegames.com.pk/cdn/shop/files/Playstation5DualSenseWirelessControllerWhite.png?v=1736346901",
    price: 59,
    description: "Enhance your gaming experience with this ergonomic gaming controller. It features responsive buttons, customizable controls, and wireless connectivity for freedom of movement.",
    rating: 4.4,
    reviews: 87,
    stock: 13,
  },
  {
    id: 18,
    title: "Action Cam Mount Kit",
    image:
      "https://www.sony.com/image/e628982853a9e6ad92cfb2ddda8a9bac?fmt=pjpeg&bgcolor=FFFFFF&bgc=FFFFFF&wid=2515&hei=1320",
    price: 29,
    description: "Get the perfect shot with this versatile action cam mount kit. It includes various mounts and accessories to securely attach your camera to helmets, bikes, and more for dynamic filming.",
    rating: 4.1,
    reviews: 74,
    stock: 30,
  },
  {
    id: 19,
    title: "Studio Microphone",
    image:
      "https://m1.com.pk/wp-content/uploads/2021/10/Behringer-TM1-Condenser-Microphone-Package.jpg",
    price: 159,
    description: "Record professional-quality audio with this studio microphone. It features a cardioid pickup pattern, low self-noise, and a sturdy build for reliable performance in any recording environment.",
    rating: 4.5,
    reviews: 69,
    stock: 7,
  },
  {
    id: 20,
    title: "Hoodie (Unisex)",
    image: "https://hangten.com.pk/cdn/shop/files/MH4750-1.jpg?v=1735039612",
    price: 49,
    description: "Stay warm and stylish with this comfortable unisex hoodie. Made from soft, durable fabric, it features a classic design with a front pocket and adjustable drawstring hood.",
    rating: 4.2,
    reviews: 260,
    stock: 50,  
  },
];

// 🆕 New Arrival
export const newArrival = {
  tall: {
    id: 21,
    title: "PlayStation 5",
    image:
      "https://blog.playstation.com/tachyon/2023/10/cd56722db7b991b3d7a33f1bafd55f80d0ac553d.png?resize=1088%2C612&crop_strategy=smart",
    price: 499,
    rating: 4.9,
  },
  smalls: [
    {
      id: 22,
      title: "Retro Camera",
      image:
        "https://cdn.mos.cms.futurecdn.net/NffZWoH4azLn4U2YHz7Kc9.jpg",
      price: 219,
      rating: 4.4,
    },
    {
      id: 23,
      title: "Fashion Handbag",
      image:
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=900&auto=format&fit=crop",
      price: 89,
      rating: 4.3,
    },
    {
      id: 24,
      title: "Smartwatch Series",
      image:
        "https://xcessorieshub.com/wp-content/uploads/2025/07/Oraimo-OSW-820-300x300.webp",
      price: 199,
      rating: 4.5,
    },
  ],
};
