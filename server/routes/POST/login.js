import { login } from '../../queries/';
import { generateToken, isTokenValid } from '../../utils/userAuthentication';

const router = require('express-promise-router')();

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const { clientIp } = req;

    const loginResponse = await login(username.toLowerCase(), password, clientIp);

    const { isPasswordValid, verified, banned } = loginResponse;
    if (isPasswordValid === true && verified === true && banned === false) {
        loginResponse.token = generateToken(username);
    } else if (loginResponse.constraint) {
        res.status(500);
    } else {
        res.status(400);
    }

    res.json(loginResponse);
});

router.post('/login/token', async (req, res) => {
    const { token } = req.body;

    const validatedToken = await isTokenValid(token);

    if (!validatedToken.isValid) {
        res.status(400);
    }

    res.json(validatedToken);
});

export {
    router
};