import { isTokenValid } from '../../utils/userAuthentication';
import { addToPrivateBlacklist } from '../../queries';

const router = require('express-promise-router')();

router.post('/add', async (req, res) => {
    const { token, characterObject } = req.body;

    const validatedToken = await isTokenValid(token);
    if (!validatedToken.isValid) {
        res.status(401).json({ token: "invalid" });
        return;
    }

    const updatedBlacklist = await addToPrivateBlacklist(validatedToken.username, characterObject);

    if (updatedBlacklist.query === "failed" || updatedBlacklist === null) {
        res.status(400).json({ update: "failed" })
    } else if (updatedBlacklist.duplicate) {
        res.status(400).json({ update: "failed", duplicate: true });
    } else {
        res.json(updatedBlacklist);
    }
});

export {
    router
};