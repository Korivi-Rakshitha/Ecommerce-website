const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('../models/Product');

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/mern_ecommerce');
  console.log('Connected to MongoDB');

  const products = await Product.find({}).lean();
  for (const p of products) {
    console.log('---');
    console.log('Name:', p.name);
    console.log('Category:', p.category);
    console.log('Images:', p.images);
  }

  process.exit(0);
};

run().catch(err => { console.error(err); process.exit(1); });
