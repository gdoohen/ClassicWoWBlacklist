import { resetPassword } from '../../queries/';

import { sendNewPasswordEmail } from '../../utils/email';

const router = require('express-promise-router')();

router.post('/resetPassword', async (req, res) => {
    const { email } = req.body;

    const updatedAccount = await resetPassword(email);

    if (updatedAccount.constraint || updatedAccount.account === undefined) {
        res.status(400).json({ email: "invalid" });
        return;
    }

    const { newPassword } = updatedAccount;
    const emailSent = sendNewPasswordEmail(email, newPassword);

    if (emailSent.status === "failed") {
        res.status(500).json({ email: "failed to send" });
        return;
    }

    res.json({ account: updatedAccount.account });
});

export {
    router
};