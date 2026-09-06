import { Request, Response, Router } from "express";
import { paymentController } from "./payment.controller";
import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middleware/auth";

const router = Router();

router.post("/initiate-payment",auth(Role.USER, Role.TECHNICIAN, Role.ADMIN), paymentController.initiatePayment);

router.post("/success", paymentController.paymentSuccess);
router.post("/failed", paymentController.paymentFailed);
router.post("/cancelled", paymentController.paymentCancelled);



export const paymentRoutes = router;