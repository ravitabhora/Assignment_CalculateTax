const app = require('express')();
const config = require('./config').appConfig;
const routes = require('./routes');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//  Connect all our routes to our application
app.use('/', routes);

// Turn on that server!
app.listen(config.port, () => {
  console.log(`App is listening on port ${config.port}`);
});