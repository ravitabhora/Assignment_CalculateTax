# NodeAssignment
This is a sample Node.JS application for tax calculation and generating the slips.

Requirement:

When a user input’s the employee's details: first name, last name, annual salary (natural numbers) and super rate (0% - 12% inclusive), payment start date, the program should generate payslip information with name, pay period, gross income, income tax, net income and superannuation.

Following calculation for a calendar month is implemented:

* pay period = per calendar month
* gross-income = annual-salary / 12 months
* income-tax = based on the tax table provided.
* net-income = gross-income - income-tax
* super = gross-income x super-rate

Note: All calculation results are rounded to the whole dollar. If >= 50 cents round up to the next dollar increment, otherwise round down.


Following assumptions are made to make the program work.

* The tax slabs are stored in a JSON file, placed at the root with the name "taxSlabs.json".
* The upper limit to the end tax slab is capped at 9999999.
* In the request object only lastname is optional, rest are required.
* There has been no calculation implemented with respect to the pay period, whatever is being received is returned across.
* First name and last name (if available) has to be non-numeric
* Annual salary needs to be a natural number only.
* Super rate can have upto two decimal values.
* More than one employee's details can be submitted at once as the input type is an array and the tax calculation will work accordingly.
* For superRate, the validation does not cover the 2 decimal places as of now.


Instructions on running the application

* Execute command "npm install" in the directory same as of package.json file.

* Once completed, type in "node index.js", the program will start at default port 3000. If required, the port can be replaced to different one as it is present in the config file, placed at root itself.

* Samples of Request and Response are placed in the samples folder.

* Use any rest client and make a Http POST request to the following URL:

http://localhost:3000/taxInformation

* Change the port in the URL as per the config accordingly

Sample Request for 1 employee:

[
	{
		"firstName": "Andrew",
        "lastName": "Smith",
		"annualSalary": 60050,
		"superRate": "9%",
		"paymentStartDate": "01 March – 31 March"
	}
]

Sample Response for the above request:

{
  "statusCode": 200,
  "message": "Tax details",
  "data": [
    {
      "name": "Andrew Smith",
      "pay_period": "01 March – 31 March",
      "gross_income": "5004",
      "income_tax": "922",
      "net_income": "4082",
      "super_amount": "450"
    }
  ]
}


Another Sample with more than 1 employee record:

[
	{
		"firstName": "Andrew",
        "lastName": "Smith",
		"annualSalary": 60050,
		"superRate": "9%",
		"paymentStartDate": "01 March – 31 March"
	},
	{
		"firstName": "Ravita",
		"lastName": "Kamra",
		"annualSalary": "1234567",
		"superRate": "11.99%",
		"paymentStartDate": "01 April – 30 April"
	}
]

Response to the above request:

{
  "statusCode": 200,
  "message": "Tax details",
  "data": [
    {
      "name": "Andrew Smith",
      "pay_period": "01 March – 31 March",
      "gross_income": "5004",
      "income_tax": "922",
      "net_income": "4082",
      "super_amount": "450"
    },
    {
      "name": "Ravita Kamra",
      "pay_period": "01 April – 30 April",
      "gross_income": "102881",
      "income_tax": "44066",
      "net_income": "58815",
      "super_amount": "12335"
    }
  ]
}

Happy Testing :)