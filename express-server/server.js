const express = require('express');

const app = express();
const port = 8888;

const mongo = require('./db');

const search = require('./routes/search');
app.use('/search', search);

app.listen(port, async () => {
    console.log(`Server is listening on port ${port}`);
    await mongo.connect();
});
