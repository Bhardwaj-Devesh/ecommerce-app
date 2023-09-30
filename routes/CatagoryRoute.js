const express = require("express");
const {
  CreateCatagoryController,
  UpdateCatagoryController,
  getCatagoryController,
  getSingleCatagoryController,
  deleteCatagoryController,
} = require("../controllers/catagoryController");
const { requireSignin, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();
// create new catagory
router.post(
  "/create-catagory",
  requireSignin,
  isAdmin,
  CreateCatagoryController
);
// update a catagory
router.put(
  "/update-catagory/:id",
  requireSignin,
  isAdmin,
  UpdateCatagoryController
);
// get all catagory
router.get("/get-catagory", getCatagoryController);
// get single catagory
router.get("/single-catagory/:slug", getSingleCatagoryController);
//delete Catagory
router.delete(
  "/delete-catagory/:id",
  requireSignin,
  isAdmin,
  deleteCatagoryController
);
module.exports = router;
