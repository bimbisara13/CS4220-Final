const { MongoClient } = require('mongodb');

const config = require('../config.json');

const mongo = () => {
    const mongoURL = `mongodb+srv://${config.username}:${config.password}@${config.dbName}.ezaqpru.mongodb.net/?retryWrites=true&w=majority`;

    async function connect() {
        try {
            const client = new MongoClient(mongoURL);
            await client.connect();

            console.log('Connected to MongoDB');
        } catch (error) {
            console.log(error);
        }
    }

    return { connect };
}

module.exports = mongo();