import z from "zod";
import { prisma } from "../../lib/prisma";
import { RegisterUserPayload } from "./user.interface";
import bcrypt from "bcryptjs";
import config from "../../config";


const registerSchema = z.object({
    name: z.string({error: "Name is required"}).trim().min(1, "name is required"),
    email: z.string({error: "Email is required"}).trim().lowercase().email("Email is invaild"),
    password: z.string({error: "Password is required"}).min(8, "Password must be at least 8 characters"),
});



const registerUserIntoDB = async (payload: RegisterUserPayload) => {
    const result = registerSchema.safeParse(payload);

    if (!result.success) {
        throw new Error(result.error.issues[0]?.message);
    }

    const {name, email, password} = result.data;

    const isExist = await prisma.user.findUnique({
        where:{
            email
        }
    })

    if(isExist){
        throw new Error("User with this email already exists")
    }

    const hashedPassword = await bcrypt.hash(password, Number(config.bcrypt_salt_rounds));

    const newUser = await prisma.user.create({
        data:{
            name,
            email,
            password: hashedPassword
        },
        omit: {
            password: true
        }
    })

    return newUser;

}


export const userService = {
    registerUserIntoDB,

}