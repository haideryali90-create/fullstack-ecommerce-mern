# Backend - Ecommerce API

Node.js/Express backend API for the MERN Stack Ecommerce platform.

## 🚀 Quick Start

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_REFRESH_SECRET=your_super_secret_refresh_token_key_change_this_in_production
JWT_EXPIRE=7d
JWT_REFRESH_EXPIRE=30d
NODE_ENV=development
```

3. Start MongoDB (if running locally)

4. Seed the database (optional):
```bash
npm run seed
```

5. Start the server:
```bash
npm run dev
```

## 📁 Project Structure

```
Backend/
├── config/              # Configuration files (database, etc.)
├── controllers/         # Route controllers (business logic)
├── middleware/          # Express middleware (auth, upload)
├── models/             # Mongoose models (database schemas)
├── routes/             # API route definitions
├── scripts/            # Utility scripts (seed, reset password)
├── uploads/            # Uploaded files directory
├── server.js           # Entry point
└── package.json        # Dependencies
```

## 🛠️ Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run seed` - Seed database with sample data
- `npm run reset-password` - Reset user password
- `npm run clear-products` - Clear all products and categories

## 📡 API Documentation

See the main README.md in the root directory for complete API endpoint documentation.

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication:
- Access tokens (short-lived)
- Refresh tokens (long-lived)
- Protected routes require valid JWT token

## 📦 Dependencies

- Express.js
- Mongoose (MongoDB ODM)
- JWT (jsonwebtoken)
- bcryptjs (password hashing)
- Multer (file uploads)
- CORS
- Express Validator

