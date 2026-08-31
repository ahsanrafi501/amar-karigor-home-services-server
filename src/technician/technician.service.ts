import { prisma } from "../lib/prisma"
import { ITechnicianProfile } from "./technician.interface"

const applyAsTechnicianIntoDB = async(payload: ITechnicianProfile, id: string) =>{
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


export const technicianService = {
    applyAsTechnicianIntoDB,
}