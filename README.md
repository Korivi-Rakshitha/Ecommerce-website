# Amazon-Like MERN E-Commerce Application

A fully functional, production-ready e-commerce platform built with the MERN stack (MongoDB, Express.js, React.js, Node.js) featuring user authentication, product management, shopping cart, order processing, and admin dashboard.

## 🎯 Features

### ✅ Core Features Implemented

#### Authentication & Authorization
- JWT-based authentication
- User registration and login
- Password hashing with bcrypt
- User roles (USER, ADMIN)
- Protected routes and API endpoints
- User profile management

#### Product Management
- Browse products with grid layout
- Search products by name
- Filter by category and price range
- Sort by price, rating, and newest
- Product details with reviews and ratings
- Rating system with customer reviews
- In-stock management

#### Shopping Cart
- Add/remove items from cart
- Update quantity
- Persistent cart per user
- Real-time cart calculations
- Tax calculation (18% GST)

#### Orders & Checkout
- Place orders from cart
- Multiple payment methods (COD, Credit Card, Debit Card, UPI)
- Order history
- Order tracking
- Order status updates
- Order cancellation

#### Admin Dashboard
- Add new products
- Edit/delete products
- View all orders
- Update order status
- View customers
- Manage inventory

#### UI/UX
- Amazon-style header with search
- Responsive design (mobile & desktop)
- Professional color scheme
- Product cards with images and ratings
- Cart summary
- Order tracking page

## 📁 Project Structure

