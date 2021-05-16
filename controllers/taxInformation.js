const { validationResult } = require("express-validator");
const commonValidation = require("../helper")
const businessLayer = require('../businessLayer/taxCalculator');

const taxCalculator = async (req, res) => {
    var resMeta = {};
    var statusCode = 200;
    if (Object.keys(req.body).length === 0) {
        resMeta.statusCode = 400;
        resMeta.status = 'Employee details are required';
        resMeta.message = 'Invalid Request.';
        resMeta.error = null;

        //return error details along with 400 status code (Bad Request)
        return res.status(resMeta.statusCode).json(resMeta);
    }

    //validate incoming request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {

        //prepare validation messages
        let errMsg = commonValidation.formatValidationErr(errors.mapped(), true);
        resMeta.statusCode = 400;
        resMeta.status = 'Validation Error';
        resMeta.message = errMsg ? errMsg : 'Invalid Request.';
        resMeta.error = errors;

        //return validation error details along with 400 status code (Bad Request)
        return res.status(resMeta.statusCode).json(resMeta);
    }

    try {
        let _data = req.body;

        //pass the request to the business layer for tax computation
        const resp = await businessLayer.computeTax(_data);

        resMeta.statusCode = statusCode;
        resMeta.message = "Tax details";
        resMeta.data = resp;
        return res.status(resMeta.statusCode).json(resMeta);

    } catch (error) {
        
        console.log(error); //write the error to console

        resMeta.statusCode = 500;
        resMeta.status = 'Server Error';
        resMeta.message = error.message ? error.message : 'Something went wrong!.';
        resMeta.error = error;
        return res.status(resMeta.statusCode).json(resMeta);
    }
}

module.exports.taxCalculator = taxCalculator;