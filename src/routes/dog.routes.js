const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/dog.controller");
const asyncHandler = require("../middlewares/asyncHandler.middleware");
const validate = require("../middlewares/validate.middleware");
const {
  createDogSchema,
  updateDogSchema,
  querySchema,
} = require("../validations/dog.validations");
const validateObjectId = require("../middlewares/validateObjectId.middleware");
const auth = require("../middlewares/auth.middleware");

router.post(
  "/create",
  auth,
  validate(createDogSchema),
  asyncHandler(ctrl.createDog),
);

router.get(
  "/fetch",
  auth,
  validate(querySchema, "query"),
  asyncHandler(ctrl.getDogs),
);

router.put(
  "/update/:id",
  auth,
  validateObjectId,
  validate(updateDogSchema),
  asyncHandler(ctrl.updateDog),
);

router.delete(
  "/delete/:id",
  auth,
  validateObjectId,
  asyncHandler(ctrl.deleteDog),
);

module.exports = router;
