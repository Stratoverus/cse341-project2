const { body, validationResult } = require("express-validator")
const validate = {}

validate.taskInformation = () => {
    return [
        // title is required and must be string
        body("title")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 1 })
        .withMessage("Please provide a title."),

        // description is required and must be string
        body("description")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 2 })
        .withMessage("Please provide a description."),

        // valid due date is required: YYYY-MM-DD
        body("dueDate")
        .trim()
        .isISO8601()
        .withMessage("A valid due date is required(YYYY-MM-DD)."),

        // priority is not required, as it will default to low
        body("priority")
        .optional({ nullable: true, checkFalsy: true })
        .trim()
        .escape()
        .isIn(['low', 'medium', 'high', 'critical'])
        .withMessage("Please provide a proper priority(low, medium, high, critical)."),

        // completed is not required and will default to false
        body("completed")
        .optional({ nullable: true, checkFalsy: true })
        .trim()
        .escape()
        .isBoolean()
        .withMessage("Please a true or false."),

        // Category is required
        body("category")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 3 })
        .withMessage("Please provide a proper category."),
    ]
}

// middleware to check validation results
validate.taskResult = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

module.exports = validate