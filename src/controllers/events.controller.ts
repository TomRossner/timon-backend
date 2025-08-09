import { Request, Response } from "express";
import { createNewEvent, deleteEvent, findEvent, updateEvent } from "../services/events.service";
import HTTP_STATUS_CODES from "../lib/httpStatusCodes";
import { arrayToObject } from "../lib/arrayToObject";
import { PopulatedEvent } from "../types/populated";

export const getEventHandler = async (req: Request, res: Response) => {
    try {
        const { eventId } = req.query;

        if (!eventId) {
            // Return all events
            const events = await findEvent({});

            res
                .status(HTTP_STATUS_CODES.SUCCESS)
                .json(arrayToObject(events as unknown as PopulatedEvent[], event => event.eventId as string));
            return;
        }

        const event = await findEvent({ eventId });

        if (!event.length) {
            res
                .status(HTTP_STATUS_CODES.NOT_FOUND)
                .json({
                    message: `Event ${eventId} not found.`,
                });
            return;
        }

        res
            .status(HTTP_STATUS_CODES.SUCCESS)
            .json(arrayToObject(event as unknown as PopulatedEvent[], event => event.eventId as string));
    } catch (error) {
        res
            .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
            .json({
                message: error instanceof Error
                    ? error.message
                    : `Failed finding event(s).`,
            });
    }
}

export const createEventHandler = async (req: Request, res: Response) => {
    try {
        const title = req.body.title?.trim();

        const exists = await findEvent({ title });

        if (exists.length) {
            res
                .status(HTTP_STATUS_CODES.BAD_REQUEST)
                .json({
                    message: `Event ${title} already exists.`,
                });
            return;
        }

        const newEvent = await createNewEvent(req.body);

        if (!newEvent) {
            throw new Error(`Failed creating event ${title}.`);
        }

        res
            .status(HTTP_STATUS_CODES.CREATED)
            .json({
                message: `Event ${title} created successfully.`,
            });
    } catch (error) {
        res
            .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
            .json({
                message: error instanceof Error
                    ? error.message
                    : `Failed creating event ${req.body.title}.`,
            });
    }
}

export const updateEventHandler = async (req: Request, res: Response) => {
    try {
        const { eventId } = req.params;
        
        const exists = await findEvent({ eventId });

        if (!exists) {
            res
                .status(HTTP_STATUS_CODES.NOT_FOUND)
                .json({
                    message: `Event ${eventId} not found.`,
                });
            return;
        }

        const updated = await updateEvent({ eventId }, req.body);

        if (!updated) {
            res
                .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
                .json({
                    message: `Failed updating event ${eventId}.`,
                });
            return;
        }

        res
            .status(HTTP_STATUS_CODES.SUCCESS)
            .json({
                message: `Event ${updated.title} updated successfully.`,
            });
    } catch (error) {
        res
            .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
            .json({
                message: error instanceof Error
                    ? error.message
                    : `Failed updating event ${req.body.title}.`,
            });
    }
}

export const deleteEventHandler = async (req: Request, res: Response) => {
    try {
        const { eventId } = req.params;

        const exists = await findEvent({ eventId });
        
        if (!exists) {
            res
                .status(HTTP_STATUS_CODES.NOT_FOUND)
                .json({
                    message: `Event ${eventId} not found.`,
                });
            return;
        }

        const deleted = await deleteEvent(eventId);

        if (!deleted) {
            res
                .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
                .json({
                    message: `Failed deleting event ${eventId}.`,
                });
            return;
        }

        res
            .status(HTTP_STATUS_CODES.SUCCESS)
            .json({
                message: `Event ${eventId} deleted.`,
            });
    } catch (error) {
        res
            .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
            .json({
                message: error instanceof Error
                    ? error.message
                    : `Failed deleting event ${req.params.eventId}.`,
            });
    }
}