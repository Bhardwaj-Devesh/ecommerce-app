const slugify = require("slugify");
const CatagoryModel = require("../models/CatagoryModel");

// Create new and unique catagory
const CreateCatagoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).json({
        success: false,
        message: "Catagory Name is required",
      });
    }
    const existingCatagory = await CatagoryModel.findOne({ name });
    if (existingCatagory) {
      return res.status(401).json({
        success: false,
        message: " Already existing Catagory",
      });
    }
    const catagory = await CatagoryModel.create({
      name: name,
      slug: slugify(name),
    });
    res.status(201).send({
      success: true,
      message: "new category created",
      catagory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "There is somthing wrong in Create Catagory",
      error,
    });
  }
};

// Updated Catagory Controaller
const UpdateCatagoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const catagory = await CatagoryModel.findByIdAndUpdate(
      id,
      {
        name: name,
        slug: slugify(name),
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Catagory Updated successfully",
      catagory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Updating Catagory",
    });
  }
};

const getCatagoryController = async (req, res) => {
  try {
    const catagory = await CatagoryModel.find({});
    res.status(200).send({
      success: true,
      message: "All catagories list",
      catagory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting Catagory",
    });
  }
};

const getSingleCatagoryController = async (req, res) => {
  try {
    const catagory = await CatagoryModel.findOne({
      slug: slugify(req.params.slug),
    });
    res.status(200).send({
      success: true,
      message: "get Single catagory successfully",
      catagory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting single catagory",
      error,
    });
  }
};
// delete Catagory
const deleteCatagoryController = async (req, res) => {
  try {
    await CatagoryModel.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json({
      success: true,
      messgage: " Catagory Deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Deleting Catagory",
      error,
    });
  }
};
module.exports = {
  CreateCatagoryController,
  UpdateCatagoryController,
  getCatagoryController,
  getSingleCatagoryController,
  deleteCatagoryController,
};
