import { Request, Response, Router } from "express";
import { credentialsSchema } from "../schemas/authCredentials.validation";
import User from "../models/user.model";
import { validate } from "../middleware/validate.middleware";

const authRouter = Router();

authRouter.post('/', validate(credentialsSchema), async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({email});

        // if (user.pas)
    } catch (error) {
        
    }
});

export default authRouter;