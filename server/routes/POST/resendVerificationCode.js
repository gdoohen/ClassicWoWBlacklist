import { getVerificationCodeAndEmail } from '../../queries/';

import { sendAccountVerificationEmail } from '../../utils/email';

const router = require('express-promise-router')();

router.post('/resendVerification/:username', async (req, res) => {
    const { username } = req.params;

    const verificationCodeAndEmail = await getVerificationCodeAndEmail(username.toLowerCase());
    const { email, verificationCode, verified } = verificationCodeAndEmail;

    if (verified) {
        res.status(400).json({ verified });
        return;
    }

    const emailSent = sendAccountVerificationEmail(email, username, verificationCode);

    res.json(emailSent);
});

export {
    router
};