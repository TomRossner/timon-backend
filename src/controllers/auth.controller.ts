import { Request, Response } from "express";
import { findUser, updateUser } from "../services/users.service";
import HTTP_STATUS_CODES from "../lib/httpStatusCodes";
import { ERROR_MESSAGES } from "../lib/errorMessages";
import { compare } from "bcrypt";

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

        const updatedUser = await updateUser({ email }, { online: true });

        if (!updatedUser) {
            throw new Error(ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
        }

        res
            .status(HTTP_STATUS_CODES.SUCCESS)
            .json(updatedUser);
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