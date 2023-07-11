import { Router } from "express";
import validateSchema from "../middlewares/validateSchema.js";
import { loginSchema, userSchema } from "../schemas/user.schemas.js";
import { signIn, signUp } from "../controllers/auth.controllers.js";


const authRouter = Router();

authRouter.post('/cadastro', validateSchema(userSchema),signUp);
authRouter.post('/', validateSchema(loginSchema),signIn);

export default authRouter;