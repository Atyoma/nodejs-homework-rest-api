const express = require("express");

const router = express.Router();

const { controllerWrapper } = require("../../helpers");

const controller = require("../../controllers/auth");

const { validationBody, authenticate, upload } = require("../../middlewars");

const { schemas } = require("../../models/user");

router.post(
  "/signup",
  validationBody(schemas.registerSchema),
  controllerWrapper(controller.register)
);

router.post(
  "/login",
  validationBody(schemas.loginSchema),
  controllerWrapper(controller.login)
);

router.get("/logout", authenticate, controllerWrapper(controller.logout));
router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  controllerWrapper(controller.updateAvatar)
);

router.get(
  "/verify/:verificationToken",
  controllerWrapper(controller.verifyEmail)
);

router.post(
  "/verify",
  validationBody(schemas.verifyEmailSchema),
  controllerWrapper(controller.resendEmail)
);
module.exports = router;
