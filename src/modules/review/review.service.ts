import { prisma } from "../../lib/prisma";
import { IReviewPayload } from "./review.interface";

const createReviewIntoDB = async (userId: string, bookingId: string, payload: IReviewPayload) => {
    const { rating: ratingString, title, description,} = payload;
    const rating = parseInt(ratingString as unknown as string);

    const booking = await prisma.booking.findUnique({
        where: {
            id: bookingId
        },
        include: {
            technicianProfile: true,
            TechnicianService: true
        }
    })

    if(!booking){
        throw new Error("Booking not found")
    }

    if(booking.status !== "COMPLETED"){
        throw new Error("You can only review completed bookings")
    }

    if(booking.customerId !== userId){
        throw new Error("You are not authorized to review this booking")
    }

    if(rating < 1 || rating > 5){
        throw new Error("Rating must be between 1 and 5")
    }

    if(title && title.length > 100){
        throw new Error("Title must be less than 100 characters")
    }

    if(description && description.length > 500){
        throw new Error("Description must be less than 500 characters")
    }

    const existingReview = await prisma.review.findFirst({
        where: {
            bookingId: booking.id
        }
    })

    if(existingReview){
        throw new Error("You have already reviewed this booking")
    }



    const review = await prisma.review.create({
        data: {
            rating,
            title,
            description,
            customerId: userId,
            technicianServiceId: booking.technicianServiceId,
            bookingId: booking.id
        }
    })

    return review;
}


export const reviewService = {
    createReviewIntoDB
}