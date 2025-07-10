import { Request, Response } from "express";
import { createNewPlayer, deletePlayer, findPlayer, updatePlayer } from "../services/players.service";
import HTTP_STATUS_CODES from "../lib/httpStatusCodes";
import { v4 as uuid } from "uuid";
import { arrayToObject } from "../lib/arrayToObject";
import { PopulatedPlayer } from "../types/populated";
import { findUser } from "../services/users.service";

export const getPlayerHandler = async (req: Request, res: Response) => {
    try {
        const { id } = req.query;

        if (!id) {
            // Return all players
            const players = await findPlayer({});

            res
                .status(HTTP_STATUS_CODES.SUCCESS)
                .json(arrayToObject(players as unknown as PopulatedPlayer[], (player: PopulatedPlayer) => player.user.uid));
            return;
        }

        const player = await findPlayer({ user: id });

        if (!player) {
            res
                .status(HTTP_STATUS_CODES.NOT_FOUND)
                .json({
                    message: `Player ${id} not found.`,
                });
            return;
        }

        res
            .status(HTTP_STATUS_CODES.SUCCESS)
            .json(arrayToObject(player as unknown as PopulatedPlayer[], (player: PopulatedPlayer) => player.user.uid));
    } catch (error) {
        res
            .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
            .json({
                message: error instanceof Error
                    ? error.message
                    : `Failed finding player(s).`,
            });
    }
}

export const createPlayerHandler = async (req: Request, res: Response) => {
    try {
        const { user: _id } = req.body;

        const exists = await findPlayer({ user: _id });
        console.log(exists)

        if (exists.length) {
            res
                .status(HTTP_STATUS_CODES.BAD_REQUEST)
                .json({
                    message: `Player ${_id} already exists.`,
                });
            return;
        }

        const newPlayer = await createNewPlayer({
            ...req.body,
        });

        if (!newPlayer) {
            throw new Error(`Failed creating player ${_id}.`);
        }

        res
            .status(HTTP_STATUS_CODES.CREATED)
            .json({
                message: `Player ${_id} created successfully.`,
            });
    } catch (error) {
        res
            .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
            .json({
                message: error instanceof Error
                    ? error.message
                    : `Failed creating player ${req.body._id}.`,
            });
    }
}

export const updatePlayerHandler = async (req: Request, res: Response) => {
    try {
        const { id: _id } = req.params;
        
        const exists = await findPlayer({ user: _id });

        if (!exists) {
            res
                .status(HTTP_STATUS_CODES.NOT_FOUND)
                .json({
                    message: `Player ${_id} not found.`,
                });
            return;
        }

        const updated = await updatePlayer({ user: _id }, req.body);

        if (!updated) {
            res
                .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
                .json({
                    message: `Failed updating player ${_id}.`,
                });
            return;
        }

        res
            .status(HTTP_STATUS_CODES.SUCCESS)
            .json({
                message: `Player ${_id} updated successfully.`,
            });
    } catch (error) {
        res
            .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
            .json({
                message: error instanceof Error
                    ? error.message
                    : `Failed updating player ${req.body.user.uid}.`,
            });
    }
}

export const deletePlayerHandler = async (req: Request, res: Response) => {
    try {
        const { id: _id } = req.params;

        const exists = await findPlayer({ user: _id });
        
        if (!exists) {
            res
                .status(HTTP_STATUS_CODES.NOT_FOUND)
                .json({
                    message: `Player ${_id} not found.`,
                });
            return;
        }

        const deleted = await deletePlayer(_id);

        if (!deleted) {
            res
                .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
                .json({
                    message: `Failed deleting player ${_id}.`,
                });
            return;
        }

        res
            .status(HTTP_STATUS_CODES.SUCCESS)
            .json({
                message: `Player ${_id} deleted.`,
            });
    } catch (error) {
        res
            .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
            .json({
                message: error instanceof Error
                    ? error.message
                    : `Failed deleting player ${req.params.playerId}.`,
            });
    }
}