const express = require("express");
const { requireSignin, isAdmin } = require("../middlewares/authMiddleware");
const {
  CreateProductController,
  GetAllProductController,
  GetSingleProductController,
  getProductPhotoController,
  deleteproductController,
  updateproductController,
} = require("../controllers/ProductController");
const ExpressFormidable = require("express-formidable");
const router = express.Router();

// create Product
router.post(
  "/create-product",
  requireSignin,
  isAdmin,
  ExpressFormidable(),
  CreateProductController
);

// get all product
router.get("/get-product", GetAllProductController);
// get single product
router.get("/get-product/:slug", GetSingleProductController);
// get photo
router.get("/product-photo/:pid", getProductPhotoController);

// delete product
router.delete(
  "/delete-product/:pid",
  requireSignin,
  isAdmin,
  deleteproductController
);
// update product
router.put(
  "/update-product/:pid",
  requireSignin,
  isAdmin,
  ExpressFormidable(),
  updateproductController
);
module.exports = router;
