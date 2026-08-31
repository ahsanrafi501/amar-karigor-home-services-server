import { BookingStatus } from "../../generated/prisma/enums";
import { prisma } from "../lib/prisma"
import { ICancelBookingPayload, ITechnicianProfile, ITechnicianProfileUpdate } from "./technician.interface"

const applyAsTechnicianIntoDB = async (payload: ITechnicianProfile, id: string) => {
    const result = await prisma.technicianProfile.create({
        data: {
            ...payload,
            userId: id
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true
                }
            }
        }
    })

    return result;
}


const updateTechnicianProfileIntoDB = async (payload: ITechnicianProfileUpdate, id: string) => {
    const user = await prisma.user.findUnique({
        where: {
            id
        },
        include: {
            technicianProfile: true
        }
    })
    if (!user) {
        throw new Error("User not exists")
    }

    if (!user.technicianProfile) {
        throw new Error("Technician profile doesn't exist. Please create your technician profile first.")
    }

    const updatedProfile = await prisma.technicianProfile.update({
        where: {
            id: user.technicianProfile.id
        },
        data: {
            ...payload
        }
    })

    return updatedProfile;
}



const updateTechnicianAvailabilityIntoDB = async (availability: string, id: string) => {

    if (!availability) {
        throw new Error("Please input you availability")
    }

    const user = await prisma.user.findUnique({
        where: {
            id
        },
        include: {
            technicianProfile: true
        }
    })
    if (!user) {
        throw new Error("User not exists")
    }

    if (!user.technicianProfile) {
        throw new Error("Technician profile doesn't exist. Please create your technician profile first.")
    }

    const updatedProfile = await prisma.technicianProfile.update({
        where: {
            id: user.technicianProfile.id
        },
        data: {
            availability
        }
    })

    return updatedProfile;
}

const getTechnicianBookingsFromDB = async (id: string) => {


    const user = await prisma.user.findUnique({
        where: {
            id
        },
        include: {
            technicianProfile: true
        }
    })
    if (!user) {
        throw new Error("User not exists")
    }

    if (user.status === "SUSPENDED") {
        throw new Error("Your account is suspended. Please contact support.")
    }

    if (!user.technicianProfile) {
        throw new Error("Technician profile doesn't exist. Please create your technician profile first.")
    }

    if (user.role !== "TECHNICIAN") {
        throw new Error("You are not authorized to access this resource")
    }

    if (user.technicianProfile?.verficationStatus !== "VERIFIED") {
        throw new Error("Your technician profile is not verified yet. Please wait for the verification process to complete.")
    }


    const technicianBookings = await prisma.booking.findMany({
        where: {
            technicianProfileId: user.technicianProfile.id
        }
    })

    return technicianBookings;
}











const updateBookingStatusIntoDB = async (bookingId: string, userId: string, payload: ICancelBookingPayload) => {


    const user = await prisma.user.findUnique({
        where: {
            id: userId
        },
        include: {
            technicianProfile: true
        }
    })
    if (!user) {
        throw new Error("User not exists")
    }

    if (user.status === "SUSPENDED") {
        throw new Error("Your account is suspended. Please contact support.")
    }

    if (!user.technicianProfile) {
        throw new Error("Technician profile doesn't exist. Please create your technician profile first.")
    }

    if (user.role !== "TECHNICIAN") {
        throw new Error("You are not authorized to access this resource")
    }

    if (user.technicianProfile?.verficationStatus !== "VERIFIED") {
        throw new Error("Your technician profile is not verified yet. Please wait for the verification process to complete.")
    }


    const technicianBookings = await prisma.booking.findUnique({
        where: {
            id: bookingId
        }
    })

    if (!technicianBookings) {
        throw new Error("Booking not found")
    }

    if (technicianBookings.technicianProfileId !== user.technicianProfile.id) {
        throw new Error("You are not authorized to update this booking status")
    }


    if (payload.status === BookingStatus.CANCELLED) {
        const updatedBooking = await prisma.booking.update({
            where: {
                id: bookingId
            },
            data: {
                cancellationReason: payload.cancellationReason,
                cancelledAt: new Date(),
                cancelledBy: userId,
                status: payload.status
            }
        })

        return updatedBooking;
    }

    if (payload.status === BookingStatus.COMPLETED || payload.status === BookingStatus.CONFIRMED || payload.status === BookingStatus.IN_PROGRESS || payload.status === BookingStatus.PENDING) {
        {
            const updatedBooking = await prisma.booking.update({
                where: {
                    id: bookingId
                },
                data: {
                    status: payload.status
                }
            })

            return updatedBooking;
        }
    }
}



export const technicianService = {
    applyAsTechnicianIntoDB,
    updateTechnicianProfileIntoDB,
    updateTechnicianAvailabilityIntoDB,
    getTechnicianBookingsFromDB,
    updateBookingStatusIntoDB
}