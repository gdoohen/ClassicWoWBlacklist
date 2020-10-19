import { isTokenValid } from '../../utils/userAuthentication';
import { removeFromPrivateBlacklist } from '../../queries';

const router = require('express-promise-router')();

router.post('/remove', async (req, res) => {
    const { token, characterObject } = req.body;

    const validatedToken = await isTokenValid(token);
    if (!validatedToken.isValid) {
        res.status(401).json({ token: "invalid" });
        return;
    }

    const updatedBlacklist = await removeFromPrivateBlacklist(validatedToken.username, characterObject);

    if (updatedBlacklist.query === "failed") {
        res.status(400).json({ update: "failed" })
    } else {
        res.json(updatedBlacklist);
    }
});

export {
    router
};