const colors = require("colors");
const express = require("express");
const cors = require("cors");
// rest object
const app = express();

// connecting evn variables
const dotenv = require("dotenv");
dotenv.config();

// connnecting database
const connectDatabase = require("./config/connectdb");
connectDatabase();

// rest api;
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "we are ready",
  });
});
// middlewares
app.use(cors());
app.use(express.json());
// Routes
//  connecting authroute
const authroute = require("./routes/authRoute");
app.use("/api/v1", authroute);
// connecting Catagory Routes
const CatagoryRoute = require("./routes/CatagoryRoute");
app.use("/api/v1/catagory", CatagoryRoute);
// connecting Product Routes
const ProductRoute = require("./routes/ProductRoute");
app.use("/api/v1/product", ProductRoute);

// PORT
const PORT = process.env.PORT || 8000;

// listen to server
app.listen(PORT, () => {
  console.log(`server is working on ${process.env.DEV_MODE} on ${PORT}`.green);
});
