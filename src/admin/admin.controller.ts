import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { adminService } from "./admin.service";
import { sendResponse } from "../utils/sendResponse";
import httpstatus from "http-status"
import { prisma } from "../lib/prisma";

const createService = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;

    const { id: userId } = req.user;

    const result = await adminService.createServiceIntoDB(payload, userId);

    sendResponse(res, {
        success: true,
        statusCode: httpstatus.OK,
        message: "Service created successfully",
        data: {
            result
        }
    })
})


const createCategories = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;

    const { id: userId } = req.user;

    const result = await adminService.CreateCategoriesIntoDB(payload, userId);

    sendResponse(res, {
        success: true,
        statusCode: httpstatus.OK,
        message: "Categories created successfully",
        data: {
            result
        }
    })
})


const updateUserStatus = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { status } = req.body;

    const updatedUser = await adminService.updateUserStatusInDB(id as string, status);
    sendResponse(res, {
        success: true,
        statusCode: httpstatus.OK,
        message: "User status updated successfully",
        data: {
            updatedUser
        }
    })
})


const getAllBooking = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id: userId } = req.user;
    const bookings = await adminService.getAllBookingFromDB(userId);
    sendResponse(res, {
        success: true,
        statusCode: httpstatus.OK,
        message: "Bookings fetched successfully",
        data: {
            bookings
        }
    })
})


const getAllCategories = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id: userId } = req.user;
    const categories = await adminService.getAllCategoriesFromDB(userId);
    sendResponse(res, {
        success: true,
        statusCode: httpstatus.OK,
        message: "Categories fetched successfully",
        data: {
            categories
        }
    })
})





export const adminController = {
    createService,
    createCategories,
    updateUserStatus,
    getAllBooking,
    getAllCategories
}