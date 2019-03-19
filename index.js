const express = require('express');
const db = require('./src/services/db-services');

const app = express();


// Setup server port
const port = process.env.PORT || 8080;


const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
   extended: true
}));
const jsonParser = bodyParser.json()
app.use(jsonParser);



// Send message for default URL
app.get('/', ((req, res) => res.send('Hello World with Express')));

const apiRoutes = require("./src/services/api-routes");

app.use('/api', apiRoutes);




// Launch app to listen to specified port
app.listen(port, function () {
     console.log("Running RestHub on port " + port);
});