import { Router } from "express";
import { authController } from "./auth.controller";

const router = Router();


router.get("/login", authController.loginUser)
router.get("/refresh-token", authController.refreshToken)





export const authRoutes = router;