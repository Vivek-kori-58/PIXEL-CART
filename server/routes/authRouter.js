// External Module
const express = require("express");
const authRouter = express.Router();

// Local Module
const authController = require("../controllers/authController");

/*
  "//" <- this sign represents that testing of this route is successfull
*/

authRouter.get("/login", authController.getLogin);
authRouter.post('/login',authController.postLogin);// 
authRouter.post('/logout',authController.postLogout);
authRouter.get('/Signup',authController.getSignup);
authRouter.post('/Signup',authController.postSignup);
authRouter.get('/check-auth', authController.getCheckAuth); // Check if user is logged in
module.exports = authRouter;