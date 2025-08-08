import { Request, Response } from "express";
import { createNewDivision, deleteDivision, findDivision, updateDivision } from "../services/divisions.service";
import HTTP_STATUS_CODES from "../lib/httpStatusCodes";
import { arrayToObject } from "../lib/arrayToObject";

export const getDivisionHandler = async (req: Request, res: Response) => {
    try {
        const { name } = req.query;

        if (!name) {
            // Return all divisions
            const divisions = await findDivision({});

            if (!divisions.length) {
                
            }

            res
                .status(HTTP_STATUS_CODES.SUCCESS)
                .json(arrayToObject(divisions, division => division!.name as string));
            return;
        }

        const division = await findDivision({ name });

        if (!division) {
            res
                .status(HTTP_STATUS_CODES.NOT_FOUND)
                .json({
                    message: `Division ${name} not found.`,
                });
            return;
        }

        res
            .status(HTTP_STATUS_CODES.CREATED)
            .json({
                message: `Division ${name} created successfully.`,
            });
    } catch (error) {
        res
            .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
            .json({
                message: error instanceof Error
                    ? error.message
                    : `Failed finding division(s).`,
            });
    }
}
export const createDivisionHandler = async (req: Request, res: Response) => {
    try {
        const { division } = req.body;

        const exists = await findDivision({ name: division });

        if (exists) {
            res
                .status(HTTP_STATUS_CODES.BAD_REQUEST)
                .json({
                    message: `Division ${division} already exists.`,
                });
            return;
        }

        const newDivision = await createNewDivision(division);

        if (!newDivision) {
            throw new Error(`Failed creating division ${division}.`);
        }

        res
            .status(HTTP_STATUS_CODES.CREATED)
            .json({
                message: `Division ${division} created successfully.`,
            });
    } catch (error) {
        res
            .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
            .json({
                message: error instanceof Error
                    ? error.message
                    : `Failed creating division ${req.body.division}.`,
            });
    }
}
export const updateDivisionHandler = async (req: Request, res: Response) => {
    try {
        const { name } = req.params;
        
        const exists = await findDivision({ name });

        if (!exists) {
            res
                .status(HTTP_STATUS_CODES.NOT_FOUND)
                .json({
                    message: `Division ${name} not found.`,
                });
            return;
        }

        const updated = await updateDivision({ name }, req.body);

        if (!updated) {
            res
                .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
                .json({
                    message: `Failed updating division ${name}.`,
                });
            return;
        }

        res
            .status(HTTP_STATUS_CODES.SUCCESS)
            .json({
                message: `Division ${updated.name} updated successfully.`,
            });
    } catch (error) {
        res
            .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
            .json({
                message: error instanceof Error
                    ? error.message
                    : `Failed updating division ${req.body.name}.`,
            });
    }
}

export const deleteDivisionHandler = async (req: Request, res: Response) => {
    try {
        const { name } = req.params;

        const exists = await findDivision({ name });
        
        if (!exists) {
            res
                .status(HTTP_STATUS_CODES.NOT_FOUND)
                .json({
                    message: `Division ${name} not found.`,
                });
            return;
        }

        const deleted = await deleteDivision(name);

        if (!deleted) {
            res
                .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
                .json({
                    message: `Failed deleting division ${name}.`,
                });
            return;
        }

        res
            .status(HTTP_STATUS_CODES.SUCCESS)
            .json({
                message: `Division ${name} deleted.`,
            });
    } catch (error) {
        res
            .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
            .json({
                message: error instanceof Error
                    ? error.message
                    : `Failed deleting division ${req.params.name}.`,
            });
    }
}