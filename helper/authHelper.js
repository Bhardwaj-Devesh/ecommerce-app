const bcrypt = require("bcrypt");
const hashpassword = async (password) => {
  try {
    const saltRound = 10;
    const hashedPassword = await bcrypt.hash(password, saltRound);
    return hashedPassword;
  } catch (error) {
    console.log("error in hashing password");
    console.log(error);
  }
};
const comparePassword = (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};
module.exports = {
  hashpassword,
  comparePassword,
};
