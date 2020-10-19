// GET
import { router as report } from './GET/report';
import { router as topTens } from './GET/topTens';
import { router as isEmailTaken } from './GET/isEmailTaken';
import { router as isUsernameTaken } from './GET/isUsernameTaken';
import { router as dashboard } from './GET/dashboard';
import { router as privateBlacklist } from './GET/privateBlacklist';
import { router as logUser } from './GET/logUser';

// POST
import { router as voteGood } from './POST/voteGood';
import { router as voteBad } from './POST/voteBad';
import { router as sponsor } from './POST/sponsor';
import { router as createAccount } from './POST/createAccount';
import { router as login } from './POST/login';
import { router as verifyAccount } from './POST/verifyAccount';
import { router as resendVerificationCode } from './POST/resendVerificationCode';
import { router as resetPassword } from './POST/resetPassword';
import { router as addToPrivateBlacklist } from './POST/addToPrivateBlacklist';
import { router as removeFromPrivateBlacklist } from './POST/removeFromPrivateBlacklist';

const BASE_PATH = '/api';

const mountRoutes = app => {
    //GET
    app.use(`${BASE_PATH}/report`, report);

    app.use(`${BASE_PATH}/summary`, topTens);

    app.use(`${BASE_PATH}/account`, isEmailTaken);
    app.use(`${BASE_PATH}/account`, isUsernameTaken);

    app.use(`${BASE_PATH}/dashboard`, dashboard);

    app.use(`${BASE_PATH}/blacklist`, privateBlacklist);

    app.use(`${BASE_PATH}/logging/user`, logUser);

    //POST
    app.use(`${BASE_PATH}/vote/good`, voteGood);
    app.use(`${BASE_PATH}/vote/bad`, voteBad);

    app.use(`${BASE_PATH}/sponsor`, sponsor);

    app.use(`${BASE_PATH}/account`, createAccount);
    app.use(`${BASE_PATH}/account`, login);
    app.use(`${BASE_PATH}/account`, verifyAccount);
    app.use(`${BASE_PATH}/account`, resendVerificationCode);
    app.use(`${BASE_PATH}/account`, resetPassword);

    app.use(`${BASE_PATH}/blacklist`, addToPrivateBlacklist);
    app.use(`${BASE_PATH}/blacklist`, removeFromPrivateBlacklist);
}

export {
    mountRoutes
};