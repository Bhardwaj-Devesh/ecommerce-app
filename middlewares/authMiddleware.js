const JWT = require("jsonwebtoken");
const userModel = require("../models/userModel");
const requireSignin = async (req, res, next) => {
  try {
    const decodepayload = JWT.verify(
      req.headers.authorization,
      process.env.JWT_secret
    );
    req.user = decodepayload;
    next();
  } catch (error) {
    console.log(error);
  }
};
// we want the middleware which check weather the person is admin or not
const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role != 1) {
      return res.status(401).json({
        success: false,
        message: "UnAuthorised Access",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Error in Admin Block",
    });
  }
};
module.exports = {
  requireSignin,
  isAdmin,
};
