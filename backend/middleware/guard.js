const { verifyToken } = require("../services/tokenService");
const User = require("../models/User");

exports.guard = async (req, res, next) => {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.split(" ")[1] : null;

  if (!token) { 
    return res.status(401).json({ error: "Missing Token" });
  }

  try {
    const payload = verifyToken(token);
    console.log("payload", payload);

    const user = await User.findById(payload.sub);
    if (!user) {
      return res.status(401);
      json({ error: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: "User not found" });
  }
};
