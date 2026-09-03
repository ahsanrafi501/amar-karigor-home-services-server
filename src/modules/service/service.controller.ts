import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import httpstatus from "http-status";
import { serviceService } from "./service.service";

const getAllServices = async (
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
};

export const serviceController = {
    getAllServices,
};