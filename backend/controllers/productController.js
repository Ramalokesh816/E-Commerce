const Product = require("../models/Product");

/* GET ALL PRODUCTS */

const getProducts = async (req, res) => {
  try {

    const products = await Product.find();

    res.json(products);

  } catch (error) {

    res.status(500).json({
      message: "Error fetching products"
    });

  }
};


/* GET PRODUCT BY ID */

const getProductById = async (req, res) => {
  try {

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.json(product);

  } catch (error) {

    res.status(500).json({
      message: "Error fetching product"
    });

  }
};


/* CREATE PRODUCT */

const createProduct = async (req, res) => {

  try {

    const {
      name,
      price,
      category,
      image,
      description,
      stock,
      discount,
      dealExpiry
    } = req.body;

    const product = new Product({
      name,
      price,
      category,
      image,
      description,
      stock,
      discount,
      dealExpiry
    });

    const savedProduct = await product.save();

    res.status(201).json(savedProduct);

  } catch (error) {

    res.status(500).json({
      message: "Error adding product"
    });

  }

};


/* UPDATE PRODUCT */

const updateProduct = async (req, res) => {

  try {

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.json(product);

  } catch (error) {

    res.status(500).json({
      message: "Error updating product"
    });

  }

};


/* DELETE PRODUCT */

const deleteProduct = async (req, res) => {

  try {

    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.json({
      message: "Product deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: "Error deleting product"
    });

  }

};


module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};