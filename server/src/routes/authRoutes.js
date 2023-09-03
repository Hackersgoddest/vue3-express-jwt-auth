const { Router } = require("express");
const { register, login } = require("../controllers/authController");

const router = Router();

// user registration route
router.post("/register", register);

// user login route
router.post("/login", login);

module.exports = router;
