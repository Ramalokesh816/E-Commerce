require("dotenv").config();

const axios = require("axios");
const mongoose = require("mongoose");
const Product = require("./models/Product");

/* CONNECT DATABASE */

mongoose.connect(process.env.MONGO_URI);

mongoose.connection.once("open", () => {
  console.log("MongoDB connected");
});

/* CATEGORY MAPPING */

const mapCategory = (category) => {

const cat = category.toLowerCase();

/* ELECTRONICS */

if(
cat.includes("smartphone") ||
cat.includes("laptop") ||
cat.includes("tablet")
){
return "Electronics";
}

/* BEAUTY */

if(
cat.includes("skincare") ||
cat.includes("fragrance") ||
cat.includes("beauty")
){
return "Beauty";
}

/* HOME & LIVING */

if(
cat.includes("furniture") ||
cat.includes("home-decoration") ||
cat.includes("lighting") ||
cat.includes("kitchen")
){
return "Home & Living";
}

/* GROCERIES */

if(cat.includes("groceries")){
return "Groceries";
}

/* DEFAULT */

return "Fashion";

};

/* GENERATE RANDOM DEAL DATE */

const getDealDate = () => {
  const future = new Date();
  future.setDate(future.getDate() + Math.floor(Math.random() * 20));
  return future;
};

/* SEED PRODUCTS */

const seedProducts = async () => {

  try {

    console.log("Fetching products...");

    const res = await axios.get(
      "https://dummyjson.com/products?limit=100"
    );

    const apiProducts = res.data.products;

    /* CLEAR OLD PRODUCTS */

    await Product.deleteMany();

    /* TRANSFORM PRODUCTS */

    const products = apiProducts.map(p => ({

      name: p.title,

      price: p.price,

      description: p.description,

      image: p.thumbnail,

      category: mapCategory(p.category),

      stock: p.stock || 50,

      discount: Math.round(p.discountPercentage || 0),

      dealExpiry: p.discountPercentage ? getDealDate() : null

    }));

    /* INSERT PRODUCTS */

    await Product.insertMany(products);

    console.log("Products imported successfully");

    process.exit();

  } catch (error) {

    console.error("Error importing products:", error);

    process.exit();

  }

};

seedProducts();