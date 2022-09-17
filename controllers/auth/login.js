const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { User } = require("../../models/user");

const { requestError } = require("../../helpers");

const { SECRET_KEY } = process.env;
console.log({ SECRET_KEY });
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw requestError(401, "Email not found");
  }
  const comparePassword = await bcrypt.compare(password, user.password);

  if (!comparePassword) {
    throw requestError(401, "Password wrong");
  }
  if (!user.verify) {
    throw requestError(400, "Email not verify");
  }
  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    token,
  });
};

module.exports = login;
