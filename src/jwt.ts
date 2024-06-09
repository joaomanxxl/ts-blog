import { NextFunction, Request, Response } from "express";
import { sign, verify } from "jsonwebtoken";
import { User } from "./modules/users/models/User";

export function generateAccessToken(username: string): string {
    return sign(username, process.env.TOKEN_SECRET);
}

export function authenticateToken(request: Request, response: Response, next: NextFunction) {
    const token = request.headers['authorization'].split(' ')[1];

    if (!token) {
        return response.status(401).json({ error: "Not authorized" });
    }

    verify(token, process.env.TOKEN_SECRET, (error: Error, user: User) => {
        if (error) {
            return response.status(403).json({ error: "Invalid token" });
        }

        request.user = user;

        next();
    });
}