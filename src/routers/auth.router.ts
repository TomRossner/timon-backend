import { Router } from "express";
import { authCredentialsSchema } from "../schemas/authCredentials.validation";
import { validate } from "../middleware/validate.middleware";
import { logoutHandler, userLoginHandler } from "../controllers/auth.controller";
import passport from "passport";
import "../auth/google.provider";
import { CLIENT_URL } from "../lib/constants";
import { generateToken } from "../lib/jwt";
import { FullUser } from "../types/user";

const authRouter = Router();

authRouter.post('/login', validate(authCredentialsSchema), userLoginHandler);
authRouter.get('/login/google', passport.authenticate('google'));
authRouter.get('/google/callback',
    passport.authenticate('google', { session: false, failureRedirect: `${CLIENT_URL}/signin` }),
    (req, res) => {
        const token = generateToken(req.user as FullUser);
        res.redirect(`${CLIENT_URL}/signin?token=${token}`);
    }
);
authRouter.post('/logout', logoutHandler);

export default authRouter;