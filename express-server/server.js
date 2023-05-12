const express = require('express');
const path = require('path');

const app = express();
const port = 8888;

const mongo = require('./db');

app.listen(port, async () => {
    console.log(`Server is listening on port ${port}`);
    await mongo.connect();
});
