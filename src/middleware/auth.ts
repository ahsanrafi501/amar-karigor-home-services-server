import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../utils/catchAsync"
import { Role } from "../../generated/prisma/enums"
import { jwtUtils } from "../utils/jwt"
import config from "../config"
import { JwtPayload } from "jsonwebtoken"
import httpstatus from "http-status"
import { prisma } from "../lib/prisma"

declare global {
    namespace Express {
        interface Request {
            user: any
        }
    }
}


export const auth = (...requiredRoles: Role[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const token = req.cookies.accessToken ||
            (req.headers.authorization?.startsWith("Bearer") ?
                req.headers.authorization.split(" ")[1] :
                req.headers.authorization);

        if (!token) {
            throw new Error("Please log in to continue.")
        }

        const verifyToken = await jwtUtils.verifyToken(token, config.jwt_access_secret as string);

        if (!verifyToken.success) {
            throw new Error(verifyToken.error)
        }

        const { id, name, email, role } = verifyToken.data as JwtPayload;

        if (!requiredRoles.length || !requiredRoles.includes(role)) {
            res.status(httpstatus.FORBIDDEN).json({
                success: false,
                statusCode: httpstatus.FORBIDDEN,
                message: "Forbidden! You don't have permission to access this resource."
            })
        }

        const user = await prisma.user.findUnique({
            where:{
                id
            }
        })

        if(!user){
            throw new Error("User not found!")
        }

        if(user.status === "SUSPENDED"){
            throw new Error("Your account is suspended. Please contact support.")
        }


        req.user = {
            id,
            name,
            email,
            role
        }

        next();

    })
}