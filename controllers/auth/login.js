const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../../models/user");
const { requestError } = require("../../helpers");

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = User.findOne({ email });
  if (!user) {
    throw requestError(401, "Email not found");
  }
  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
    throw requestError(401, "Password wrong");
  }
  const payload = { id: user._id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  res.json({ token });
};

module.exports = login;
