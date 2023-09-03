const { verifyToken } = require("../controllers/authController");
const { Router } = require("express");
const { index } = require("../controllers/profileController");

const router = Router();

// Middleware for verifying jwt token
router.use(verifyToken);

// Protected route that requires authentication
router.use("/", index);

module.exports = router;