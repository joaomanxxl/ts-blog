import { Router } from "express";
import { createUserController } from "../modules/users/cases/createUser";
import { indexUserController } from "../modules/users/cases/indexUser";
import { authenticateToken } from "../jwt";
import { indexUsersController } from "../modules/users/cases/indexUsers";

export const usersRoutes = Router();

usersRoutes.post("/", async (request, response) => {
    return await createUserController.handle(request, response);
});

usersRoutes.get("/", authenticateToken, async (request, response) => {
    return await indexUsersController.handle(response);
});

usersRoutes.get("/:username", authenticateToken, async (request, response) => {
    return await indexUserController.handle(request, response);
});