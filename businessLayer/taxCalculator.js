const dal = require('../dal');//import data access layer

async function computeTax(employeeDetails) {
    //fetch tax slabs from the data access layer
    const taxSlabs = await dal.fetchTaxSlabs();
    let returnObj = [];

    //check if the data access layer returned an error
    if ((typeof taxSlabs) === 'object' && taxSlabs == null) {
        //in case of error, return error response.
        returnObj = {
            error: 'Tax slabs not available'
        };
        return returnObj;
    }
    const promises = [];

    //iterate over employees and prepare a promise for asynchronous execution
    employeeDetails.forEach(async (employee) => {
        promises.push(calculateTaxV1(employee, taxSlabs));
    });

    return Promise.all(promises).then((success) => {
        return success;
    }, (failure) => {
        console.log(failure); //log the failure reason to console
        return {
            error: 'Cannot compute tax, invalid input!'
        };
    });
};

function calculateTaxV1(employeeDetail, taxSlabs) {
    return new Promise((resolve, reject) => {

        try {
            //fetch tax slab on the basis on employee's annual salary
            var taxForThisEmployee = taxSlabs.filter(f => employeeDetail.annualSalary >= f.min_amount && employeeDetail.annualSalary <= f.max_amount)[0]

            if (taxForThisEmployee === undefined || (typeof taxForThisEmployee) === 'undefined') {
                reject(new Error("Invalid input"));
            }

            //calcuate tax and other related nodes
            const minAmountConsideration = taxForThisEmployee.min_amount > 0 ? taxForThisEmployee.min_amount - 1 : 0;
            const grossIncome = (employeeDetail.annualSalary / 12);
            const incomeTax = taxForThisEmployee.flat_amount + ((employeeDetail.annualSalary - minAmountConsideration) * (taxForThisEmployee.tax_rate / 100));
            const incomeTaxPerMonth = (incomeTax / 12);
            const netIncome = grossIncome - incomeTaxPerMonth;
            const superAmount = (grossIncome * parseFloat(employeeDetail.superRate.replace("%", ""))) / 100;

            //return the output
            let retVal = {
                name: getEmployeeName(employeeDetail.firstName, employeeDetail.lastName),
                pay_period: employeeDetail.paymentStartDate,
                gross_income: (grossIncome).toFixed(),
                income_tax: (incomeTaxPerMonth).toFixed(),
                net_income: (netIncome).toFixed(),
                super_amount: (superAmount).toFixed()
            };

            //resolve the promise as everything went smooth
            resolve(retVal);
        } catch (error) {
            //reject the promise because of the error
            reject(new Error("Invalid input"));
        }
    });
}
//function to prepare the employee name for the response
function getEmployeeName(fName, lName) {
    let eName = '';
    if (fName && fName.length > 0) {
        eName = (fName).trim(); 
    }
    if (lName && lName.length > 0) {
        eName += ' ' + (lName).trim(); 
    }
    return eName;
}

module.exports.computeTax = computeTax; 