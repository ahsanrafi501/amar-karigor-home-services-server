
import { VerificationStatus } from "../../../generated/prisma/client"
import { prisma } from "../../lib/prisma"
import { IPayload } from "./booking.interface"

const createNewBookingsInDB = async (userId: string, technicianOfferedServiceId: string, payload: IPayload)=>{
    const startTime = new Date(payload.startTime)
    const endTime = new Date(payload.endTime)

    if(startTime >= endTime){
        throw new Error("Start time must be before end time")
    }
    const isUserExists = await prisma.user.findUnique({
        where: {
            id: userId
        }
    })

    if(!isUserExists){
        throw new Error("User not exists")
    }

    if(isUserExists.status !== "ACTIVE"){
        throw new Error("Your account is not active. Please contact support for assistance.")
    }

    const service = await prisma.technicianService.findUnique({
        where: {
            id: technicianOfferedServiceId
        },
        include: {
            technicianProfile: true
        }
    })

    if(!service){
        throw new Error("Technician service not exists")
    }

    if(service.technicianProfile.userId === userId){
        throw new Error("You cannot book your own service")
    }

    if(service.technicianProfile.verificationStatus !== VerificationStatus.VERIFIED){
        throw new Error("The technician's account is not verified. Please contact support for assistance.")
    }

   

    const existingBooking = await prisma.booking.findFirst({
        where: {
            customerId: userId,
            technicianServiceId: technicianOfferedServiceId,
            status: "PENDING"
        }
    })

    if(existingBooking){
        throw new Error("You already have a pending booking for this service.")
    }

    const result = await prisma.booking.create({
        data: {
            customerId: userId,
            technicianServiceId: technicianOfferedServiceId,
            technicianProfileId: service.technicianProfile.id,
            startTime: startTime,
            endTime: endTime,
        }
    })

    return result;
    
}




const getUserBookingsFromDB = async (userId: string) => {
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    })

    if(!user){
        throw new Error("User not exists")
    }

    if(user.status !== "ACTIVE"){
        throw new Error("Your account is not active. Please contact support for assistance.")
    }

    const bookings = await prisma.booking.findMany({
        where: {
            customerId: userId
        },
        include: {
            TechnicianService: true,
            technicianProfile: true
        }
    })

    return bookings;
}






const getUserBookingsByIdFromDB = async (userId: string, bookingId: string) => {
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    })

    if(!user){
        throw new Error("User not exists")
    }

    if(user.status !== "ACTIVE"){
        throw new Error("Your account is not active. Please contact support for assistance.")
    }

    const booking = await prisma.booking.findFirst({
        where: {
            id: bookingId,
            customerId: userId
        },
        include: {
            TechnicianService: true,
            technicianProfile: true
        }
    })

    if(!booking){
        throw new Error("Booking not found")
    }

    return booking;
}






export const bookingService = {
    createNewBookingsInDB,
    getUserBookingsFromDB,
    getUserBookingsByIdFromDB
}