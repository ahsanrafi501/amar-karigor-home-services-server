import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { authService } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import httpstatus from "http-status"

const loginUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;

    const { accessToken, refreshToken } = await authService.loginUserFromDb(payload);

    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000, // cookie lasts 1 days
    });
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000, // cookie lasts 7 days
    });


    sendResponse(res, {
        success: true,
        statusCode: httpstatus.OK,
        message: "User logged in successfully",
        data: {
            accessToken,
            refreshToken
        }
    })

})


const refreshToken = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refreshToken;

    const { accessToken } = await authService.refreshToken(refreshToken);

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000 //1D
    })


    sendResponse(res, {
        success: true,
        statusCode: httpstatus.OK,
        message: "Token refreshed successfully",
        data: {
            accessToken
        }
    })


})


export const authController = {
    loginUser,
    refreshToken
}