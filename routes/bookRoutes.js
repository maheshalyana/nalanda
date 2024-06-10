const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

router.post(
  "/",
  authMiddleware,
  roleMiddleware("Admin"),
  bookController.addBook
);
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("Admin"),
  bookController.updateBook
);
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("Admin"),
  bookController.deleteBook
);
router.get("/", bookController.listBooks);

module.exports = router;
