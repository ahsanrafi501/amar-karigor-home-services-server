import { Role, UserStatus } from "../../generated/prisma/enums"
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



const updateUserStatusInDB = async(id: string, status: UserStatus) => {
    const user = await prisma.user.findUnique({
        where: {
            id
        }
    })


    if(!user){
        throw new Error("User not found")
    }

    if(user.role === Role.ADMIN){
        throw new Error("You are not authorized to update admin status")
    }

    if(user.status === status){
        throw new Error(`User is already ${status}`)
    }

    
    const updatedUser = await prisma.user.update({
        where: {
            id
        },
        data: {
            status
        }
    })

    return updatedUser;
}



const getAllBookingFromDB = async(UserId: string) => {


    const loggedInUser = await prisma.user.findUnique({
        where:{
            id: UserId
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

    const bookings = await prisma.booking.findMany()
    return bookings
}


const getAllCategoriesFromDB = async(UserId: string) => {


    const loggedInUser = await prisma.user.findUnique({
        where:{
            id: UserId
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

    const categories = await prisma.categories.findMany()
    return categories;
}









export const adminService = {
    createServiceIntoDB,
    CreateCategoriesIntoDB,
    updateUserStatusInDB,
    getAllBookingFromDB,
    getAllCategoriesFromDB
}