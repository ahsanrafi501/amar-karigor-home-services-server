import { Router } from "express";
import { technicianController } from "./technician.controller";

const route = Router();

route.post("/apply", technicianController.applyAsTechnician);


export const technicianRoutes = route;