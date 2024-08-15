import express  from "express";
import { signup, login, logout, verifyEmail, forgotPassword, resetPassword, checkAuth } from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
const router = express.Router();
 
router.get("/check-auth", verifyToken, checkAuth) //using a custom made middleware verifyToken and a route controller checkauth to check the user's Authentcation

//signup route ✅(it is done) http://localhost:5000/api/auth/signup
router.post("/signup", signup);

//verify email route ✅(when the mail has been sent from the sign up endpoint to the user email, this should verify and turn the boolean to true) http://localhost:5000/api/auth/verify-email
router.post("/verify-email", verifyEmail);

//login route ✅ http://localhost:5000/api/auth/login
router.post("/login", login);

//forgot password route ✅ http://localhost:5000/api/auth/forgot-password
router.post("/forgot-password", forgotPassword);

//reset password route ✅ http://localhost:5000/api/auth/reset-password/:token
router.post("/reset-password/:token", resetPassword);

//logout route ✅ http://localhost:5000/api/auth/logout
router.post("/logout", logout);

export default router;
