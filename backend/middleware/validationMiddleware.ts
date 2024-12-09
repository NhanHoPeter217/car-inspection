import { Request, Response, NextFunction } from "express";
import { body, param, validationResult } from "express-validator";

/**
 * Validation rules for require car name
 */

export const validateCarName = [
  // Validate that `name` is not empty
  body("name").notEmpty().withMessage("Name is required"),
];

/**
 * Valication rules for car id
 */

export const validateCarId = [
  // Validate that `car_id` is an integer
  param("car_id").isInt().withMessage("Car ID must be an integer"),
];

/**
 * Validation rules for updating criteria
 */
export const validateCriteriaUpdate = [
  // Validate that `criteria` is an array with a max length of 5
  body("criteria")
    .isArray({ max: 5 })
    .withMessage("Criteria must be an array."),

  // Validate each criterion in the array
  body("criteria.*.is_good")
    .isBoolean()
    .withMessage("is_good must be a boolean value."),
    
  body("criteria.*.note")
    .if((_, { req }) => {
      // Only require the note if is_good is false
      return req.body.criteria?.some((c: any) => (c.is_good === false && !c.note));
    })
    .notEmpty()
    .withMessage("A note is required if is_good is false."),
];

/**
 * Middleware to check validation errors
 */
export const handleValidationErrors = (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    next();
};
