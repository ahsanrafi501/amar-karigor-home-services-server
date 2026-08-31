import cookieParser from "cookie-parser";
import express, { Application, Request, Response } from "express";
import cors from "cors";
import config from "./config";
import { userRoutes } from "./modules/user/user.routes";
import { globalErrorHandler } from "./middleware/globalErrorHandler";
import { notFound } from "./middleware/notFound";
import { authRoutes } from "./auth/auth.routes";
import { technicianRoutes } from "./technician/technician.routes";
import { auth } from "./middleware/auth";
import { Role } from "../generated/prisma/enums";
import { adminRoutes } from "./admin/admin.routes";

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
app.use("/api/auth", authRoutes);
app.use("/api/technician", auth(Role.USER, Role.TECHNICIAN), technicianRoutes);
app.use("/api/admin", auth(Role.ADMIN), adminRoutes);





app.use(notFound);
app.use(globalErrorHandler);

export default app;