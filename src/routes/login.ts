import { Router } from "express";
import LoginController from "../app/controllers/LoginController";

const loginRoutes = Router();

loginRoutes.post("/", LoginController.create);

export { loginRoutes };
