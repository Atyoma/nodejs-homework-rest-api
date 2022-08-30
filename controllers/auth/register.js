const bcrypt = require("bcryptjs");

const { User } = require("../../models/user");
const { requestError } = require("../../helpers");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw requestError(409, "Email already exist");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const result = User.create({ email, password: hashPassword });
  res.status(201).json({
    email: result.email,
  });
};

module.exports = register;
