import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { userService } from "./user.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status"

const userRegister = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;

    const user = await userService.registerUserIntoDB(payload);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User created successfully",
        data: {
            user
        }
    })
})

const getUserProfile = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id: userId } = req.user;
    console.log(req.user);

    const userProfile = await userService.getUserProfileFromDB(userId);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User profile fetched successfully",
        data: {
            userProfile
        }
    })
})




export const userController = {
    userRegister,
    getUserProfile
}