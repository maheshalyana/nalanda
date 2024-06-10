const express = require("express");
const router = express.Router();
const borrowController = require("../controllers/borrowController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

router.post("/borrow", authMiddleware, borrowController.borrowBook);
router.post(
  "/return",
  authMiddleware,
  roleMiddleware("Admin"),
  borrowController.returnBook
);
router.get("/history", authMiddleware, borrowController.borrowHistory);

module.exports = router;
