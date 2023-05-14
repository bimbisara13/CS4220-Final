const router = require('express').Router();
const db = require('../db');

// GET /history
router.get('/', async (req, res) => {
    try {
        let query = {};
        const searchTerm = req.query.q;

        await db.connect();
        const historyCollection = db.get('History');

        if (searchTerm) {
            query = { searchTerm: searchTerm.toLowerCase() };
        }

        const history = await historyCollection.find(query).project({ _id: 0 }).toArray();

        res.json(history);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'An error occurred while fetching the history'
        });
    }
});

module.exports = router;
