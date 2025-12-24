# Frontend - Ecommerce Application

React-based frontend application for the MERN Stack Ecommerce platform.

## 🚀 Quick Start

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```env
VITE_API_URL=http://localhost:5000/api
```

3. Start development server:
```bash
npm run dev
```

## 📁 Project Structure

```
Frontend/
├── src/
│   ├── components/      # Reusable React components
│   ├── context/         # Context providers (Auth, Cart, Wishlist)
│   ├── pages/           # Page components
│   ├── routes/          # Route configuration
│   ├── services/        # API service layer
│   ├── assets/          # Static assets (images, etc.)
│   ├── App.jsx          # Root component
│   └── main.jsx         # Entry point
├── public/              # Public static files
├── package.json         # Dependencies
└── vite.config.js       # Vite configuration
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Styling

- **Framework**: Tailwind CSS
- **Icons**: Lucide React
- **Theme Colors**: Custom color palette defined in `tailwind.config.js`

## 📦 Dependencies

- React 19
- React Router DOM
- Axios
- React Toastify
- Tailwind CSS
- Lucide React

