import { Request, Response } from "express";
import { findUser, updateUser } from "../services/users.service";
import HTTP_STATUS_CODES from "../lib/httpStatusCodes";
import { ERROR_MESSAGES } from "../lib/errorMessages";
import { compare } from "bcrypt";
import { generateToken } from "../lib/jwt";
import { FullUser } from "../types/user";
import passport from "passport";

export const userLoginHandler = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const exists = await findUser({ email }, { stripPassword: false });

        if (!exists.length) {
            res
                .status(HTTP_STATUS_CODES.BAD_REQUEST)
                .json({
                    message: `${ERROR_MESSAGES.INVALID_CREDENTIALS}.`,
                });
            return;
        }

        const isValidPassword: boolean = await compare(password, exists[0].password);

        if (!isValidPassword) {
            res
                .status(HTTP_STATUS_CODES.BAD_REQUEST)
                .json({
                    message: `${ERROR_MESSAGES.INVALID_CREDENTIALS}.`,
                });
            return;
        }

        const updatedUser = await updateUser(
            { email },
            { online: true },
            { stripPassword: true }
        );

        if (!updatedUser) {
            throw new Error(ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
        }

        const token = generateToken(updatedUser as unknown as FullUser);
        
        res
            .status(HTTP_STATUS_CODES.SUCCESS)
            .json({ token });
    } catch (error) {
        res
            .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
            .json({
                message: error instanceof Error
                    ? error.message
                    : `${ERROR_MESSAGES.INTERNAL_SERVER_ERROR}.`,
            });
    }
}

export const loginWithProviderHandler = async (req: Request, res: Response) => {
    try {
        const { provider } = req.params;
        console.log(provider)

        switch (provider) {
            case 'google':
                passport.authenticate('google', { scope: ['profile', 'email'] });
                break;
                
            case 'facebook':
                passport.authenticate('facebook', { scope: [] });
                break;

            case 'microsoft':
                passport.authenticate('microsoft', { scope: [] });
                break;
            
            // case 'apple':
            //     passport.authenticate('apple');
            //     break;
        
            default:
                throw new Error(`Login failed. Bad provider: ${provider}.`);
        }
    } catch (error) {
        res
            .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
            .json({
                message: error instanceof Error
                    ? error.message
                    : `Login failed. ${ERROR_MESSAGES.INTERNAL_SERVER_ERROR}.`,
            });
    }
}

export const logoutHandler = async (req: Request, res: Response) => {
    try {
        const { uid } = req.body;

        if (!uid) {
            res
                .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
                .json({ message: `Logout failed. ${ERROR_MESSAGES.INTERNAL_SERVER_ERROR}` });
            return;
        }

        const updatedUser = await updateUser(
            { uid },
            { online: false },
            { stripPassword: true }
        );

        if (!updatedUser) {
            res
                .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
                .json({ message: `Logout failed. ${ERROR_MESSAGES.INTERNAL_SERVER_ERROR}` });
            return;
        }

        res.sendStatus(HTTP_STATUS_CODES.SUCCESS);
    } catch (error) {
        res
            .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
            .json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
    }
}