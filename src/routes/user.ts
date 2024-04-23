import { Router } from "express";
import UserController from "../app/controllers/UserController";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const userRoutes = Router();

userRoutes.get("/", isAuthenticated, UserController.index);
userRoutes.get("/refresh-data", isAuthenticated, UserController.refreshData);
userRoutes.post("/", isAuthenticated, UserController.create);

export { userRoutes };
