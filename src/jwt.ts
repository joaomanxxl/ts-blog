import { NextFunction, Request, Response } from "express";
import { sign, verify } from "jsonwebtoken";

import { User } from "./modules/users/models/User";

export function generateAccessToken(username: string): string {
    return sign(username, process.env.TOKEN_SECRET);
}

export function authenticateToken(request: Request, response: Response, next: NextFunction) {
    let token = request.headers.authorization;

    if (!token) {
        return response.status(401).json({ error: "Not authorized" });
    }

    token = token.split(' ')[1];

    verify(token, process.env.TOKEN_SECRET, (error: Error, user: User) => {
        if (error) {
            return response.status(403).json({ error: "Invalid token" });
        }

        request.user = user;

        next();
    });
}