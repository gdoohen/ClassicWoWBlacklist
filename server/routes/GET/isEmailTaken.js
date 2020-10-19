import { isEmailTaken } from '../../queries/';

const router = require('express-promise-router')();

router.get('/isEmailTaken/:email', async (req, res) => {
    const { email } = req.params;

    const isTaken = await isEmailTaken(email);

    res.json({isTaken});
});

export {
    router
};