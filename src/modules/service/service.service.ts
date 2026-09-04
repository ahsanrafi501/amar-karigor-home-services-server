import { prisma } from "../../lib/prisma";

const getAllServicesFromDB = async (
    type?: string,
    location?: string,
    rating?: string
) => {
    const services = await prisma.technicianService.findMany({
        where: {
            // Type/category filter
            service: type
                ? {
                    category: {
                        is: {
                            name: {
                                contains: type,
                                mode: "insensitive",
                            }
                        }
                    }
                }
                : undefined,

    // Location filter
    technicianProfile: location
        ? {
            serviceArea: {
                contains: location,
                mode: "insensitive",
            },
        }
        : undefined,
        },

include: {
    service: {
        include: {
            category: true,
                },
    },

    technicianProfile: true,

        reviews: true,
        },
    });

// Rating filter
if (rating) {
    const minimumRating = parseFloat(rating);

    return services.filter((technicianService) => {
        if (technicianService.reviews.length === 0) {
            return false;
        }

        const totalRating = technicianService.reviews.reduce(
            (sum, review) => sum + review.rating,
            0
        );

        const averageRating =
            totalRating / technicianService.reviews.length;

        return averageRating >= minimumRating;
    });
}

return services;
};



const getAllServiceCategoriesFromDB = async () => {
    const result = await prisma.categories.findMany();
    return result;
};













export const serviceService = {
    getAllServicesFromDB,
    getAllServiceCategoriesFromDB
};