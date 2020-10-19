import { getPrivateBlacklistById } from '../../queries/';

const router = require('express-promise-router')();

router.get('/:blacklistId', async (req, res) => {
    const { blacklistId } = req.params;
    const blacklist = await getPrivateBlacklistById(blacklistId);

    if (blacklist.constrant) {
        res.status(400).json({ blacklistId: "invalid" });
    } else {
        res.json(blacklist);
    }
});

export {
    router
};