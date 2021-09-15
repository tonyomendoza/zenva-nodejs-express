const express = require('express');

const appp = express();
const port = 3000;

appp.listen(port, () => {
    console.log("App is running on PORT=" + port);
})