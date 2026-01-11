const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('../models/Product');

const categoryFallbacks = {
  Electronics: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=500&fit=crop',
  Dresses: 'https://images.unsplash.com/photo-1514995669114-0a0e1a9f22b9?w=500&h=500&fit=crop',
  'Home & Kitchen': 'https://images.unsplash.com/photo-1505691723518-36a0c2b1c0f4?w=500&h=500&fit=crop',
  Bags: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=500&h=500&fit=crop',
  Accessories: 'https://images.unsplash.com/photo-1510557880182-3dc6a3c37a87?w=500&h=500&fit=crop'
};

const getFallback = (cat) => categoryFallbacks[cat] || 'https://images.unsplash.com/photo-1526178613296-2d4f0d4f6f2d?w=500&h=500&fit=crop';

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/mern_ecommerce');
  console.log('Connected to MongoDB');

  const products = await Product.find({});
  let updated = 0;

  for (const p of products) {
    // Normalize images: remove falsy/empty entries and placeholders
    const imgs = Array.isArray(p.images) ? p.images.filter(Boolean).map(s => (typeof s === 'string' ? s.trim() : s)) : [];
    const hasPlaceholder = imgs.some(url => typeof url === 'string' && url.includes('via.placeholder'));
    const hasInvalid = imgs.some(url => typeof url === 'string' && url.length < 10);

    if (imgs.length === 0 || hasPlaceholder || hasInvalid) {
      p.images = [getFallback(p.category)];
      await p.save();
      updated++;
      console.log(`Updated product ${p._id} (${p.name})`);
    }
  }

  console.log(`Done. Updated ${updated} products.`);
  process.exit(0);
};

run().catch(err => { console.error(err); process.exit(1); });
