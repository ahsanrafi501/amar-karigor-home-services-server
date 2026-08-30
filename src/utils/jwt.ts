import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

const createToken = (payload: JwtPayload, secret: string, expiresIn: SignOptions) =>{
    try {
        const token = jwt.sign(payload, secret, {expiresIn} as SignOptions);
        return token;
    } catch (error: any) {
        throw new Error("Something went wrong while creating token", error)
    }
}


const verifyToken = (token: string, secret: string) => {
    try {
        const verifyToken = jwt.verify(token, secret);
        return {
            success: true,
            data: verifyToken
        }
    } catch (error: any) {
        console.log("Token verification failed", error);
        return {
            success: false,
            error: error?.message
        }
    }
}


export const jwtUtils = {
    createToken,
    verifyToken
}