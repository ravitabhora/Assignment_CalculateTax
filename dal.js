const fs = require('fs');//import the fs package

async function fetchTaxSlabs() {
    try {
        //read json, can be replaced to database if required
        let rawdata = fs.readFileSync('taxSlabs.json');

        //parse JSON
        let taxSlabs = JSON.parse(rawdata).incomeTaxSlabs;

        return taxSlabs;
    } catch (err) {
        console.log(`Error loading Tax Slabs: ${err.message}`);
        return null;
    }
};

module.exports.fetchTaxSlabs = fetchTaxSlabs;