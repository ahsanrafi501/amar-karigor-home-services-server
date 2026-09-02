import { Router } from "express";
import { bookingController } from "./booking.controller";

const router = Router();

router.post("/", bookingController.createNewBookings);




export const bookingRoutes = router;