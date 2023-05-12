const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

const { username, password, dbName } = require('./config.json');

const app = express();
const port = 8888;

app.use(cors());
app.use(express.json());

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

const URL = `mongodb+srv://${username}:${password}@${dbName}.ezaqpru.mongodb.net/?retryWrites=true&w=majority`;
mongoose
    .connect(URL)
    .then(() => console.log('Connected to Mongo'))
    .catch(() => console.log('Failed to Connect'));