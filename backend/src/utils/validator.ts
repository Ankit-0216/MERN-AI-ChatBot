import { NextFunction, Request, Response } from "express";
import { ValidationChain, body, validationResult } from "express-validator";

export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    for (let validation of validations) {
      const result = await validation.run(req);
      if (!result.isEmpty()) {
        break;
      }
    }

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    return res.status(422).json({ errors: errors.array() });
  };
};

export const loginValidator = [
  body("email").trim().isEmail().withMessage("Please provide a valid email"),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must contain atleast 6 characters"),
];

export const signUpValidator = [
  body("username").notEmpty().withMessage("Username cannot be empty"),
  ...loginValidator,
];
