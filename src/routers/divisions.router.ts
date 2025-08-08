import { Router } from "express";
import { validate } from "../middleware/validate.middleware";
import { createDivisionSchema } from "../schemas/createDivision.validation";
import { createDivisionHandler, deleteDivisionHandler, getDivisionHandler, updateDivisionHandler } from "../controllers/divisions.controller";
import { updateDivisionSchema } from "../schemas/updateDivision.validate";

const divisionsRouter = Router();

divisionsRouter.get('/', getDivisionHandler);
divisionsRouter.post('/', validate(createDivisionSchema), createDivisionHandler);
divisionsRouter.put('/:division', validate(updateDivisionSchema), updateDivisionHandler);
divisionsRouter.delete('/:division', deleteDivisionHandler);

export default divisionsRouter;