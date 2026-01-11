# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Start MongoDB
```bash
mongod
# Or use MongoDB Atlas - update MONGO_URI in backend/.env
```

### Step 2: Setup Backend
```bash
cd backend
npm install
npm run seed     # Load sample data
npm start        # Server runs on http://localhost:5000
```

### Step 3: Setup Frontend
```bash
cd frontend
npm install react-router-dom
npm start        # App opens at http://localhost:3000
```

## ✅ Test the Application

### Login as Admin
- Email: `admin@example.com`
- Password: `admin123`
- Access: http://localhost:3000/admin

### Login as User
- Email: `john@example.com`
- Password: `user123`

## 🎯 Quick Features Test

1. **Browse Products** - Visit home page
2. **Search** - Use search bar to find "Wireless"
3. **Filter** - Filter by Electronics category
4. **View Details** - Click any product
5. **Add Review** - After login, add a review
6. **Add to Cart** - Add products to cart
7. **Checkout** - Complete purchase
8. **View Orders** - Check order history
9. **Admin Panel** - Add new products

## 📊 API Testing with Postman

### Get All Products
```
GET http://localhost:5000/api/products
```

### Register
```
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "Test User",
  "email": "test@example.com",
  "password": "test123",
  "confirmPassword": "test123"
}
```

### Login
```
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "admin123"
}
```

### Add Product (Admin only)
```
POST http://localhost:5000/api/products
Authorization: Bearer <token_from_login>
Content-Type: application/json

{
  "name": "New Product",
  "description": "Product description",
  "price": 999,
  "category": "Electronics",
  "brand": "Brand Name",
  "stock": 50
}
```

## 🔧 Troubleshooting

| Issue | Solution |
|-------|----------|
| MongoDB connection error | Ensure MongoDB is running or check Atlas connection |
| CORS error | Verify backend is running on port 5000 |
| Port already in use | Change PORT in .env or stop the service using it |
| Cannot login | Check MONGO_URI and ensure seed data is loaded |
| Products not showing | Run `npm run seed` to load sample data |

## 📝 Key Files

- Backend: `backend/server.js` - Main server file
- Frontend: `frontend/src/App.js` - Main app file
- Seed Data: `backend/seed.js` - Sample database
- API: `frontend/src/services/api.js` - API configuration

## 🎓 Learning Resources

- [MERN Stack Tutorial](https://www.mongodb.com/developer/how-to/MERN-stack-explained/)
- [React Router Docs](https://reactrouter.com/)
- [Express.js Docs](https://expressjs.com/)
- [MongoDB Docs](https://docs.mongodb.com/)

Enjoy building! 🎉
