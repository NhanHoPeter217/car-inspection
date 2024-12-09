"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleValidationErrors = exports.validateCriteriaUpdate = exports.validateCarId = exports.validateCarName = void 0;
const express_validator_1 = require("express-validator");
/**
 * Validation rules for require car name
 */
exports.validateCarName = [
    // Validate that `name` is not empty
    (0, express_validator_1.body)("name").notEmpty().withMessage("Name is required"),
];
/**
 * Valication rules for car id
 */
exports.validateCarId = [
    // Validate that `car_id` is an integer
    (0, express_validator_1.param)("car_id").isInt().withMessage("Car ID must be an integer"),
];
/**
 * Validation rules for updating criteria
 */
exports.validateCriteriaUpdate = [
    // Validate that `criteria` is an array with a max length of 5
    (0, express_validator_1.body)("criteria")
        .isArray({ max: 5 })
        .withMessage("Criteria must be an array."),
    // Validate each criterion in the array
    (0, express_validator_1.body)("criteria.*.is_good")
        .isBoolean()
        .withMessage("is_good must be a boolean value."),
    (0, express_validator_1.body)("criteria.*.note")
        .if((_, { req }) => {
        var _a;
        // Only require the note if is_good is false
        return (_a = req.body.criteria) === null || _a === void 0 ? void 0 : _a.some((c) => (c.is_good === false && !c.note));
    })
        .notEmpty()
        .withMessage("A note is required if is_good is false."),
];
/**
 * Middleware to check validation errors
 */
const handleValidationErrors = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    next();
};
exports.handleValidationErrors = handleValidationErrors;
