import { Request, Response } from "express";

import { IndexUserUseCase } from "./IndexUserUseCase";
import { User } from "../../models/User";

export class IndexUserController {
    constructor(private indexUserUseCase: IndexUserUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { username } = request.params;

        return await this.indexUserUseCase.execute(username)
                .then(user => response.status(200).json({ user: this.serialize(user) }))
                .catch(() => response.status(404).json({ error: "User not found" }));
    }

    private serialize(user: User): object {
        return {
            _id: user._id,
            username: user.username,
            password: user.password,
            created_at: user.created_at,
            token: user.token
        }
    }
}