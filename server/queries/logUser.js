import { query } from './index';

const UPSERT_IP_LAST_LOGIN = `
    INSERT INTO users (ip)
    VALUES ($1)
    ON CONFLICT (ip)
    DO UPDATE
    SET last_login=(now() AT TIME ZONE 'UTC'), visits=users.visits + 1
    RETURNING last_login;
`;

const logUser = async (ip) => {
    query(UPSERT_IP_LAST_LOGIN, [ ip ]).then(res => res.rows[0]);
};

export {
    logUser
};