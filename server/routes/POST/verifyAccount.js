import { verifyAccount } from '../../queries/';

const router = require('express-promise-router')();

router.post('/verify/:username', async (req, res) => {
    const { username } = req.params;
    const { verificationCode } = req.body;

    const verifyResponse = await verifyAccount(username.toLowerCase(), verificationCode);

    if (verifyResponse.codeIsValid === false) {
        res.status(409).json({ codeIsValid: verifyResponse.codeIsValid });
    } else {
        res.json(verifyResponse);
    }
});

export {
    router
};