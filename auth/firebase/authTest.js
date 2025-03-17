const express = require("express");
const jwt = require("jsonwebtoken");
const admin = require("../../firebaseAdmin");
const User = require("../../models/User");
require("dotenv").config();

const router = express.Router();

router.post("/auth/firebase", async (req, res) => {
  try {
    const { token } = req.body;

    const decodedToken = await admin.auth().verifyIdToken(token);
    const { uid, email, name, picture } = decodedToken;

    let user = await User.findOne({ firebaseId: uid });

    if (!user) {
      user = new User({ firebaseId: uid, email, name, picture });
      await user.save();
    }

    const jwtToken = jwt.sign({ id: user._id, email }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ token: jwtToken, user });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Invalid Firebase token" });
  }
});

module.exports = router;
