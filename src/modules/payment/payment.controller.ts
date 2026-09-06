import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { paymentService } from "./payment.service";
import { NextFunction, Request, Response } from "express";

const createPayment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    const payload = req.body;
    const result = await paymentService.initiatePayment(payload, user);
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Payment initiated successfully",
        data: result,
    });

});


const paymentSuccess = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await paymentService.paymentSuccess(req.body);

    res.status(200).json({
        success: true,
        message: "Payment successful",
        data: result,
    });
})



const paymentFailed = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await paymentService.paymentFailed(req.body);

    res.status(200).json({
        success: true,
        message: "Payment Failed",
        data: result,
    });
})


const paymentCancelled = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await paymentService.paymentCancelled(req.body);

    res.status(200).json({
        success: true,
        message: "Payment cancelled",
        data: result,
    });
})

export const paymentController = {
    initiatePayment: createPayment,
    paymentSuccess,
    paymentFailed,
    paymentCancelled
};