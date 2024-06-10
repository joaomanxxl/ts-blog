import { Router } from "express";
import { createUserController } from "../modules/users/cases/createUser";
import { indexUserController } from "../modules/users/cases/indexUser";
import { authenticateToken } from "../jwt";
import { indexUsersController } from "../modules/users/cases/indexUsers";
import { resetUserPasswordController } from "../modules/users/cases/resetUserPassword";
import { deleteUserController } from "../modules/users/cases/deleteUser";

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

usersRoutes.post("/recover", authenticateToken, async (request, response) => {
    return await resetUserPasswordController.handle(request, response);
});

usersRoutes.delete("/:username", authenticateToken, async (request, response) => {
    return await deleteUserController.handle(request, response);
});