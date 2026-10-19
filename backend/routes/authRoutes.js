const express = require("express");
const { googleAuth, me, login, register } = require("../controllers/users");
const { guard } = require("../middleware/guard");

const router = express.Router();
router.post('/login',login);
router.get("/me", guard, me);
router.post("/google", googleAuth);
router.post('/register', register);

module.exports = router;
