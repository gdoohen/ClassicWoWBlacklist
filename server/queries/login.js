import bcrypt from 'bcrypt';

import { query } from './index';

const ARE_LOGIN_CREDENTIALS_VALID = "SELECT password, verified, banned, ips FROM user_accounts WHERE user_name=$1 LIMIT 1;";

const UPDATE_USER_ANAYLTICS = "UPDATE user_accounts SET last_login=(now() AT TIME ZONE 'UTC'), ips=$2, visits=user_accounts.visits + 1 WHERE user_name=$1 RETURNING user_name, ips, last_login;"

const login = async (username, password, ip) => {
    const response = await query(ARE_LOGIN_CREDENTIALS_VALID, [username]).then(res => res.rows[0]);

    if (response === undefined) {
        return { username: "invalid" };
    }

    const hashedPassword = response ? response.password : { response };
    const isPasswordValid = bcrypt.compareSync(password, hashedPassword);
    const { banned, verified, ips } = response;

    if (isPasswordValid === true) updateAnalytics(username, JSON.parse(ips), ip);

    return { isPasswordValid, verified, banned };
};

const updateAnalytics = async(username, ips, ip) => {
    if (!ips.includes(ip)) {
        ips.push(ip);
    }

    query(UPDATE_USER_ANAYLTICS, [ username, JSON.stringify(ips) ]).then(res => res.rows[0]);
};

export {
    login
};