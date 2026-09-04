import { Router } from "express";
import { technicianController } from "./technician.controller";
import { Role } from "../../../generated/prisma/client";
import { auth } from "../../middleware/auth";

const route = Router();

route.post("/apply",auth(Role.USER, Role.TECHNICIAN, Role.ADMIN), technicianController.applyAsTechnician);
route.put("/update", auth(Role.USER, Role.TECHNICIAN, Role.ADMIN), technicianController.updateTechnicianProfile);
route.put("/availability", auth(Role.USER, Role.TECHNICIAN, Role.ADMIN), technicianController.updateTechnicianAvailability);
route.get("/bookings", auth(Role.USER, Role.TECHNICIAN, Role.ADMIN), technicianController.getTechnicianBookings);
route.patch("/bookings/:bookingId", auth(Role.USER, Role.TECHNICIAN, Role.ADMIN), technicianController.updateBookingStatus);
route.post("/offered-services/:id", auth(Role.USER, Role.TECHNICIAN, Role.ADMIN), technicianController.createOfferedServicesByTechnician);
route.get("/profiles", technicianController.getAllTechnicianProfile);
route.get("/profiles/:id", technicianController.getTechnicianProfileWithReviews);


export const technicianRoutes = route;