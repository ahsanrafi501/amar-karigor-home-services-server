import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import httpstatus from "http-status";
import { serviceService } from "./service.service";
import { catchAsync } from "../../utils/catchAsync";

const getAllServices = catchAsync(async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { type, location, rating } = req.query;

    const services = await serviceService.getAllServicesFromDB(
        type as string | undefined,
        location as string | undefined,
        rating as string | undefined
    );

    sendResponse(res, {
        success: true,
        statusCode: httpstatus.OK,
        message: "Services fetched successfully",
        data: {
            services,
        },
    });
});


const getAllServiceCategories = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await serviceService.getAllServiceCategoriesFromDB();

    sendResponse(res, {
        success: true,
        statusCode: httpstatus.OK,
        message: "All service categories fetched successfully",
        data: {
            result
        }
    })
})

export const serviceController = {
    getAllServices,
    getAllServiceCategories
};