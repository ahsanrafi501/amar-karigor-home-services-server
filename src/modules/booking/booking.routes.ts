import { Router } from "express";
import { bookingController } from "./booking.controller";

const router = Router();

router.post("/create/:id", bookingController.createNewBookings);




export const bookingRoutes = router;