const express = require("express");
const {
  registercontroller,
  loginController,
  testController,
  forgotPasswordController,
} = require("../controllers/authcontroller");
const { requireSignin, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();
// register route || POST
router.post("/register", registercontroller);
// login route || POST
router.post("/login", loginController);
// Protected user Route auth
router.get("/user-auth", requireSignin, (req, res) => {
  res.status(200).send({ ok: true });
});
// Protected Admin Route
router.get("/admin-auth", requireSignin, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});
// forgot-password || POST
router.post("/forgot-password", forgotPasswordController);
router.get("/test", requireSignin, isAdmin, testController);
module.exports = router;
