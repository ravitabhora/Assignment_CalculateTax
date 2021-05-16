const routes = require('express').Router();
const taxValidator = require('../validator/taxInformation');
const taxInformationController = require('../controllers/taxInformation');

routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome!' });
});
routes.post('/taxInformation',taxValidator.taxRequestValidation, taxInformationController.taxCalculator);

module.exports = routes;