require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser'); // body parser should be passed down to modules such as main.js and password.js
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const routes = require('./routes/main');
const passwordRoutes = require('./routes/password');

// Setup mongo connection
const uri = process.env.MONGO_CONNECTION_URL || process.env.LOCAL_MONGO_CONNECTION_URL;
const mongoConfig = {
    // unsupported options in Mongoose 6.0 https://stackoverflow.com/questions/68958221/mongoparseerror-options-usecreateindex-usefindandmodify-are-not-supported
    /*useNewUrlParser: true,
    useCreateIndex: true,*/
}
if (!process.env.MONGO_CONNECTION_URL && process.env.MONGO_USERNMAME && process.env.MONGO_PASSWORD){
    mongoConfig.auth = { authSource: 'admin' };
    mongoConfig.user = process.env.MONGO_USERNMAME;
    mongoConfig.pass = process.env.MONGO_PASSWORD;
}
mongoose.connect(uri, mongoConfig);

mongoose.connection.on('error', (error)=>{
    console.log(error);
    process.exit(1);
});

const app = express();
const port = process.env.PORT || 3000; // || can use the right hand side as a fallback
//console.log(process.env);

// update express settings
app.use(bodyParser.urlencoded({extended: false})); // parse url encoded form data
app.use(bodyParser.json()); // parse json
app.use(cookieParser());
app.use(cors({credentials: true, origin: process.env.CORS_Origin}));

/// Route Handling
/// Express will handle route requests from top-to-bottom.
/// So, order matters!

// Passport Auth
require('./auth/auth');

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


mongoose.connection.on('connected', () => {
    console.log('connected to mongo')
    app.listen(port, () => {
        console.log("App is running on PORT=" + port);
    })
})