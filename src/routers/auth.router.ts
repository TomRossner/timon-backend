import { Router } from "express";
import { authCredentialsSchema } from "../schemas/authCredentials.validation";
import { validate } from "../middleware/validate.middleware";
import { userLoginHandler } from "../controllers/auth.controller";

const authRouter = Router();

authRouter.post('/login', validate(authCredentialsSchema), userLoginHandler);

export default authRouter;