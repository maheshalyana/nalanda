const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).send("Access denied");
  try {
    const payload = jwt.verify(token, process.env.JWT_TOKEN);
    req.user = payload;
    next();
  } catch (error) {
    res.status(401).send("Invalid token");
  }
};

module.exports = authMiddleware;
