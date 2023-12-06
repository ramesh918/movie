import { Request, Response, NextFunction } from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";

// Define the structure of your user object
interface User {
    // Define properties as per your user object
    role: string;
    id: string;
    email: string;
    // Add other properties if needed
}

// Secret key for JWT
const JWT_SECRET = "your-secret-key"; // Replace with a strong secret key

interface AuthRequest extends Request {
    user?: User; // Attach the defined user structure to the request
}

export default function authenticateToken(
    req: AuthRequest,
    res: Response,
    next: NextFunction
) {
    const token = req.headers.authorization;

    console.log(token);
    if (!token) {
        return res.status(401).send({ message: "You are not authenticated" });
    }

    // Verify the token using your secret key
    jwt.verify(token, JWT_SECRET, (err: VerifyErrors | null, decoded) => {
        if (err || !decoded) {
            return res.status(403).send("Forbidden");
        }
        
        // Cast decoded data to your User interface
        const user: User = decoded as User;

        // Attach the user data to the request
        req.user = user;
        next();
    });
}
