import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { technicianService } from "./technician.service";
import { sendResponse } from "../../utils/sendResponse";
import httpstatus from "http-status"



const getAllTechnicianProfile = catchAsync(async(req: Request, res: Response, next:NextFunction) => {
    const {experience, serviceArea, ratings } = req.query;
    const result = await technicianService.getAllTechnicianProfileFromDB(serviceArea as string, experience as string, ratings as string);


    sendResponse(res, {
        success: true,
        statusCode: httpstatus.OK,
        message: "All technician's profile fetched successfully",
        data:{
            result
        }
    })
})




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
        message: "Your booking fetched successfully",
        data: {
            result
        }
    })
})

const updateBookingStatus = catchAsync(async(req: Request, res: Response, next: NextFunction) =>{
    const {id: userId} = req.user;
    const {bookingId} = req.params;
    const payload = req.body;

    const result = await technicianService.updateBookingStatusIntoDB(bookingId as string, userId, payload)

    sendResponse(res, {
        success: true,
        statusCode: httpstatus.OK,
        message: "Booking status updated successfully",
        data: {
            result
        }
    })
})



const createOfferedServicesByTechnician = catchAsync(async(req: Request, res: Response, next: NextFunction) =>{
    const {id: userId} = req.user;
    const {price: priceString} = req.body;
    const price = Number(priceString);
    const {id: serviceId} = req.params;

    const result = await technicianService.createTechnicianOfferedServicesFromDB(userId as string, price as number, serviceId as string)

    sendResponse(res, {
        success: true,
        statusCode: httpstatus.OK,
        message: "Your offered services created successfully",
        data: {
            result
        }
    })
})





const getTechnicianProfileWithReviews = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params;
    const result = await technicianService.getTechnicianProfileWithReviewsFromDB(id as string);

    sendResponse(res, {
        success: true,
        statusCode: httpstatus.OK,
        message: "Technician profile fetched successfully",
        data:{
            result
        }
    })
})






export const technicianController = {
    applyAsTechnician,
    updateTechnicianProfile,
    updateTechnicianAvailability,
    getTechnicianBookings,
    updateBookingStatus,
    createOfferedServicesByTechnician,
    getAllTechnicianProfile,
    getTechnicianProfileWithReviews

}