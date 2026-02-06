import { Router } from "express";
import verifyJWT from "../middlewares/authMiddleware.js";
import { validateSignup, validateLogin } from "../middlewares/validateAuth.js";
import * as authController from "../controllers/authController.js";

const router = Router();

router.post("/signup", validateSignup, authController.signup);
router.post("/login", validateLogin, authController.login)
router.post("/logout", verifyJWT, authController.logout);

export default router;;