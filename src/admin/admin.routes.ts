import { Router } from "express";
import { auth } from "../middleware/auth";
import { Role } from "../../generated/prisma/enums";
import { adminController } from "./admin.controller";
const router = Router();




router.post("/create-service", adminController.createService)
router.post("/create-categories", adminController.createCategories)
router.patch("/users/:id", auth(Role.ADMIN), adminController.updateUserStatus)





export const adminRoutes = router;