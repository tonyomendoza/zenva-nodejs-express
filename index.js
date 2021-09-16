const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// update express settings
app.use(bodyParser.urlencoded({extended: false})); // parse url encoded form data
app.use(bodyParser.json()); // parse json

/// Route Handling
/// Express will handle route requests from top-to-bottom.
/// So, order matters!

// Website Routes

app.get('/', (request, response) => {
    console.log(request);
    response.send("Hello World");
})

app.get('/status', (request, response) => {
    console.log(request);
    response.status(200).json({
        'message': 'ok',
        status: 200
    });
});

/// Created to test error handling.
/// The real signup route is below. 
/*app.post('/signup', (request, response, next) => {
    //console.log(request);
    next(new Error('test'));
    // response.status(200).json({
    //     'message': 'ok',
    //     status: 200
    // });
});*/

app.post('/signup', (request, response, next) => {
    if(!request.body){
        response.status(400).json({
            message: 'invalid body',
            status: 400
        });
    }
    else {
        response.status(200).json({
            message: 'ok',
            status: 200
        });
    }
});

app.post('/login', (request, response) => {
    if(!request.body){
        response.status(400).json({
            message: 'invalid body',
            status: 400
        });
    }
    else {
        response.status(200).json({
            message: 'ok',
            status: 200
        });
    }
});


app.post('/logout', (request, response) => {
    if(!request.body){
        response.status(400).json({
            message: 'invalid body',
            status: 400
        });
    }
    else {
        response.status(200).json({
            message: 'ok',
            status: 200
        });
    }
});


app.post('/token', (request, response) => {
    if(!request.body || !request.body.refreshToken){
        response.status(400).json({
            message: 'invalid body',
            status: 400
        });
    }
    else {
        const { refreshToken } = request.body;
        response.status(200).json({
            message: `refresh token requested for token: ${refreshToken}`,
            status: 200
        });
    }
});

app.post('/forgot-password', (request, response) => {
    if(!request.body || !request.body.email){
        response.status(400).json({
            message: 'invalid body',
            status: 400
        });
    }
    else {
        const { email } = request.body;
        response.status(200).json({
            message: `forgot password requested for email: ${email}`,
            status: 200
        });
    }
});

app.post('/reset-password', (request, response) => {
    if(!request.body || !request.body.email){
        response.status(400).json({
            message: 'invalid body',
            status: 400
        });
    }
    else {
        const { email } = request.body;
        response.status(200).json({
            message: `password reset requested for email: ${email}`,
            status: 200
        });
    }
});

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

// test Routes

app.get('/hello-world', (request, response) => {
    console.log(request);
    response.send("Hello World 2");
})

app.get('/test', (request, response) => {
    console.log(request);
    response.send("test");
})

app.listen(port, () => {
    console.log("App is running on PORT=" + port);
})