const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");
const { User } = require("../../models/user");
const { requestError, sendEmail } = require("../../helpers");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw requestError(409, "Email already exist");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();
  const result = User.create({
    email,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });
  const mail = {
    to: email,
    subject: "Site registration confirmation",
    html: `<a href="http://localhost:8081/api/auth/verify/${verificationToken}" target="_blank">Click to confirm email</a>`,
  };
  await sendEmail(mail);
  console.log({ email: result });
  res.status(201).json({
    email: (await result).email,
  });
};

module.exports = register;
