export interface ITechnicianProfile {
  bio?: string;
  experience?: number;
  availability: string;
  nidNumber: string;
  certification?: string;
  serviceArea: string;
  permanentAddress?: string;
  presentAddress: string;
}
export interface ITechnicianProfileUpdate {
  bio?: string;
  experience?: number;
  availability?: string;
  nidNumber?: string;
  certification?: string;
  serviceArea?: string;
  permanentAddress?: string;
  presentAddress?: string;
}


export interface ICancelBookingPayload {
    status: string;
    cancellationReason: string;
}


export interface ITechnicianOfferedServices {
  technicianId: string;
  serviceId: string;
  price: number;
}