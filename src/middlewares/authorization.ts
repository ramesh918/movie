import { Request, Response, NextFunction } from "express";
export default function authorization(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("you are in authorization")
 
     const role = (req as any).user.role
     console.log("role", role)
     if(role === "admin")
     {
        next()
     }
     else
     {
        return res.status(401).send({message : "You are not authorized do this operation"});
     }
  

}