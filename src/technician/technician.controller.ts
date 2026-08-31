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


export const technicianController = {
    applyAsTechnician,

}