import { Role } from "../../generated/prisma/enums"
import { prisma } from "../lib/prisma"

const createServiceIntoDB = async(payload: any, userId: string) => {
    const loggedInUser = await prisma.user.findUnique({
        where:{
            id: userId
        }
    })

    if(!loggedInUser){
        throw new Error("Please login to access this route")
    }

    if(loggedInUser.role != Role.ADMIN){
        throw new Error("Unauthorized access")
    }

    if(loggedInUser.status === "SUSPENDED"){
        throw new Error("You are suspended. Please contact with support team.")
    }

    const createServiceIntoDB = await prisma.service.createMany({
        data: payload,
        skipDuplicates: true
    })

    return createServiceIntoDB;



}


const CreateCategoriesIntoDB = async(payload: any, userId: string) => {
    const loggedInUser = await prisma.user.findUnique({
        where:{
            id: userId
        }
    })

    if(!loggedInUser){
        throw new Error("Please login to access this route")
    }

    if(loggedInUser.role != Role.ADMIN){
        throw new Error("Unauthorized access")
    }

    if(loggedInUser.status === "SUSPENDED"){
        throw new Error("You are suspended. Please contact with support team.")
    }

    const createCategories = await prisma.categories.createMany({
        data: payload,
        skipDuplicates: true
    })

    return createCategories;
}


export const adminService = {
    createServiceIntoDB,
    CreateCategoriesIntoDB

}