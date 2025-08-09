import { Router } from "express";
import { validate } from "../middleware/validate.middleware";
import { createEventSchema } from "../schemas/createEvent.validation";
import { createEventHandler, deleteEventHandler, getEventHandler, updateEventHandler } from "../controllers/events.controller";
import { updateEventSchema } from "../schemas/updateEvent.validation";

const eventsRouter = Router();

eventsRouter.get('/', getEventHandler);
eventsRouter.post('/', validate(createEventSchema), createEventHandler);
eventsRouter.put('/:eventId', validate(updateEventSchema), updateEventHandler);
eventsRouter.delete('/:eventId', deleteEventHandler);

export default eventsRouter;