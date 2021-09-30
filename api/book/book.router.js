const { Router } = require("express");

const controller = require("./book.controller");
const asyncControllerHandler = require("../helpers/controllerWrapper");
const requestDataValidationMiddleware = require("../middlewares/requestDataValidationMiddleware");
const schemes = require("../services/joi/schemes");
const router = Router();

router.post(
  "/",
  requestDataValidationMiddleware(schemes.bookCreateValidationScheme, "body"),
  asyncControllerHandler(controller.addBook)
);
router.put(
  "/:id",
  requestDataValidationMiddleware(
    schemes.bookUpdateValidationScheme.required(),
    "body"
  ),
  requestDataValidationMiddleware(schemes.idValidationScheme, "params"),
  asyncControllerHandler(controller.updateBook)
);
router.get(
  "/",
  requestDataValidationMiddleware(schemes.getBookListValidationScheme, "body"),
  asyncControllerHandler(controller.getBooksList)
);
router.get(
  "/:id",
  requestDataValidationMiddleware(schemes.idValidationScheme, "params"),
  asyncControllerHandler(controller.getBookById)
);
router.delete(
  "/:id",
  requestDataValidationMiddleware(schemes.idValidationScheme, "params"),
  asyncControllerHandler(controller.deleteBookById)
);

module.exports = router;
