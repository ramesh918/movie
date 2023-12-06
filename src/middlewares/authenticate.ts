import { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";

// Secret key for JWT
const JWT_SECRET = "your-secret-key"; // Replace with a strong secret key

export default function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization;

  console.log(token)
  if (!token) {
    return res.status(401).send({message:"You are not authenticated"});
  }

  // Verify the token using your secret key
  jwt.verify(token, "your-secret-key", (err: any, user: any) => {
    if (err) {
      return res.status(403).send("Forbidden");
    }
    // Attach the user data to the request
    (req as any).user = user;
    next();
  });

}