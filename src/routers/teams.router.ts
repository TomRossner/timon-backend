import { Router } from "express";
import { createTeamHandler, deleteTeamHandler, getTeamHandler, updateTeamHandler } from "../controllers/teams.controller";
import { createTeamSchema } from "../schemas/createTeam.validation";
import { validate } from "../middleware/validate.middleware";
import { updateTeamSchema } from "../schemas/updateTeam.validation";

const teamsRouter = Router();

teamsRouter.get('/', getTeamHandler);
teamsRouter.post('/', validate(createTeamSchema), createTeamHandler);
teamsRouter.put('/:teamId', validate(updateTeamSchema), updateTeamHandler);
teamsRouter.delete('/:teamId', deleteTeamHandler);

export default teamsRouter;