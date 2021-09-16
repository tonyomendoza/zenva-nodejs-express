const { response } = require('express');
const express = require('express');

const app = express();
const port = 3000;

app.get('/', (request, response) => {
    console.log(request);
    response.send("Hello World");
})

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