const { User } = require("../../models/user");

const { requestError, sendEmail } = require("../../helpers");

const resendEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw requestError(404, "Not found ");
  }
  if (user.verify) {
    throw requestError(400, "User already verify");
  }
  const mail = {
    to: email,
    subject: "Site registration confirmation",
    html: `<a href="http://localhost:8081/api/auth/verify/${user.verificationToken}" target="_blank">Click to confirm email</a>`,
  };

  await sendEmail(mail);
  res.json({ message: "Email verify resend" });
};

module.exports = resendEmail;
