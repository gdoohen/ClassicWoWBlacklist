import { createAccount } from '../../queries/';

const router = require('express-promise-router')();

const UNIQUE_KEY_CONSTRAINT_VIOLATION_REGEX = /player_accounts_(.*?)_key/gi;

router.post('/create', async (req, res) => {
    const { username, password, email } = req.body;

    if (username === undefined || username.length < 4 || username.length > 20) {
        res.status(400).json({ username: "invalid" });
        return;
    } else if (password === undefined || password.length < 8 || password.length > 32) {
        res.status(400).json({ password: "invalid" });
        return;
    } else if (email === undefined || email.length < 7 || email.length > 40 || !email.includes("@") || !email.includes(".")) {
        res.status(400).json({ email: "invalid" });
        return;
    }

    const response = await createAccount(username, password, email);
    if (response.constraint) {
        const { constraint } = response;
        const match = UNIQUE_KEY_CONSTRAINT_VIOLATION_REGEX.exec(constraint);

        switch (match[1]) {
            case "user_name":
                res.status(409).json({ username: "non-unique", constraint });
                return;
            case "email":
                res.status(409).json({ email: "non-unique", constraint });
                return;
            default:
                console.error("Create Account ERROR - 42");
                res.status(500).json({ constraint });
                return;
        }
    } else if (response.verificationEmailResponse && response.verificationEmailResponse.status === "failed") {
        res.status(400).json({ email: "failed", verificationEmailResponse: response.verificationEmailResponse });
        return;
    } else {
        const { account, privateBlacklist } = response;
    
        if (!account.id || !privateBlacklist.id) {
            res.status(400);
            console.error("Create Account ERROR - 1337. Failed to get account.id or privateBlacklist.id on account create.");
        }
    
        res.json(response);
        return;
    }
});

export {
    router
};