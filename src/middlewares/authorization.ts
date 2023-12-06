import { Request, Response, NextFunction } from "express";

interface AuthRequest extends Request {
    user: {
        role: string;
        // Add other user properties if needed
    }
}

export default function authorization(
    req: AuthRequest,
    res: Response,
    next: NextFunction
) {
    const { user } = req;
    if (user.role === "admin") {
        next();
    } else {
        return res.status(401).send({ message: "You are not authorized to do this operation" });
    }
}
