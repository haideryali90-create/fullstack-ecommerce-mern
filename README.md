# MERN Stack Ecommerce Application

A full-stack ecommerce application built with React, Node.js, Express, and MongoDB. This project demonstrates a complete ecommerce solution with user authentication, product management, shopping cart, order processing, and an admin dashboard.

## Project Structure

```
ecommerce-app/
├── Frontend/              # React frontend application
│   ├── src/              # Source code
│   │   ├── components/   # React components
│   │   ├── context/      # Context providers (Auth, Cart, Wishlist)
│   │   ├── pages/        # Page components
│   │   ├── routes/       # Route configuration
│   │   ├── services/     # API services
│   │   └── ...
│   ├── public/           # Static assets
│   ├── package.json      # Frontend dependencies
│   └── ...
│
└── Backend/              # Node.js/Express backend API
    ├── config/           # Configuration files
    ├── controllers/      # Route controllers
    ├── middleware/       # Express middleware
    ├── models/          # Mongoose models
    ├── routes/          # API routes
    ├── scripts/         # Utility scripts
    ├── uploads/         # Uploaded files
    ├── server.js        # Entry point
    └── package.json     # Backend dependencies
```

## Features

- User authentication with JWT (access and refresh tokens)
- Product browsing with categories and search functionality
- Shopping cart and wishlist management
- Order processing and management
- Admin dashboard for product, category, and order management
- Fully responsive design for all devices
- Toast notifications for user feedback
- Role-based access control (User and Admin)

## Tech Stack

### Frontend
- React 19
- React Router DOM
- Tailwind CSS
- Axios for API calls
- React Toastify for notifications
- Context API for state management
- Lucide React for icons

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Multer for file uploads
- bcryptjs for password hashing
- Express Validator for input validation

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the Backend directory:
```bash
cd Backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the Backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_REFRESH_SECRET=your_super_secret_refresh_token_key_change_this_in_production
JWT_EXPIRE=7d
JWT_REFRESH_EXPIRE=30d
NODE_ENV=development
```

4. Start MongoDB (if running locally):
```bash
# On Windows
net start MongoDB

# On macOS/Linux
mongod
```

5. Seed the database (optional):
```bash
npm run seed
```

This will create:
- Admin user: `admin@example.com` / `admin123`
- Test user: `user@example.com` / `user123`
- Sample categories and products

6. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the Frontend directory:
```bash
cd Frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the Frontend directory:
```env
VITE_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173` (or another port if 5173 is busy)

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/refresh` - Refresh access token

### Products
- `GET /api/products` - Get all products (with pagination, search, filters)
- `GET /api/products/:id` - Get single product
- `GET /api/products/category/:slug` - Get products by category
- `GET /api/products/search?q=query` - Search products

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get single category

### Cart (Protected)
- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:itemId` - Update cart item quantity
- `DELETE /api/cart/:itemId` - Remove item from cart
- `DELETE /api/cart` - Clear cart

### Wishlist (Protected)
- `GET /api/wishlist` - Get user's wishlist
- `POST /api/wishlist` - Add product to wishlist
- `DELETE /api/wishlist/:productId` - Remove product from wishlist

### Orders (Protected)
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user's orders
- `GET /api/orders/:id` - Get single order

### Admin (Protected/Admin Only)
- `GET /api/admin/dashboard` - Get dashboard statistics
- `POST /api/admin/products` - Create product
- `PUT /api/admin/products/:id` - Update product
- `DELETE /api/admin/products/:id` - Delete product
- `POST /api/admin/categories` - Create category
- `PUT /api/admin/categories/:id` - Update category
- `DELETE /api/admin/categories/:id` - Delete category
- `GET /api/admin/orders` - Get all orders
- `PUT /api/admin/orders/:id` - Update order status

## Default Credentials

After running the seed script:

**Admin:**
- Email: `admin@example.com`
- Password: `admin123`

**User:**
- Email: `user@example.com`
- Password: `user123`

## Utility Scripts

### Password Reset

If you accidentally changed a user's password in MongoDB and can't login:

```bash
cd Backend
npm run reset-password [email] [newPassword]
```

Example:
```bash
npm run reset-password user@example.com user123
```

If no arguments are provided, it defaults to resetting `user@example.com` with password `user123`.

### Clear Products and Categories

To remove all products and categories from the database:

```bash
cd Backend
npm run clear-products
```

This will delete all products and categories, allowing you to add new ones through the admin dashboard.

### Seed Database

The seed script includes 30+ products across 6 categories with real product details and images:

- **Phones**: iPhone 15 Pro Max, Samsung Galaxy S24 Ultra, Google Pixel 8 Pro, OnePlus 12
- **Computers**: MacBook Pro, Dell XPS 15, ASUS ROG Zephyrus, HP Spectre, Lenovo ThinkPad
- **SmartWatch**: Apple Watch Ultra 2, Samsung Galaxy Watch 6, Garmin Fenix 7, Fitbit Charge 6
- **Camera**: Canon EOS R5, Sony A7 IV, Nikon Z6 III, DJI Mini 4 Pro
- **Headphones**: Sony WH-1000XM5, AirPods Pro 2, Bose QuietComfort, JBL Flip 6, Sennheiser Momentum 4
- **Gaming**: PlayStation 5, Xbox Series X, Nintendo Switch OLED, Steam Deck, Logitech G Pro, Razer BlackWidow

To seed the database:
```bash
cd Backend
npm run seed
```

**Note**: The seed script will:
- Create admin and user accounts (if they don't exist)
- Create all 6 categories
- Add 30+ products with details, images, and pricing
- Skip products that already exist (won't duplicate)

## Accessing Admin Dashboard

1. Login with admin credentials: `admin@example.com` / `admin123`
2. Click on your user icon in the navbar (top right)
3. Select "Admin Dashboard" from the dropdown menu
4. Or navigate directly to: `http://localhost:5173/admin`

## Design & Styling

- **Color Theme**: 
  - Primary Dark: `#777C6D`
  - Primary Light: `#B7B89F`
  - Secondary: `#CBCBCB`
  - Accent: `#EEEEEE`
- **Font**: Inter (with BBH Sans Bartle support)
- **Icons**: Lucide React
- **Responsive**: Mobile-first design with breakpoints for all devices

## Development

- Backend runs on port 5000
- Frontend runs on port 5173 (Vite default)
- MongoDB runs on port 27017 (default)

## Production Deployment

1. Set `NODE_ENV=production` in Backend `.env`
2. Update `VITE_API_URL` in Frontend `.env` to your production API URL
3. Build the frontend: `cd Frontend && npm run build`
4. Serve the frontend build folder and run the backend server

## Notes

- Both Frontend and Backend have their own `package.json` files
- Each directory should be run independently
- Make sure MongoDB is running before starting the backend
- The frontend expects the backend to be running on `http://localhost:5000` by default

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

Saad Mdev
