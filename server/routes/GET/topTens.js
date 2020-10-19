import { getTopTens, updateTopTens } from '../../queries/';

const router = require('express-promise-router')();

router.get('/toptens', async (req, res) => {
    const topTens = await getTopTens();
    res.json(topTens);
});

router.post('/toptens/update', async (req, res) => {
    updateTopTens();
    res.status(200).send("Updated top tens.");
});

export {
    router
};