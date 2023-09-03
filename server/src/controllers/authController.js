const User = require("../database/schemas/User");
const jwt = require("jsonwebtoken");
const { hash_password, compare_password } = require("../utils/helpers");

// Function for verifying JWT token
const verifyToken = (req, res, next) => {
  const auth_header = req.headers["authorization"];
  if (auth_header) {
    const token = auth_header.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Invalid token" });
      } else {
        req.userId = decoded.userId;
        next();
      }
    });
  } else {
    return res.status(401).json({ error: "Token not provided" });
  }
};

// User registration function
const register = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    if (!username) {
      res.status(400).json({ error: "Username field is required" });
    } else if (!email) {
      res.status(400).json({ error: "Email field is required" });
    } else if (!password) {
      res.status(400).json({ error: "Password field is required" });
    } else {
      const user_db = await User.findOne({ where: { email } });
      if (user_db) {
        res.status(400).json({ error: "Email already exist" });
      } else {
        // Hash the password
        const hashedPassword = hash_password(password);
        // Create a user record in the database
        const new_user = await User.create({
          username,
          email,
          password: hashedPassword,
        });
        // Generate JWT token
        const token = jwt.sign(
          { userId: new_user.id },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "1h" }
        );
        res.json({ message: "User registered successfully", token });
      }
    }
  } catch (error) {
    res.status(500).json({ error: "Registration failed" });
  }
};

// User login function
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      res.status(400).json({ error: "Email field is required" });
    } else if (!password) {
      res.status(400).json({ error: "Password field is required" });
    } else {
      // Find the user by email
      const user_db = await User.findOne({ where: { email } });

      if (!user_db) {
        return res.status(404).json({ error: "User not found" });
      } else {
        // Compare the provided password with the hashed password
        const passwordMatch = compare_password(password, user_db.password);
        if (!passwordMatch) {
          return res.status(401).json({ error: "Invalid password" });
        } else {
          // Generate JWT token
          const token = jwt.sign(
            { userId: user_db.id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "1h" }
          );
          res.json({ message: "Login successful", token });
        }
      }
    }
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
};

module.exports = {
  verifyToken,
  register,
  login,
};
