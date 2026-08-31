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
// const heda = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
//     const payload = req.body;

//     const { id: userId } = req.user;

//     const result = await prisma.service.deleteMany();

//     sendResponse(res, {
//         success: true,
//         statusCode: httpstatus.OK,
//         message: "Categories created successfully",
//         data: {
//             result
//         }
//     })
// })






export const adminController = {
    createService,
    createCategories,
    // heda
}