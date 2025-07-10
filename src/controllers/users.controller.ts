import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { HASH_ROUNDS } from "../lib/constants";
import HTTP_STATUS_CODES from "../lib/httpStatusCodes";
import { createNewUser, deleteUser, findUser, updateUser } from "../services/users.service";
import { arrayToObject } from "../lib/arrayToObject";
import { UserDoc } from "../models/user.model";
import { FullUser, NewUserData } from "../types/user";
import fsPromises from "fs/promises";
import path from "path";

export const createMockUsers = async (req: Request, res: Response) => {
    try {
        const filePath = path.join(__dirname, '../database/users.json');
        const data = await fsPromises.readFile(filePath, { encoding: 'utf-8' });
        const users: NewUserData[] = JSON.parse(data);

        const results = await Promise.allSettled(
            users.map((u: NewUserData) => createNewUser(u))
        );

        const failed = results.filter(r => r.status === 'rejected');
        const succeeded = results.filter(r => r.status === 'fulfilled');

        res.status(HTTP_STATUS_CODES.SUCCESS).json({
            message: `Created ${succeeded.length} users, ${failed.length} failed.`,
            errors: failed.map((f: any, i) => ({
                user: users[i],
                reason: f.reason instanceof Error ? f.reason.message : f.reason
            }))
        });
    } catch (error) {
        console.error(error);
        res
            .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
            .json({
                message: error instanceof Error
                    ? error.message
                    : `Failed creating mock user(s).`,
            });
    }
}

export const getUserHandler = async (req: Request, res: Response) => {
    try {
        const { uid } = req.query;

        if (!uid) {
            // Return all users
            const users = await findUser({}, { stripPassword: true });

            res
                .status(HTTP_STATUS_CODES.SUCCESS)
                .json(Array.isArray(users) ? arrayToObject(users as UserDoc[], user => user.uid) : users);
            return;
        }

        const user = await findUser({ uid }, { stripPassword: true });

        if (!user) {
            res
                .status(HTTP_STATUS_CODES.NOT_FOUND)
                .json({
                    message: `User ${uid} not found.`,
                });
            return;
        }

        res
            .status(HTTP_STATUS_CODES.SUCCESS)
            .json(arrayToObject(user as UserDoc[], user => user.uid));
    } catch (error) {
        res
            .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
            .json({
                message: error instanceof Error
                    ? error.message
                    : `Failed finding user(s).`,
            });
    }
}

export const createUserHandler = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res
                .status(HTTP_STATUS_CODES.BAD_REQUEST)
                .json({
                    message: "Email and password are required."
                });
            return;
        }

        const exists = await findUser({ email });

        if (exists.length) {
            res
                .status(HTTP_STATUS_CODES.BAD_REQUEST)
                .json({
                    message: `User ${email} is already registered.`
                });
            return;
        }

        const newUser = await createNewUser(req.body);

        if (!newUser) {
            throw new Error(`Failed creating user ${email}.`);
        }

        res
            .status(HTTP_STATUS_CODES.CREATED)
            .json({
                message: `User ${email} created successfully.`
            });
    } catch (error) {
        res
            .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
            .json({
                message: error instanceof Error
                    ? error.message
                    : `Failed creating user ${req.body.email}.`,
            });
    }
}

export const deleteUserHandler = async (req: Request, res: Response) => {
    try {
        const { uid } = req.params;

        const exists = await findUser({ uid });

        if (!exists) {
            res
                .status(HTTP_STATUS_CODES.NOT_FOUND)
                .json({
                    message: `User ${uid} not found.`,
                });
            return;
        }

        const deleted = await deleteUser(uid);

        if (!deleted) {
            res
                .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
                .json({
                    message: `Failed deleting user ${uid}.`,
                });
            return;
        }

        res
            .status(HTTP_STATUS_CODES.SUCCESS)
            .json({
                message: `User ${uid} deleted.`,
            });
    } catch (error) {
        res
            .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
            .json({
                message: error instanceof Error
                    ? error.message
                    : `Failed deleting user ${req.params.uid}.`,
            });
    }
}

export const updateUserHandler = async (req: Request, res: Response) => {
    try {
        const { email, currentPassword, newPassword, ...rest } = req.body;
        const { uid } = req.params;

        const user = await findUser({ uid });

        if (!user) {
            res.status(HTTP_STATUS_CODES.NOT_FOUND).json({
                message: `User ${email} not found.`,
            });
            return;
        }

        const updatePayload: Partial<FullUser & NewUserData> = { ...rest };

        if (newPassword) {
            if (!currentPassword) {
                res
                    .status(HTTP_STATUS_CODES.BAD_REQUEST)
                    .json({
                        message: "Current password is required to set a new password.",
                    });
                return;
            }

            const passwordMatches = await bcrypt.compare(currentPassword, user[0].password);

            if (!passwordMatches) {
                res
                    .status(HTTP_STATUS_CODES.UNAUTHORIZED)
                        .json({
                        message: "Current password is incorrect.",
                    });
                return;
            }

            const hashedPassword = await bcrypt.hash(newPassword, HASH_ROUNDS);
            updatePayload.password = hashedPassword;
        }

        const updated = await updateUser({ uid }, updatePayload);

        if (!updated) {
            res
                .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
                .json({
                    message: `Failed updating user ${email}.`,
                });
            return;
        }

        res
            .status(HTTP_STATUS_CODES.SUCCESS)
            .json({
                message: `User ${email} updated successfully.`,
            });
    } catch (error) {
        res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            message: error instanceof Error
                ? error.message
                : `Failed updating user ${req.body.email}.`,
        });
    }
}