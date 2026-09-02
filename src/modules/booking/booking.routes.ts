import { Router } from "express";
import { bookingController } from "./booking.controller";

const router = Router();

router.post("/create/:id", bookingController.createNewBookings);
router.get("/my-bookings", bookingController.getMyBookings);
router.get("/my-bookings/:id", bookingController.getMyBookingsById);




export const bookingRoutes = router;