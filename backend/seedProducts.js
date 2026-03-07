require("dotenv").config();

const axios = require("axios");
const mongoose = require("mongoose");
const Product = require("./models/Product");


/* CONNECT DATABASE */

mongoose.connect(process.env.MONGO_URI);

mongoose.connection.once("open",()=>{
console.log("MongoDB connected");
});


/* CATEGORY MAPPING */

const mapCategory = (category)=>{

if(category.includes("beauty")) return "beauty";

if(category.includes("fragrance")) return "beauty";

if(category.includes("furniture")) return "home";

if(category.includes("groceries")) return "groceries";

if(category.includes("laptop")) return "electronics";

if(category.includes("smartphone")) return "electronics";

return "fashion";

};


/* SEED PRODUCTS */

const seedProducts = async()=>{

try{

console.log("Fetching products...");

const res = await axios.get(
"https://dummyjson.com/products?limit=100"
);

const apiProducts = res.data.products;


/* CLEAR OLD PRODUCTS */

await Product.deleteMany();


/* TRANSFORM PRODUCTS */

const products = apiProducts.map(p=>({

name:p.title,

price:p.price,

description:p.description,

image:p.thumbnail,

category:mapCategory(p.category),

stock:p.stock,

discount:Math.round(p.discountPercentage)

}));


/* INSERT PRODUCTS */

await Product.insertMany(products);

console.log("Products imported successfully");

process.exit();

}catch(error){

console.error("Error importing products:",error);

process.exit();

}

};


seedProducts();