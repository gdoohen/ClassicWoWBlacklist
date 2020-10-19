import { getPrivateBlacklistByUsername } from '../../queries/';
import { isTokenValid } from '../../utils/userAuthentication';

const router = require('express-promise-router')();

router.get('/:token', async (req, res) => {
    const { token } = req.params;

    const validatedToken = await isTokenValid(token);
    if (!validatedToken.isValid) {
        res.status(401).json({ token: "invalid" });
        return;
    }

    const blacklist = await getPrivateBlacklistByUsername(validatedToken.username);

    if (blacklist.constraint) {
        res.status(400).json({ blacklistId: "invalid" }); //Shouldn't ever happen since the username was validated by token
    } else {
        res.json(blacklist);
    }
});

export {
    router
};