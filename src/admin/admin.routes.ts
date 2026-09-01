import { Router } from "express";
import { auth } from "../middleware/auth";
import { Role } from "../../generated/prisma/enums";
import { adminController } from "./admin.controller";
const router = Router();




router.post("/create-service", auth(Role.ADMIN), adminController.createService)
router.post("/create-categories", auth(Role.ADMIN), adminController.createCategories)
router.patch("/users/:id", auth(Role.ADMIN), adminController.updateUserStatus)
router.get("/bookings", auth(Role.ADMIN), adminController.getAllBooking)
router.get("/categories", auth(Role.ADMIN), adminController.getAllCategories)





export const adminRoutes = router;