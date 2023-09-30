const { default: mongoose } = require("mongoose");
const productModel = require("../models/ProductModel");
const slugify = require("slugify");
const fs = require("fs");
// Create Product
const CreateProductController = async (req, res) => {
  try {
    const { name, slug, description, price, catagory, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    // validation
    switch (true) {
      case !name: {
        return res.status(500).send({ error: "Name is required" });
      }
      case !description: {
        return res.status(500).send({ error: "description is required" });
      }
      case !price: {
        return res.status(500).send({ error: "price is required" });
      }
      case !catagory: {
        return res.status(500).send({ error: "catagory is required" });
      }
      case !quantity: {
        return res.status(500).send({ error: "quantity is required" });
      }
      case photo && photo.size > 1000000: {
        return res.status(500).send({ error: "photo size >1MB is required" });
      }
    }
    const product = new productModel({
      name,
      slug: slugify(name),
      description,
      price,
      catagory,
      quantity,
      shipping,
      photo,
    });
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();
    res.status(200).send({
      success: true,
      message: "Product Created Successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Somthing went wrong in Create Product",
    });
  }
};

// get all product
const GetAllProductController = async (req, res) => {
  try {
    const product = await productModel
      .find({})
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 })
      .populate("catagory");
    res.status(200).send({
      success: true,
      message: "All Product",
      countProduct: product.length,
      product,
    });
  } catch (error) {
    console.log(error);
    req.status(500).send({
      success: false,
      message: "Error in getting all product",
      error,
    });
  }
};
const GetSingleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("catagory");
    res.status(200).send({
      success: true,
      message: "Get single product successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting single product",
    });
  }
};
// get product photo
const getProductPhotoController = async (req, res) => {
  try {
    const product = await productModel
      .findById({ _id: req.params.pid })
      .select("photo");
    res.set("Content-Type", product.photo.contentType);
    res.status(200).send(product.photo.data);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting photo",
    });
  }
};
const deleteproductController = async (req, res) => {
  try {
    const product = await productModel
      .findByIdAndDelete(req.params.pid)
      .select("-photo");
    res.status(200).send({
      success: true,
      message: "Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Delete Product Controller",
    });
  }
};
//update product controller
const updateproductController = async (req, res) => {
  try {
    const { name, slug, description, price, catagory, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    // validation
    switch (true) {
      case !name: {
        return res.status(500).send({ error: "Name is required" });
      }
      case !description: {
        return res.status(500).send({ error: "description is required" });
      }
      case !price: {
        return res.status(500).send({ error: "price is required" });
      }
      case !catagory: {
        return res.status(500).send({ error: "catagory is required" });
      }
      case !quantity: {
        return res.status(500).send({ error: "quantity is required" });
      }
      case photo && photo.size > 100000: {
        return res.status(500).send({ error: "photo size >1MB is required" });
      }
    }
    const product = await productModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );

    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();
    res.status(200).send({
      success: true,
      message: "Product UPdated Successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in updating Product",
    });
  }
};
module.exports = {
  CreateProductController,
  GetAllProductController,
  GetSingleProductController,
  getProductPhotoController,
  deleteproductController,
  updateproductController,
};
