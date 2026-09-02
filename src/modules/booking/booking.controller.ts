import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";

const createNewBookings = catchAsync(async(req: Request, res: Response, next: NextFunction) =>{
    
})


export const bookingController = {
    createNewBookings,
    
}