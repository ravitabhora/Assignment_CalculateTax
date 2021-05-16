const { body } = require("express-validator");
/*
***
--======incoming request field validation======--
***
*/
const taxRequestValidation = [
    body("*.firstName")
        .not()
        .isEmpty()
        .withMessage("First name is required.")
        .isAlpha()
        .withMessage("First name should be non-numeric.")
        .trim(),
    body("*.lastName")
        .optional()
        .isAlpha()
        .withMessage("last name should be non-numeric.")
        .trim(),
    body("*.annualSalary")
        .not()
        .isEmpty()
        .withMessage("Annual salary is required.")
        .isInt()
        .withMessage("A valid numeric value required"),
    body("*.superRate")
        .not()
        .isEmpty()
        .withMessage("Super rate is required.")
        .custom((value, { req }) => {
            if (!value.match(/^(([0-9]|10|11).((0|[1-9][0-9]*))|([0-9]|10|11)|12)%$/)) {
                throw new Error("Super rate is invalid, it needs to be in range [0-12]");
            }
            return true;
        }),
    body("*.paymentStartDate")
        .not()
        .isEmpty()
        .withMessage("Payment start date is required.")
        .trim(),
];

module.exports = {
    taxRequestValidation
}