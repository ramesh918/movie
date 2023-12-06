import { Request, Response, NextFunction } from "express";


interface User {
    // Define properties as per your user object
    role: string;
    id: string;
    email: string;
    // Add other properties if needed
}
interface AuthRequest extends Request {
    user: User;
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
