import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const validateRequest = (schema: Joi.ObjectSchema, property: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const requestProperty = property as keyof typeof req;
    const { error } = schema.validate(req[requestProperty]);
    const valid = error == null;
    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(',');
      console.log('error', message);
      res.status(422).json({
        success: false,
        message,
      });
    }
  };
};

export default validateRequest;
