import { Router } from "express";
import { reviewController } from "./review.controller";


const router = Router();

router.post("/:bookingId", reviewController.createReview);


export const reviewRoutes = router;