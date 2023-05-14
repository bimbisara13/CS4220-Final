const router = require('express').Router();

const db = require('../db');
const tvmaze = require('../../tvmaze-api');

// GET /search
router.get('/', async (req, res) => {
    try {
        const { q } = req.query;
        const searchResults = await tvmaze.getShowList(q);

        const response = {
            searchTerm: q,
            results: searchResults.map(result => ({
                display: result.show.name,
                id: result.show.id.toString()
            }))
        }

        res.json(response);

        await db.connect();
        const historyCollection = db.get('History');

        const existingSearch = await historyCollection.findOne({ searchTerm: q });

        if (existingSearch) {
            await db.update('History', q);
        } else {
            await db.save('History', {
                searchTerm: q.toLowerCase(),
                searchCount: 1,
                lastSearched: new Date(),
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'An error occured while performing the search'
        })
    }
});

// GET /search/:id/details
router.get('/:id/details', async (req, res) => {
    try {
        const { q } = req.query
        const { id } = req.params;

        const response = await tvmaze.getShowById(id);

        res.json({ response });

        await db.connect();
        const historyCollection = db.get('History');

        const existingSearch = await historyCollection.findOne({ searchTerm: q });

        if (existingSearch) {
            await historyCollection.findOneAndUpdate(
                { searchTerm: q },
                {
                    $push: {
                        selections: {
                            id: response.id,
                            display: response.name
                        }
                    }
                }
            );
        } else {
            await db.save('History', {
                searchTerm: q.toLowerCase(),
                searchCount: 1,
                lastSearched: new Date(),
            });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'An error occured while performing the search'
        })
    }
});

module.exports = router;