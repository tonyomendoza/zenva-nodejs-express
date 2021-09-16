const express = require('express');
const router = express.Router();

router.get('/', (request, response) => {
    console.log(request);
    response.send("Hello World");
})

router.get('/status', (request, response) => {
    console.log(request);
    //response.cookie('testing', 'test');
    response.status(200).json({
        'message': 'ok',
        status: 200
    });
});

/*router.get('/status2', (request, response) => {
    console.log(request.cookies);
    response.status(200).json({
        'message': 'ok',
        status: 200
    });
});*/

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

router.post('/signup', (request, response, next) => {
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

router.post('/login', (request, response) => {
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


router.post('/logout', (request, response) => {
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


router.post('/token', (request, response) => {
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

module.exports = router;