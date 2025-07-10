import { Router } from "express";
import { createPlayerHandler, deletePlayerHandler, getPlayerHandler, updatePlayerHandler } from "../controllers/players.controller";
import { validate } from "../middleware/validate.middleware";
import { createPlayerSchema } from "../schemas/createPlayer.validation";
import { updatePlayerSchema } from "../schemas/updatePlayer.validation";

const playersRouter = Router();

playersRouter.get('/', getPlayerHandler);
playersRouter.post('/', validate(createPlayerSchema), createPlayerHandler);
playersRouter.put('/:id', validate(updatePlayerSchema), updatePlayerHandler);
playersRouter.delete('/:id', deletePlayerHandler);

export default playersRouter;