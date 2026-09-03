import cookieParser from "cookie-parser";
import express, { Application, Request, Response } from "express";
import cors from "cors";
import config from "./config";
import { userRoutes } from "./modules/user/user.routes";
import { authRoutes } from "./modules/auth/auth.routes";
import { technicianRoutes } from "./modules/technician/technician.routes";
import { auth } from "./middleware/auth";
import { Role } from "../generated/prisma/enums";
import { adminRoutes } from "./modules/admin/admin.routes";
import { notFound } from "./middleware/notFound";
import { globalErrorHandler } from "./middleware/globalErrorHandler";
import { bookingRoutes } from "./modules/booking/booking.routes";
import { reviewRoutes } from "./modules/review/review.routes";
import { serviceRoutes } from "./modules/service/service.routes";



const app : Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: config.appUrl,
    credentials: true,
}));

app.get("/", (req: Request, res: Response) => {
    res.send("Hello, World!");
});


app.use("/api/user", userRoutes);
app.use("/api/all-technicians", technicianRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/technician", auth(Role.USER, Role.TECHNICIAN, Role.ADMIN), technicianRoutes);
app.use("/api/admin", auth(Role.ADMIN), adminRoutes);
app.use("/api/booking", auth(Role.USER, Role.TECHNICIAN, Role.ADMIN), bookingRoutes);
app.use("/api/review", auth(Role.USER, Role.ADMIN), reviewRoutes)





app.use(notFound);
app.use(globalErrorHandler);

export default app;