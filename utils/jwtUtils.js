const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_TOKEN,
    {
      expiresIn: "1h",
    }
  );
};

module.exports = {
  generateToken,
};
