const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User');
const Product = require('./models/Product');

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/mern_ecommerce');
    console.log('Connected to MongoDB');

    await User.deleteMany({});
    await Product.deleteMany({});
    console.log('Cleared existing data');

    const adminPassword = await bcrypt.hash('admin123', 10);
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: adminPassword,
      phone: '9876543210',
      role: 'ADMIN',
      address: {
        street: '123 Admin Street',
        city: 'Bangalore',
        state: 'Karnataka',
        zipCode: '560001',
        country: 'India'
      }
    });

    const accessoriesData = [
      {"name":"Stylish Sunglasses","price":1999,"image":"https://images.pexels.com/photos/19090/pexels-photo.jpg", "brand": "Ray-Ban", "desc": "Classic aviator sunglasses with UV protection and a sleek metal frame."},
      {"name":"Leather Belt","price":1449,"image":"https://images.pexels.com/photos/1445696/pexels-photo-1445696.jpeg", "brand": "Levi's", "desc": "Genuine full-grain leather belt with a brushed nickel buckle for a timeless look."},
      {"name":"Gold Necklace","price":4999,"image":"https://images.pexels.com/photos/265906/pexels-photo-265906.jpeg", "brand": "Giva", "desc": "Elegant 18k gold-plated necklace with a minimalist pendant, perfect for everyday wear."},
      {"name":"Silver Bracelet","price":2499,"image":"https://images.pexels.com/photos/1395306/pexels-photo-1395306.jpeg", "brand": "Tanishq", "desc": "Handcrafted sterling silver bracelet with intricate design details and a secure clasp."},
      {"name":"Elegant Earrings","price":2999,"image":"https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg", "brand": "Swarovski", "desc": "Stunning drop earrings featuring clear crystals that catch the light beautifully."},
      {"name":"Fashion Watch","price":5999,"image":"https://images.pexels.com/photos/145939/pexels-photo-145939.jpeg", "brand": "Fossil", "desc": "Contemporary analog watch with a stainless steel strap and water-resistant features."},
      {"name":"Chic Hat","price":1799,"image":"https://images.pexels.com/photos/948873/pexels-photo-948873.jpeg", "brand": "H&M", "desc": "Wide-brimmed felt hat that adds a touch of sophistication to any autumn or winter outfit."},
      {"name":"Wrist Watch","price":3999,"image":"https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg", "brand": "Casio", "desc": "Durable digital-analog sports watch with multi-function features and rugged design."},
      {"name":"Pearl Ring","price":3499,"image":"https://images.pexels.com/photos/974911/pexels-photo-974911.jpeg", "brand": "Zaveri Pearls", "desc": "Exquisite freshwater pearl ring set in a polished silver band with cubic zirconia accents."},
      {"name":"Beaded Bracelet","price":1299,"image":"https://images.pexels.com/photos/167703/pexels-photo-167703.jpeg", "brand": "Fabindia", "desc": "Traditional handcrafted beaded bracelet featuring vibrant natural stones and adjustable cord."},
      {"name":"Cufflinks Set","price":2249,"image":"https://images.pexels.com/photos/211469/pexels-photo-211469.jpeg", "brand": "Louis Philippe", "desc": "Premium polished steel cufflinks that add a refined touch to your formal attire."},
      {"name":"Leather Wallet","price":2799,"image":"https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg", "brand": "Wildcraft", "desc": "Slim bifold leather wallet with multiple card slots and an integrated RFID protection."},
      {"name":"Fashion Scarf","price":1599,"image":"https://images.pexels.com/photos/631165/pexels-photo-631165.jpeg", "brand": "Zara", "desc": "Lightweight silk-blend scarf featuring a contemporary abstract print and soft texture."},
      {"name":"Crystal Bracelet","price":3350,"image":"https://images.pexels.com/photos/933255/pexels-photo-933255.jpeg", "brand": "Accessoryize", "desc": "Glamorous bracelet adorned with sparkling multifaceted crystals and a silver-tone finish."},
      {"name":"Charm Necklace","price":2875,"image":"https://images.pexels.com/photos/265905/pexels-photo-265905.jpeg", "brand": "Pandora", "desc": "Delicate chain necklace with a signature heart-shaped charm and adjustable length."},
      {"name":"Stylish Brooch","price":1899,"image":"https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg", "brand": "Vero Moda", "desc": "Vintage-inspired floral brooch with pearl detailing, perfect for jackets or dresses."},
      {"name":"Minimalist Ring","price":2149,"image":"https://images.pexels.com/photos/1413420/pexels-photo-1413420.jpeg", "brand": "BlueStone", "desc": "Modern geometric ring in 14k rose gold, designed for stacking or wearing alone."},
      {"name":"Anklet Chain","price":1699,"image":"https://images.pexels.com/photos/997861/pexels-photo-997861.jpeg", "brand": "Voylla", "desc": "Graceful silver anklet with tiny bells and blue beads for a bohemian summer look."},
      {"name":"Stud Earrings","price":1399,"image":"https://images.pexels.com/photos/428340/pexels-photo-428340.jpeg", "brand": "Titan", "desc": "Simple yet elegant sapphire-colored stud earrings in a hypoallergenic setting."},
      {"name":"Vintage Pendant","price":2649,"image":"https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg", "brand": "Diva", "desc": "Antique-finish pendant featuring a detailed filigree pattern on a long brass chain."}
    ];

    const bagsData = [
      {"name":"Classic Tote Bag","price":2999,"image":"https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg", "brand": "Lavie", "desc": "Spacious faux-leather tote with multiple compartments, ideal for work or daily shopping."},
      {"name":"Traveler Backpack","price":4299,"image":"https://images.pexels.com/photos/322207/pexels-photo-322207.jpeg", "brand": "Wildcraft", "desc": "Ergonomic 35L travel backpack with rain cover and laptop compartment for modern explorers."},
      {"name":"Leather Messenger","price":5499,"image":"https://images.pexels.com/photos/836569/pexels-photo-836569.jpeg", "brand": "Hidesign", "desc": "Premium handcrafted vegetable-tanned leather messenger bag for a professional appearance."},
      {"name":"Casual Daypack","price":3599,"image":"https://images.pexels.com/photos/4046304/pexels-photo-4046304.jpeg", "brand": "Skybags", "desc": "Lightweight and stylish daypack with vibrant prints and padded shoulder straps for comfort."},
      {"name":"Mini Crossbody","price":2449,"image":"https://images.pexels.com/photos/4046311/pexels-photo-4046311.jpeg", "brand": "Caprese", "desc": "Compact crossbody bag with a high-shine finish and golden hardware for evening outings."},
      {"name":"Duffle Bag","price":4799,"image":"https://images.pexels.com/photos/4046315/pexels-photo-4046315.jpeg", "brand": "American Tourister", "desc": "Robust gym and weekend duffle bag with a separate shoe compartment and durable handles."},
      {"name":"Leather Clutch","price":3249,"image":"https://images.pexels.com/photos/1262849/pexels-photo-1262849.jpeg", "brand": "Da Milano", "desc": "Sleek leather clutch with an optional chain strap, perfect for formal events and parties."},
      {"name":"Office Bag","price":3899,"image":"https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg", "brand": "Van Heusen", "desc": "Structured laptop bag with internal organizers and a luggage sleeve for frequent commuters."},
      {"name":"Canvas Satchel","price":2875,"image":"https://images.pexels.com/photos/1152076/pexels-photo-1152076.jpeg", "brand": "Zouk", "desc": "Vegan-friendly canvas satchel featuring traditional prints and a spacious main compartment."},
      {"name":"Stylish Backpack","price":4150,"image":"https://images.pexels.com/photos/1556704/pexels-photo-1556704.jpeg", "brand": "F Gear", "desc": "Trendy urban backpack with a hidden back pocket and water-resistant fabric for rainy days."},
      {"name":"Travel Purse","price":2799,"image":"https://images.pexels.com/photos/4046307/pexels-photo-4046307.jpeg", "brand": "Baggit", "desc": "Versatile travel purse with multiple zip pockets to keep your essentials organized and safe."},
      {"name":"Zip Tote","price":3399,"image":"https://images.pexels.com/photos/4046312/pexels-photo-4046312.jpeg", "brand": "Allen Solly", "desc": "Contemporary zip-top tote with a textured finish and comfortable handles for long use."},
      {"name":"Clutch Purse","price":2649,"image":"https://images.pexels.com/photos/1395306/pexels-photo-1395306.jpeg", "brand": "Lino Perros", "desc": "Elegant satin-finish clutch with stone embellishments, designed for weddings and galas."},
      {"name":"Studded Bag","price":4599,"image":"https://images.pexels.com/photos/102123/pexels-photo-102123.jpeg", "brand": "Ginger", "desc": "Edgy backpack with metallic stud details and a drawstring closure for a bold street look."},
      {"name":"Shopping Tote","price":2199,"image":"https://images.pexels.com/photos/933255/pexels-photo(933255).jpeg", "brand": "Chumbak", "desc": "Eco-friendly reusable shopping tote featuring quirky illustrations and strong canvas straps."},
      {"name":"Work Bag","price":3949,"image":"https://images.pexels.com/photos/4046310/pexels-photo-4046310.jpeg", "brand": "Peter England", "desc": "Sleek and professional work bag with a dedicated tablet sleeve and reinforced bottom."},
      {"name":"Hiking Pack","price":5000,"image":"https://images.pexels.com/photos/1262848/pexels-photo-1262848.jpeg", "brand": "Quechua", "desc": "Technical hiking backpack with load-adjuster straps and breathable back for long trails."},
      {"name":"Mini Sling Bag","price":2575,"image":"https://images.pexels.com/photos/322210/pexels-photo-322210.jpeg", "brand": "Fastrack", "desc": "Lightweight mini sling bag, perfect for carrying your phone, wallet, and keys on the go."},
      {"name":"Laptop Bag","price":4999,"image":"https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg", "brand": "Lenovo", "desc": "Minimalist laptop bag with high-density padding and weather-resistant outer shell."},
      {"name":"Weekend Bag","price":4399,"image":"https://images.pexels.com/photos/4046314/pexels-photo-4046314.jpeg", "brand": "Roadster", "desc": "Durable canvas and leather weekend bag with a classic vintage aesthetic and high capacity."}
    ];

    const dressesData = [
      {"name":"Evening Gown","price":6999,"image":"https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg", "brand": "Zara", "desc": "Elegant floor-length evening gown with a shimmering finish and a graceful silhouette."},
      {"name":"Summer Dress","price":3499,"image":"https://images.pexels.com/photos/2060240/pexels-photo-2060240.jpeg", "brand": "H&M", "desc": "Light and airy floral summer dress with adjustable straps and a comfortable cotton lining."},
      {"name":"Casual Fit Dress","price":2999,"image":"https://images.pexels.com/photos/974911/pexels-photo-974911.jpeg", "brand": "Mango", "desc": "Versatile A-line dress with a relaxed fit, perfect for brunch or a casual day out."},
      {"name":"Maxi Dress","price":4950,"image":"https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg", "brand": "Vero Moda", "desc": "Flowy bohemian-style maxi dress with a tiered skirt and a flattering wrap bodice."},
      {"name":"Party Dress","price":5999,"image":"https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg", "brand": "Only", "desc": "Sequined mini party dress with long sleeves and a dramatic open back for night events."},
      {"name":"Floral Dress","price":3999,"image":"https://images.pexels.com/photos/1488462/pexels-photo-1488462.jpeg", "brand": "Fabindia", "desc": "Traditional block-print floral dress made from premium breathable cotton for all-day comfort."},
      {"name":"Boho Chic Dress","price":4499,"image":"https://images.pexels.com/photos/713312/pexels-photo-713312.jpeg", "brand": "Global Desi", "desc": "Eclectic boho-chic dress with tassel details and ethnic embroidery for a unique look."},
      {"name":"Lace Dress","price":5499,"image":"https://images.pexels.com/photos/4046306/pexels-photo-4046306.jpeg", "brand": "Forever New", "desc": "Exquisite white lace dress with a high neckline and a soft flared hem for special occasions."},
      {"name":"Formal Dress","price":6449,"image":"https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg", "brand": "Van Heusen Woman", "desc": "Sleek professional sheath dress with a tailored fit and a subtle side slit for office wear."},
      {"name":"Cocktail Dress","price":5975,"image":"https://images.pexels.com/photos/1468379/pexels-photo-1468379.jpeg", "brand": "Biba", "desc": "Modern fusion cocktail dress with gold embroidery and a contemporary asymmetrical cut."},
      {"name":"Shift Dress","price":4299,"image":"https://images.pexels.com/photos/2043590/pexels-photo-2043590.jpeg", "brand": "Marks & Spencer", "desc": "Classic shift dress in a premium linen blend, offering a timeless and breathable style."},
      {"name":"Wrap Dress","price":4750,"image":"https://images.pexels.com/photos/1239294/pexels-photo-1239294.jpeg", "brand": "Diane von Furstenberg", "desc": "Iconic silk-jersey wrap dress that creates a stunning silhouette and fits all body types."},
      {"name":"Sundress","price":3349,"image":"https://images.pexels.com/photos/1468378/pexels-photo-1468378.jpeg", "brand": "U.S. Polo Assn.", "desc": "Sporty cotton sundress with a button-up front and a relaxed waist for summer days."},
      {"name":"Midi Dress","price":4599,"image":"https://images.pexels.com/photos/1926768/pexels-photo-1926768.jpeg", "brand": "Allen Solly", "desc": "Sophisticated midi dress with a pleated skirt and a contrasting belt for a refined look."},
      {"name":"Denim Dress","price":3875,"image":"https://images.pexels.com/photos/1437861/pexels-photo-1437861.jpeg", "brand": "Levi's", "desc": "Durable and stylish denim shirt-dress with classic western details and chest pockets."},
      {"name":"Silk Dress","price":7999,"image":"https://images.pexels.com/photos/374031/pexels-photo-374031.jpeg", "brand": "Satya Paul", "desc": "Luxurious pure silk dress featuring a signature designer print and a smooth satin finish."},
      {"name":"Vintage Dress","price":5550,"image":"https://images.pexels.com/photos/974913/pexels-photo-974913.jpeg", "brand": "Rareism", "desc": "Retro-inspired polka dot dress with a flared skirt and a dainty peter pan collar."},
      {"name":"Wedding Dress","price":14999,"image":"https://images.pexels.com/photos/3771834/pexels-photo-3771834.jpeg", "brand": "Anita Dongre", "desc": "Magnificent handcrafted lehenga dress for weddings, featuring intricate zardosi work."},
      {"name":"Mini Dress","price":3249,"image":"https://images.pexels.com/photos/1239293/pexels-photo-1239293.jpeg", "brand": "Forever 21", "desc": "Trendy bodycon mini dress with a ribbed texture and a vibrant neon color."},
      {"name":"Chiffon Dress","price":4899,"image":"https://images.pexels.com/photos/1926767/pexels-photo-1926767.jpeg", "brand": "Madame", "desc": "Delicate chiffon dress with a ruffled neckline and a soft pastel floral print."}
    ];

    const electronicsData = [
      {"name":"Wireless Headphones","price":5999,"image":"https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg", "brand": "Sony", "desc": "Noise-cancelling wireless headphones with 30-hour battery life and superior sound quality."},
      {"name":"Smartphone","price":69900,"image":"https://images.pexels.com/photos/18105/pexels-photo.jpg", "brand": "Samsung", "desc": "Latest flagship smartphone with a 108MP camera, 120Hz display, and 5G connectivity."},
      {"name":"Laptop","price":89999,"image":"https://images.pexels.com/photos/341523/pexels-photo-341523.jpeg", "brand": "Apple", "desc": "Ultra-thin laptop with the powerful M2 chip, Retina display, and all-day battery life."},
      {"name":"Bluetooth Speaker","price":4999,"image":"https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg", "brand": "JBL", "desc": "Portable waterproof Bluetooth speaker with deep bass and up to 12 hours of playtime."},
      {"name":"Digital Camera","price":44999,"image":"https://images.pexels.com/photos/374074/pexels-photo-374074.jpeg", "brand": "Canon", "desc": "Mirrorless digital camera with 24.2MP sensor and 4K video recording capabilities."},
      {"name":"Gaming Keyboard","price":7999,"image":"https://images.pexels.com/photos/1038041/pexels-photo-1038041.jpeg", "brand": "Logitech G", "desc": "Mechanical gaming keyboard with RGB backlighting and customizable macro keys."},
      {"name":"Wireless Mouse","price":2999,"image":"https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg", "brand": "Microsoft", "desc": "Ergonomic wireless mouse with precision tracking and long-lasting battery life."},
      {"name":"Smart Watch","price":19999,"image":"https://images.pexels.com/photos/325153/pexels-photo-325153.jpeg", "brand": "Apple", "desc": "Advanced smartwatch with fitness tracking, heart rate monitor, and seamless integration."},
      {"name":"Tablet","price":32999,"image":"https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg", "brand": "iPad", "desc": "Versatile tablet with Apple Pencil support, ideal for drawing, taking notes, and streaming."},
      {"name":"LED Monitor","price":24999,"image":"https://images.pexels.com/photos/1298601/pexels-photo-1298601.jpeg", "brand": "Dell", "desc": "27-inch 4K LED monitor with ultra-slim bezels and professional color accuracy."},
      {"name":"DSLR Camera","price":99999,"image":"https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg", "brand": "Nikon", "desc": "High-end DSLR camera for professionals, featuring a full-frame sensor and dual card slots."},
      {"name":"VR Headset","price":29999,"image":"https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg", "brand": "Meta", "desc": "Standalone VR headset with immersive graphics and a vast library of games and apps."},
      {"name":"Gaming Console","price":49999,"image":"https://images.pexels.com/photos/479273/pexels-photo-479273.jpeg", "brand": "Sony", "desc": "Next-gen gaming console with ultra-high-speed SSD and 4K-TV gaming support."},
      {"name":"Wireless Earbuds","price":8999,"image":"https://images.pexels.com/photos/479271/pexels-photo-479271.jpeg", "brand": "Bose", "desc": "True wireless earbuds with world-class noise cancellation and a comfortable, secure fit."},
      {"name":"Drone Camera","price":69999,"image":"https://images.pexels.com/photos/5077047/pexels-photo-5077047.jpeg", "brand": "DJI", "desc": "Foldable drone with a 4K camera and 3-axis gimbal for professional aerial photography."},
      {"name":"Mechanical Keyboard","price":10999,"image":"https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg", "brand": "Razer", "desc": "High-performance mechanical keyboard with tactile switches and a magnetic wrist rest."},
      {"name":"Smart TV","price":119999,"image":"https://images.pexels.com/photos/3178851/pexels-photo-3178851.jpeg", "brand": "LG", "desc": "65-inch OLED Smart TV with 4K resolution, Dolby Vision, and AI-powered picture quality."},
      {"name":"Power Bank","price":3999,"image":"https://images.pexels.com/photos/3825573/pexels-photo-3825573.jpeg", "brand": "Anker", "desc": "High-capacity power bank with fast charging technology and dual USB output."},
      {"name":"Home Projector","price":54999,"image":"https://images.pexels.com/photos/210647/pexels-photo-210647.jpeg", "brand": "Epson", "desc": "Home theater projector with 3000 lumens and 1080p resolution for a big-screen experience."},
      {"name":"USB Microphone","price":12999,"image":"https://images.pexels.com/photos/1181670/pexels-photo-1181670.jpeg", "brand": "Blue Yeti", "desc": "Professional USB microphone with multiple pickup patterns, perfect for podcasting and gaming."}
    ];

    const homeKitchenData = [
      {"name":"Non-Stick Cookware Set","price":12999,"image":"https://images.pexels.com/photos/1599791/pexels-photo-1599791.jpeg", "brand": "T-fal", "desc": "Complete non-stick cookware set with even heat distribution and ergonomic handles."},
      {"name":"Coffee Maker","price":8999,"image":"https://images.pexels.com/photos/3497499/pexels-photo-3497499.jpeg", "brand": "Nespresso", "desc": "Compact espresso machine with a high-pressure pump for barista-quality coffee at home."},
      {"name":"Kitchen Utensil Set","price":3999,"image":"https://images.pexels.com/photos/139306/pexels-photo-139306.jpeg", "brand": "KitchenAid", "desc": "Durable 15-piece kitchen utensil set including whisks, spatulas, and measuring cups."},
      {"name":"Microwave Oven","price":19999,"image":"https://images.pexels.com/photos/1027508/pexels-photo-1027508.jpeg", "brand": "Panasonic", "desc": "Powerful countertop microwave with inverter technology and 10 power levels."},
      {"name":"Dining Table Set","price":59999,"image":"https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg", "brand": "IKEA", "desc": "Solid wood 6-seater dining table set with a minimalist design and cushioned chairs."},
      {"name":"Air Fryer","price":14999,"image":"https://images.pexels.com/photos/584399/pexels-photo-584399.jpeg", "brand": "Philips", "desc": "Digital air fryer with rapid air technology for healthy frying with up to 90% less fat."},
      {"name":"Kitchen Storage Jars","price":2999,"image":"https://images.pexels.com/photos/349609/pexels-photo-349609.jpeg", "brand": "Tupperware", "desc": "Set of 4 airtight storage jars to keep your ingredients fresh and organized."},
      {"name":"Blender","price":7999,"image":"https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg", "brand": "Vitamix", "desc": "Professional-grade blender with variable speed control and high-performance motor."},
      {"name":"Cutlery Set","price":4999,"image":"https://images.pexels.com/photos/2258083/pexels-photo-2258083.jpeg", "brand": "Zwilling", "desc": "Premium 24-piece stainless steel cutlery set with a mirror-polished finish."},
      {"name":"Electric Kettle","price":5999,"image":"https://images.pexels.com/photos/1358912/pexels-photo-1358912.jpeg", "brand": "Cuisinart", "desc": "Cordless electric kettle with a 1.7L capacity and auto-shutoff safety features."},
      {"name":"Refrigerator","price":89999,"image":"https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg", "brand": "Samsung", "desc": "Large capacity French door refrigerator with twin cooling plus and water dispenser."},
      {"name":"Dish Rack","price":3499,"image":"https://images.pexels.com/photos/631606/pexels-photo-631606.jpeg", "brand": "Simplehuman", "desc": "Space-efficient dish drying rack with an integrated drip tray and wine glass holder."},
      {"name":"Pressure Cooker","price":9999,"image":"https://images.pexels.com/photos/139309/pexels-photo-139309.jpeg", "brand": "Prestige", "desc": "High-quality stainless steel pressure cooker with a triple safety system."},
      {"name":"Kitchen Towels Set","price":1999,"image":"https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg", "brand": "Boll & Branch", "desc": "Set of 6 absorbent organic cotton kitchen towels in a stylish waffle weave."},
      {"name":"Dining Plates Set","price":6999,"image":"https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg", "brand": "Corelle", "desc": "16-piece dinnerware set that is chip-resistant and microwave-safe."},
      {"name":"Toaster","price":4999,"image":"https://images.pexels.com/photos/3952034/pexels-photo-3952034.jpeg", "brand": "Breville", "desc": "4-slice toaster with extra-wide slots and a 'lift and look' feature."},
      {"name":"Water Purifier","price":29999,"image":"https://images.pexels.com/photos/2082090/pexels-photo-2082090.jpeg", "brand": "Kent", "desc": "Advanced RO water purifier with UV disinfection and multi-stage filtration."},
      {"name":"Gas Stove","price":34999,"image":"https://images.pexels.com/photos/534151/pexels-photo-534151.jpeg", "brand": "Prestige", "desc": "Modern 4-burner gas stove with a toughened glass top and brass burners."},
      {"name":"Kitchen Organizer","price":4499,"image":"https://images.pexels.com/photos/631607/pexels-photo-631607.jpeg", "brand": "Home Centre", "desc": "Modular kitchen organizer for spices and condiments with a space-saving design."},
      {"name":"Dinner Set","price":11999,"image":"https://images.pexels.com/photos/139308/pexels-photo-139308.jpeg", "brand": "La Opala", "desc": "Elegant 33-piece opalware dinner set with a contemporary floral design."}
    ];

    const mapProducts = (data, category) => data.map((item, i) => ({
      name: item.name,
      description: item.desc || `Premium ${item.name} from our ${category} collection. High quality and stylish.`,
      price: item.price,
      originalPrice: Math.round(item.price * 1.5),
      category: category,
      brand: item.brand || 'Premium Brand',
      stock: 50,
      images: [item.image],
      rating: 4.0 + (i % 10) / 10,
      seller: admin._id
    }));

    const allProducts = [
      ...mapProducts(accessoriesData, 'Accessories'),
      ...mapProducts(bagsData, 'Bags'),
      ...mapProducts(dressesData, 'Dresses'),
      ...mapProducts(electronicsData, 'Electronics'),
      ...mapProducts(homeKitchenData, 'Home & Kitchen')
    ];

    await Product.insertMany(allProducts);
    console.log(`Inserted ${allProducts.length} products`);

    console.log('Database seeded successfully');
    process.exit();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
