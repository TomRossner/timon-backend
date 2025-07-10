import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";
import HTTP_STATUS_CODES from "../lib/httpStatusCodes";

export const validate = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse({
        body: req.body,
    });

    if (!result.success) {
        console.log(result.error)
        res
            .status(HTTP_STATUS_CODES.BAD_REQUEST)
            .json({
                message: result.error.message,
            });
        return;
    }

    next();
}