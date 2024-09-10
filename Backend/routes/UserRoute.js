const express = require("express");
const {
  SignUp,
  loginUser,
  LogOut,
  userLogin,
} = require("../Controllers/UserController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleWare/auth");
const router = express.Router();

// router.post("/register", registerUser);
router.post("/user/SignUp", SignUp);
router.post("/user/login", loginUser);
router.get("/user/logout", LogOut);

// router.get("/user/details/:id");
router.get("/user/me", isAuthenticatedUser, userLogin);
module.exports = router;
