const express = require("express");

const { asyncWrapper } = require("../../helpers/apiHelpers");

const {
  addContactValidation,
} = require("../../middlewares/validationMiddleware");

const { authMiddleware } = require("../../middlewares/authMiddleware");

const {
  addContactsController,
  changeContactsController,
  deleteContactsController,
  getContactsByIdController,
  getContactsController,
  updateStatusContactController,
} = require("../../controllers/contactsController");

const router = express.Router();

router.use(authMiddleware);

router.get("/", asyncWrapper(getContactsController));
router.get("/:contactId", asyncWrapper(getContactsByIdController));
router.post("/", addContactValidation, asyncWrapper(addContactsController));
router.put(
  "/:contactId",
  addContactValidation,
  asyncWrapper(changeContactsController)
);
router.delete("/:contactId", asyncWrapper(deleteContactsController));
router.patch(
  "/:contactId/favorite",
  asyncWrapper(updateStatusContactController)
);

module.exports = router;