```
mern_ecommerce/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Cart.js
│   │   └── Order.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   ├── cartRoutes.js
│   │   └── orderRoutes.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── cartController.js
│   │   └── orderController.js
│   ├── middlewares/
│   │   ├── authMiddleware.js
│   │   └── errorHandler.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── Header.js
    │   │   ├── Footer.js
    │   │   └── ProductCard.js
    │   ├── pages/
    │   │   ├── Home.js
    │   │   ├── ProductDetails.js
    │   │   ├── Cart.js
    │   │   ├── Login.js
    │   │   ├── Register.js
    │   │   ├── Checkout.js
    │   │   ├── Orders.js
    │   │   └── AdminDashboard.js
    │   ├── context/
    │   │   ├── AuthContext.js
    │   │   └── CartContext.js
    │   ├── services/
    │   │   └── api.js
    │   ├── styles/
    │   │   ├── App.css
    │   │   ├── Header.css
    │   │   ├── Footer.css
    │   │   ├── ProductCard.css
    │   │   ├── Home.css
    │   │   ├── ProductDetails.css
    │   │   ├── Cart.css
    │   │   ├── Auth.css
    │   │   ├── Checkout.css
    │   │   ├── Orders.css
    │   │   └── AdminDashboard.css
    │   ├── App.js
    │   ├── index.js
    │   └── index.css
    └── package.json
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create .env file:**
   ```
   MONGO_URI=mongodb://localhost:27017/mern_ecommerce
   JWT_SECRET=your_secret_key_here
   PORT=5000
   NODE_ENV=development
   ```

4. **Start MongoDB:**
   ```bash
   # Using MongoDB locally
   mongod
   
   # Or use MongoDB Atlas connection string in .env
   ```

5. **Run the backend:**
   ```bash
   npm start
   # Server will run on http://localhost:5000
   ```

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the React app:**
   ```bash
   npm start
   # App will open at http://localhost:3000
   ```

## 🧪 Testing the Application

### Create Sample Data

1. **Create Admin User (via Postman or API):**
   ```
   POST /api/auth/register
   {
     "name": "Admin User",
     "email": "admin@example.com",
     "password": "admin123",
     "confirmPassword": "admin123"
   }
   ```

2. **Add Products (via Admin Dashboard or API):**
   ```
   POST /api/products
   Authorization: Bearer <TOKEN>
   {
     "name": "Wireless Earbuds",
     "description": "Premium noise-cancelling earbuds",
     "price": 4999,
     "originalPrice": 6999,
     "category": "Electronics",
     "brand": "Sony",
     "stock": 50,
     "images": ["https://via.placeholder.com/500"]
   }
   ```

### User Testing Flow

1. **Register** - Create a new user account
2. **Browse** - View products on home page
3. **Search & Filter** - Use search and filters
4. **View Details** - Click on a product to see details
5. **Add to Cart** - Add products to cart
6. **Checkout** - Complete the order
7. **View Orders** - See order history

### Admin Testing Flow

1. **Login as Admin** - Use admin credentials
2. **Access Dashboard** - Go to /admin
3. **Manage Products** - Add/edit/delete products
4. **View Orders** - See all customer orders
5. **Update Status** - Change order status

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update profile

### Products
- `GET /api/products` - Get all products with filters
- `GET /api/products/categories` - Get all categories
- `GET /api/products/:id` - Get product details
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)
- `POST /api/products/:id/reviews` - Add review

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart/add` - Add to cart
- `DELETE /api/cart/remove/:productId` - Remove from cart
- `PUT /api/cart/update` - Update quantity
- `DELETE /api/cart/clear` - Clear cart

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders/user/my-orders` - Get user's orders
- `GET /api/orders/:id` - Get order details
- `GET /api/orders` - Get all orders (Admin)
- `PUT /api/orders/:id/status` - Update order (Admin)
- `PUT /api/orders/:id/cancel` - Cancel order

## 🔐 Security Features

✅ Password hashing with bcrypt
✅ JWT token-based authentication
✅ Protected routes with middleware
✅ Admin role verification
✅ Input validation
✅ CORS enabled
✅ Environment variables for secrets
✅ MongoDB indexing for performance

## 🎨 UI Components

### Header
- Logo and branding
- Search bar
- User menu (Login/Register or User name)
- Cart icon with item count
- Navigation links

### Product Cards
- Product image
- Name and brand
- Rating display
- Price with discount
- Stock status
- Click to view details

### Cart Summary
- Subtotal calculation
- Tax calculation (18%)
- Total price
- Checkout button

### Order Tracking
- Order ID and date
- Order status with color coding
- Items list
- Total amount
- Tracking number (if shipped)

## 📱 Responsive Design

- ✅ Mobile-first approach
- ✅ Desktop optimization
- ✅ Tablet support
- ✅ Flexible grid layouts
- ✅ Responsive navigation

## 🚀 Performance Optimizations

- Database indexing on search fields
- Pagination for large datasets
- Lazy loading images
- Client-side caching
- Efficient API queries

## 📝 Sample Test Credentials

**Admin Account:**
- Email: admin@example.com
- Password: admin123

**Regular User:**
- Email: user@example.com
- Password: user123

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check MONGO_URI in .env
- Try local: `mongodb://localhost:27017/mern_ecommerce`

### Backend Server Error
- Check if port 5000 is available
- Verify all dependencies are installed
- Check .env file configuration

### Frontend Connection Error
- Ensure backend is running on port 5000
- Check API_BASE_URL in api.js
- Clear browser cache and restart

### CORS Error
- Verify CORS is enabled in server.js
- Check backend is running
- Ensure correct API URL in frontend

## 🔄 Deployment

### Backend (Heroku)
```bash
heroku create app-name
git push heroku main
heroku config:set MONGO_URI=your_connection_string
```

### Frontend (Vercel)
```bash
npm install -g vercel
vercel --prod
```

## 📚 Tech Stack

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose
- JWT & bcryptjs
- CORS & body-parser

**Frontend:**
- React 18
- React Router v6
- Axios
- Context API

## 📄 License

MIT License - Free to use for personal and commercial projects

## 🤝 Contributing

Contributions are welcome! Feel free to fork and submit pull requests.

## 📞 Support

For issues or questions, please open an issue in the repository.

---

**Built with ❤️ using MERN Stack**
