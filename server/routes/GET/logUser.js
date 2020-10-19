import { logUser } from '../../queries/';

const router = require('express-promise-router')();

router.get('/', (req, res) => {
    const { clientIp } = req;

    logUser(clientIp);

    res.json({ logged: true });
});

export {
    router
};