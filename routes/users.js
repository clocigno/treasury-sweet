const passport = require("passport");
const express = require("express");
const { createUser, updateUser } = require("../controllers/users.js");
const ensureAuthenticated = require("../middleware/auth.js");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    await createUser(username, email, password);
    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error registering user" });
  }
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    if (!user) {
      return res.status(401).json({ message: info.message });
    }
    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      return res.status(200).json({ message: "Logged in successfully" });
    });
  })(req, res, next);
});

router.post("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: "Error logging out" });
    }
    return res.status(200).json({ message: "You have been logged out" });
  });
});

router.put("/update", ensureAuthenticated, async (req, res) => {
  try {
    const { username, email, password } = req.body;
    await updateUser(req.user.id, username, email, password);
    return res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    if (error.message === "User not found or access denied.") {
      return res.status(404).json({ message: error.message });
    }
    return res.status(500).json({ message: "Error updating user" });
  }
});

module.exports = router;
