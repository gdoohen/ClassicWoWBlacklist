import { isUsernameTaken } from '../../queries/';

const router = require('express-promise-router')();

router.get('/isUsernameTaken/:username', async (req, res) => {
    const { username } = req.params;

    const isTaken = await isUsernameTaken(username.toLowerCase());

    res.json({isTaken});
});

export {
    router
};