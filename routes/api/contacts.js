const express = require("express");

const controller = require("../../controllers/contacts");

const { controllerWrapper } = require("../../helpers");

const { validationBody, isValidId, authenticate } = require("../../middlewars");

const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", authenticate, controllerWrapper(controller.listContacts));

router.get("/:id", isValidId, controllerWrapper(controller.getContactById));

router.post(
  "/",
  authenticate,
  validationBody(schemas.contactAddJoiSchema),
  controllerWrapper(controller.addContact)
);

router.put(
  "/:id",
  isValidId,
  validationBody(schemas.contactAddJoiSchema),
  controllerWrapper(controller.updateContactById)
);

router.patch(
  "/:id/favorite",
  isValidId,
  validationBody(schemas.updateFavoriteSchema),
  controllerWrapper(controller.updateFavorite)
);

router.delete("/:id", isValidId, controllerWrapper(controller.removeContact));

module.exports = router;
