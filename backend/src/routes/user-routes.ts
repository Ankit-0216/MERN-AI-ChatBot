import { Router } from "express";
import { getAllUsers, userSignUp } from "../controllers/user-controller.js";
import { signUpValidator, validate } from "../utils/validator.js";

const userRoutes = Router();

userRoutes.get("/", getAllUsers);
userRoutes.post("/signup", validate(signUpValidator), userSignUp);

export default userRoutes;
