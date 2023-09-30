const { hashpassword, comparePassword } = require("../helper/authHelper");
const userModel = require("../models/userModel");
const JWT = require("jsonwebtoken");
const registercontroller = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;
    // validation
    if (!name) {
      return res.json({
        success: false,
        messege: "please fill the name field",
      });
    }
    if (!email) {
      return res.json({
        success: false,
        messege: "please fill the name field",
      });
    }
    if (!password) {
      return res.json({
        success: false,
        messege: "please fill the name field",
      });
    }
    if (!phone) {
      return res.json({
        success: false,
        messege: "please fill the name field",
      });
    }
    if (!address) {
      return res.json({
        success: false,
        messege: "please fill the name field",
      });
    }
    if (!answer) {
      return res.json({
        success: false,
        message: "please fill answer field",
      });
    }
    // if user already exist then
    const user = await userModel.findOne({ email: email });
    if (user) {
      return res.json({
        success: false,
        message: "user already exist please login",
      });
    }
    // now we have to create the new user
    const hashedPassword = await hashpassword(password);
    const newuser = await userModel.create({
      name: name,
      email: email,
      phone: phone,
      password: hashedPassword,
      address: address,
      answer: answer,
    });
    return res.json({
      success: true,
      message: "new user created",
      newuser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in registration",
      error,
    });
  }
};

const loginController = async (req, res) => {
  // we will get email and password

  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid username or password",
      });
    }
    // now we have to validate the password
    const hashedPassword = user.password;
    const isMatchedpassword = await comparePassword(password, hashedPassword);
    if (isMatchedpassword) {
      const payload = {
        _id: user._id,
        email: user.email,
      };
      const token = JWT.sign(payload, process.env.JWT_secret);
      req.user = user;
      return res.status(200).json({
        success: true,
        message: "Login Successfully",
        user,
        token,
      });
    }
    return res.json({
      success: false,
      message: "incorrect password",
    });
  } catch (error) {
    console.log(error);
    res.send({
      sucess: false,
      message: "error in login",
      error,
    });
  }
};
const forgotPasswordController = async (req, res) => {
  try {
    const { email, newpassword, answer } = req.body;
    if (!email) {
      res.status(400).send({ message: "Email is required" });
    }
    if (!answer) {
      res.status(400).send({ message: "Answer is required" });
    }
    if (!newpassword) {
      res.status(400).send({ message: "New-password is required" });
    }
    const user = await userModel.findOne({ email, answer });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong Email or Answer",
      });
    }
    const hashed = await hashpassword(newpassword);
    await userModel.findByIdAndUpdate(user._id, {
      password: hashed,
    });
    res.status(201).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};
const testController = (req, res) => {
  return res.send("payload protected");
};
module.exports = {
  registercontroller,
  loginController,
  testController,
  forgotPasswordController,
};
