const { body, validationResult } = require("express-validator")
const validate = {}

validate.userInformation = () => {
    return [
        // First name is required and must be string
        body("firstName")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 1 })
        .withMessage("Please provide a First name."),

        // Last Name is required and must be string
        body("lastName")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 2 })
        .withMessage("Please provide a last name."),

        // User Name is required and must be string
        body("userName")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 8 })
        .withMessage("Please provide a user name with minimum of 8 characters."),

        // role is not required, as it will default to basic
        body("role")
        .optional({ nullable: true, checkFalsy: true })
        .trim()
        .escape()
        .isIn(['basic', 'advanced', 'admin'])
        .withMessage("Please provide a proper priority(basic, advanced, admin)."),
    ]
}

validate.userUpdateInformation = () => {
    return [
        // First name is not required while updating and must be string
        body("firstName")
        .optional()
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 1 })
        .withMessage("Please provide a First name."),

        // Last Name is not required while updating and must be string
        body("lastName")
        .optional()
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 2 })
        .withMessage("Please provide a last name."),

        // User Name is not required while updating and must be string
        body("userName")
        .optional()
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 8 })
        .withMessage("Please provide a user name with minimum of 8 characters."),

        // role is not required while updating
        body("role")
        .optional()
        .trim()
        .escape()
        .isIn(['basic', 'advanced', 'admin'])
        .withMessage("Please provide a proper priority(basic, advanced, admin)."),
    ]
}

// middleware to check validation results
validate.userResult = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

module.exports = validate