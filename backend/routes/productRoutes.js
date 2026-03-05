const express = require("express");
const router = express.Router();

/* IMPORT CONTROLLER FUNCTIONS */
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require("../controllers/productController");


/* ============================= */
/*           ROUTES              */
/* ============================= */


/* GET ALL PRODUCTS */
router.get("/", getProducts);


/* GET SINGLE PRODUCT BY ID */
router.get("/:id", getProductById);


/* CREATE NEW PRODUCT */
router.post("/", createProduct);


/* UPDATE PRODUCT */
router.put("/:id", updateProduct);


/* DELETE PRODUCT */
router.delete("/:id", deleteProduct);


module.exports = router;