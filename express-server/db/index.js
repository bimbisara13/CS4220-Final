const { MongoClient } = require('mongodb');

const config = require('../config.json');

const mongo = () => {
    const mongoURL = `mongodb+srv://${config.username}:${config.password}@${config.dbName}.ezaqpru.mongodb.net/?retryWrites=true&w=majority`;
    let db = null;

    async function connect() {
        try {
            const client = new MongoClient(mongoURL);
            await client.connect();

            db = client.db();

            console.log('Connected to MongoDB');
        } catch (error) {
            console.log(error);
        }
    }

    function get(collectionName) {
        return db.collection(collectionName);
    }


    async function save(collectionName, data) {
        try {
            const collection = db.collection(collectionName);
            await collection.insertOne(data);
        } catch (error) {
            console.log(error);
        }
    }

    async function update(collectionName, searchTerm) {
        try {
            const collection = db.collection(collectionName);
            await collection.updateOne(
                { searchTerm },
                {
                    $set: { lastSearched: new Date() },
                    $inc: { searchCount: 1 }
                }
            );
        } catch (error) {
            console.log(error);
        }
    }

    return {
        connect,
        get,
        save,
        update
    };
}

module.exports = mongo();