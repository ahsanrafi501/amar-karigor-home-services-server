import { Router } from "express";
import { technicianController } from "./technician.controller";

const route = Router();

route.post("/apply", technicianController.applyAsTechnician);
route.put("/update", technicianController.updateTechnicianProfile);
route.put("/availability", technicianController.updateTechnicianAvailability);
route.get("/bookings", technicianController.getTechnicianBookings);
route.patch("/bookings/:id", technicianController.updateBookingStatus);
route.post("/offered-services", technicianController.createOfferedServicesByTechnician);


export const technicianRoutes = route;