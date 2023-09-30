const mongoose = require("mongoose");

// Making CatagorySchema
const CatagorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    lowercase: true,
  },
});

// Catagory Model
const CatagoryModel = mongoose.model("catagory", CatagorySchema);
module.exports = CatagoryModel;
