import { Router } from "express";
import { validate } from "../middleware/validate.middleware";
import { createUserSchema } from "../schemas/createUser.validation";
import { createMockUsers, createUserHandler, deleteUserHandler, getUserHandler, updateUserHandler } from "../controllers/users.controller";
import { updateUserSchema } from "../schemas/updateUser.validation";

const usersRouter = Router();

usersRouter.get('/', getUserHandler);
usersRouter.get('/create-mock', createMockUsers);
usersRouter.post('/', validate(createUserSchema), createUserHandler);
usersRouter.put('/:uid', validate(updateUserSchema), updateUserHandler);
usersRouter.delete('/:uid', deleteUserHandler);

export default usersRouter;