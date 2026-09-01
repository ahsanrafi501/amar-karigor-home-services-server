import { Router } from "express";
import { adminController } from "./admin.controller";

const router = Router();




router.post("/create-service", adminController.createService)
router.post("/create-categories",  adminController.createCategories)
router.patch("/users/:id", adminController.updateUserStatus)
router.get("/bookings", adminController.getAllBooking)
router.get("/categories", adminController.getAllCategories)
router.patch("/technicians/:technicianId/verification", adminController.acceptTechnician)




export const adminRoutes = router;