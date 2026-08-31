import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { technicianService } from "./technician.service";
import { sendResponse } from "../utils/sendResponse";
import httpstatus from "http-status"

const applyAsTechnician = catchAsync(async(req: Request, res: Response, next: NextFunction) =>{
    const payload = req.body;
    const {id} = req.user;

    const result = await technicianService.applyAsTechnicianIntoDB(payload, id);

    sendResponse(res, {
        success: true,
        statusCode: httpstatus.CREATED,
        message: "Application successful, please wait for the approval",
        data: {
            result
        }
    })
})


const updateTechnicianProfile = catchAsync(async(req: Request, res: Response, next: NextFunction) =>{
    const {id} = req.user;
    const payload = req.body;

    const result = await technicianService.updateTechnicianProfileIntoDB(payload, id)

    sendResponse(res, {
        success: true,
        statusCode: httpstatus.OK,
        message: "Your profile updated successfully",
        data: {
            result
        }
    })
})
const updateTechnicianAvailability = catchAsync(async(req: Request, res: Response, next: NextFunction) =>{
    const {id} = req.user;
    const {availability} = req.body;

    const result = await technicianService.updateTechnicianAvailabilityIntoDB(availability, id)

    sendResponse(res, {
        success: true,
        statusCode: httpstatus.OK,
        message: "Your profile updated successfully",
        data: {
            result
        }
    })
})

const getTechnicianBookings = catchAsync(async(req: Request, res: Response, next: NextFunction) =>{
    const {id, role} = req.user;
    const payload = req.body;
    const result = await technicianService.getTechnicianBookingsFromDB(id)

    sendResponse(res, {
        success: true,
        statusCode: httpstatus.OK,
        message: "Your profile updated successfully",
        data: {
            result
        }
    })
})

const updateBookingStatus = catchAsync(async(req: Request, res: Response, next: NextFunction) =>{
    const {id: userId, role} = req.user;
    const {bookingId} = req.params;
    const payload = req.body;

    const result = await technicianService.updateBookingStatusIntoDB(bookingId as string, userId, payload)

    sendResponse(res, {
        success: true,
        statusCode: httpstatus.OK,
        message: "Your profile updated successfully",
        data: {
            result
        }
    })
})


export const technicianController = {
    applyAsTechnician,
    updateTechnicianProfile,
    updateTechnicianAvailability,
    getTechnicianBookings,
    updateBookingStatus

}