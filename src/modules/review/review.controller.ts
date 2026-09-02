import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpstatus from "http-status";
import { reviewService } from "./review.service";

const createReview = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id: userId } = req.user;
    const { bookingId } = req.params;
    const paylaod = req.body;

    const result = await reviewService.createReviewIntoDB(
        userId as string, 
        bookingId as string,
        paylaod

    );

    sendResponse(res, {
        success: true,
        statusCode: httpstatus.OK,
        message: "Your review created successfully",
        data: {
            result
        }
    });
});

export const reviewController = {
    createReview
};