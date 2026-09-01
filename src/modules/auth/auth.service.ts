import z, { email } from "zod";
import { LoginUserPayload } from "./auth.interface";
import bcrypt from "bcryptjs";
import config from "../../config";
import { JwtPayload, SignOptions } from "jsonwebtoken";
import { jwtUtils } from "../../utils/jwt";
import { prisma } from "../../lib/prisma";




const loginSchema = z.object({
    email: z.string({error: "Email required"}).trim().lowercase().email("Email is invalid"),
    password: z.string({error: "Password is required"}).min(8, "Password must be at least 8 characters"),
})


const loginUserFromDb = async(payload: LoginUserPayload) =>{
    const result = loginSchema.safeParse(payload);
   
    if(!result.success){
        throw new Error(result.error.issues[0]?.message)
    }

    const {email, password} = result.data;


    const user = await prisma.user.findUniqueOrThrow({
        where:{
            email
        }
    })

    if(user.status === "SUSPENDED") {
        throw new Error("Your account has been suspended. Please contact support");
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if(!isPasswordMatched){
        throw new Error("Password doesn't matched");
    }

    const jwtPayload = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
    }

    const accessToken = jwtUtils.createToken(jwtPayload, config.jwt_access_secret as string, config.jwt_access_expires_in as SignOptions);
    const refreshToken = jwtUtils.createToken(jwtPayload, config.jwt_refresh_secret as string, config.jwt_refresh_expires_in as SignOptions);

    return {
        accessToken,
        refreshToken
    }
}


const refreshToken = async(refreshToken: string) =>{
    const verifyRefreshToken = jwtUtils.verifyToken(refreshToken, config.jwt_refresh_secret as string);

    if(!verifyRefreshToken.success){
        throw new Error(verifyRefreshToken.error)
    }

    const {id} = verifyRefreshToken.data as JwtPayload;

    const user = await prisma.user.findUniqueOrThrow({
        where: {
            id
        }
    })

    if(user.status === "SUSPENDED"){
        throw new Error("You are suspended. Please contact support");
    }

    const jwtPayload = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
    }


    const accessToken = jwtUtils.createToken(jwtPayload, config.jwt_access_secret as string, config.jwt_access_expires_in as SignOptions);

    return {
        accessToken
    }
}


export const authService = {
    loginUserFromDb,
    refreshToken
}