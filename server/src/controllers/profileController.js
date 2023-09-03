const User = require("../database/schemas/User");

// Function for retrieving user details
const index = async (req, res) => {
  try {
    // Fetch user profile using req.userId
    const user_db = await User.findByPk(req.userId);
    if (!user_db) {
      return res.status(404).json({ error: "User not found" });
    } else {
      res.json({ username: user_db.username, email: user_db.email });
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching profile" });
  }
};

module.exports = {
  index,
};
