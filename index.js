require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser'); // body parser should be passed down to modules such as main.js and password.js

const routes = require('./routes/main');
const passwordRoutes = require('./routes/password');

const app = express();
const port = process.env.PORT || 3000; // || can use the right hand side as a fallback
//console.log(process.env);

// update express settings
app.use(bodyParser.urlencoded({extended: false})); // parse url encoded form data
app.use(bodyParser.json()); // parse json

/// Route Handling
/// Express will handle route requests from top-to-bottom.
/// So, order matters!

// Website Routes
app.use('/', routes);
app.use('/', passwordRoutes);


// test Routes

app.get('/hello-world', (request, response) => {
    console.log(request);
    response.send("Hello World 2");
})

app.get('/test', (request, response) => {
    console.log(request);
    response.send("test");
})

// catch all other routes

app.use((request, response) => {
    response.status(404).json(
        {message: '404 - Not Found', status: 404
    });
});

app.use((error, request, response, next) => {
    console.log(error)
    response.status(error.status || 500).json({
        error: error.message,
        status: 500 // error.status
    });
});

app.listen(port, () => {
    console.log("App is running on PORT=" + port);
})