const express = require("express");
const { demo, getAllUsers, registerUser, loginUser, logoutUser } = require("../controller/user_cont");

const router = express.Router();

router.get("/", demo);

router.get("/allUsers", getAllUsers);

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/logout", logoutUser);

module.exports = router;
