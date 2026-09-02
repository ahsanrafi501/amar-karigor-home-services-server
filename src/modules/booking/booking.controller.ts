import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpstatus from "http-status";
import { bookingService } from "./booking.service";
import { IPayload } from "./booking.interface";

const createNewBookings = catchAsync(async(req: Request, res: Response, next: NextFunction) =>{
    const {id: userId} = req.user;
    const technicianOfferedServiceId = req.params.id;
    const payload = req.body;

    const result = await bookingService.createNewBookingsInDB(userId as string, technicianOfferedServiceId as string, payload as IPayload)

    sendResponse(res, {
        success: true,
        statusCode: httpstatus.OK,
        message: "Your booking created successfully",
        data: {
            result
        }
    })
})


const getMyBookings = catchAsync(async(req: Request, res: Response, next: NextFunction) =>{
    const {id: userId} = req.user;

    const result = await bookingService.getUserBookingsFromDB(userId as string)

    sendResponse(res, {
        success: true,
        statusCode: httpstatus.OK,
        message: "Your booking fetched successfully",
        data: {
            result
        }
    })
})



const getMyBookingsById = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
    const {id: userId} = req.user;
    const bookingId = req.params.id;

    const result = await bookingService.getUserBookingsByIdFromDB(userId as string, bookingId as string)
    
    sendResponse(res, {
        success: true,
        statusCode: httpstatus.OK,
        message: "Your booking fetched successfully",
        data: {
            result
        }
    })
})




export const bookingController = {
    createNewBookings,
    getMyBookings,
    getMyBookingsById
}