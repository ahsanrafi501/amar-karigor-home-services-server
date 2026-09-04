import { Router } from "express";
import { serviceController } from "./service.controller";

const router = Router();


router.get("/", serviceController.getAllServices);
router.get("/categories", serviceController.getAllServiceCategories);




export const serviceRoutes = router;