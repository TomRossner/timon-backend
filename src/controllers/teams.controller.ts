import { Request, Response } from "express";
import { createNewTeam, deleteTeam, findTeam, updateTeam } from "../services/teams.service";
import HTTP_STATUS_CODES from "../lib/httpStatusCodes";
import { v4 as uuid } from "uuid";
import { arrayToObject } from "../lib/arrayToObject";

export const getTeamHandler = async (req: Request, res: Response) => {
    try {
        const { name, id } = req.query;

        if (!name && !id) {
            // Return all teams
            const teams = await findTeam({});

            res
                .status(HTTP_STATUS_CODES.SUCCESS)
                .json(arrayToObject(teams, team => team!.name));
            return;
        }

        if (name) {
            const REGEX_SPECIAL_CHARS = /[.*+?^${}()|[\]\\]/g;
            const escapeRegex = (str: string) => str.replace(REGEX_SPECIAL_CHARS, '\\$&');
            
            const team = await findTeam({
                name: { $regex: `^${escapeRegex(name.toString())}$`, $options: 'i' },
            });

            if (!team.length) {
                res
                    .status(HTTP_STATUS_CODES.NOT_FOUND)
                    .json({
                        message: `Team ${name} not found.`,
                    });
                return;
            }
            
            res
                .status(HTTP_STATUS_CODES.SUCCESS)
                .json(arrayToObject(team, team => team!.name));
            return;
        }

        const team = await findTeam({ teamId: id });

        if (!team.length) {
            res
                .status(HTTP_STATUS_CODES.NOT_FOUND)
                .json({
                    message: `Team ${id} not found.`,
                });
            return;
        }

        res
            .status(HTTP_STATUS_CODES.SUCCESS)
            .json(arrayToObject(team, team => team!.name));
    } catch (error) {
        res
            .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
            .json({
                message: error instanceof Error
                    ? error.message
                    : `Failed finding team(s).`,
            });
    }
}

export const createTeamHandler = async (req: Request, res: Response) => {
    try {
        const name = req.body.name?.trim();
        
        const REGEX_SPECIAL_CHARS = /[.*+?^${}()|[\]\\]/g;
        const escapeRegex = (str: string) => str.replace(REGEX_SPECIAL_CHARS, '\\$&');
        
        const exists = await findTeam({
            name: { $regex: `^${escapeRegex(name.toString())}$`, $options: 'i' }
        });

        if (exists.length) {
            res
                .status(HTTP_STATUS_CODES.BAD_REQUEST)
                .json({
                    message: `Team ${name} already exists.`,
                });
            return;
        }

        const newTeam = await createNewTeam({
            ...req.body,
            teamId: uuid(),
        });

        if (!newTeam) {
            throw new Error(`Failed creating team ${name}.`);
        }

        res
            .status(HTTP_STATUS_CODES.CREATED)
            .json({
                message: `Team ${name} created successfully.`,
            });
    } catch (error) {
        res
            .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
            .json({
                message: error instanceof Error
                    ? error.message
                    : `Failed creating team ${req.body.name}.`,
            });
    }
}

export const updateTeamHandler = async (req: Request, res: Response) => {
    try {
        const { teamId } = req.params;
        
        const exists = await findTeam({ teamId });

        if (!exists) {
            res
                .status(HTTP_STATUS_CODES.NOT_FOUND)
                .json({
                    message: `Team ${teamId} not found.`,
                });
            return;
        }

        const updated = await updateTeam({ teamId }, req.body);

        if (!updated) {
            res
                .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
                .json({
                    message: `Failed updating team ${teamId}.`,
                });
            return;
        }

        res
            .status(HTTP_STATUS_CODES.SUCCESS)
            .json({
                message: `Team ${updated.name} updated successfully.`,
            });
    } catch (error) {
        res
            .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
            .json({
                message: error instanceof Error
                    ? error.message
                    : `Failed updating team ${req.body.teamId}.`,
            });
    }
}

export const deleteTeamHandler = async (req: Request, res: Response) => {
    try {
        const { teamId } = req.params;

        const exists = await findTeam({ teamId });
        
        if (!exists) {
            res
                .status(HTTP_STATUS_CODES.NOT_FOUND)
                .json({
                    message: `Team ${teamId} not found.`,
                });
            return;
        }

        const deleted = await deleteTeam(teamId);

        if (!deleted) {
            res
                .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
                .json({
                    message: `Failed deleting team ${teamId}.`,
                });
            return;
        }

        res
            .status(HTTP_STATUS_CODES.SUCCESS)
            .json({
                message: `Team ${teamId} deleted.`,
            });
    } catch (error) {
        res
            .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
            .json({
                message: error instanceof Error
                    ? error.message
                    : `Failed deleting team ${req.params.teamId}.`,
            });
    }
}