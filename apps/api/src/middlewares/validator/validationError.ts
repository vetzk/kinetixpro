import { NextFunction, Request, Response } from "express";
import { ContextRunner, validationResult } from "express-validator";

export const handleValidationErrors = (validations: ContextRunner[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({
        success: false,
        error: errors,
      });
    }
    next();
  };
};
