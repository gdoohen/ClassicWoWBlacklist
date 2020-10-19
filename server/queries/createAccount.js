import bcrypt from 'bcrypt';
import { sendAccountVerificationEmail } from '../utils/email';

import { query } from '.';

const CREATE_ACCOUNT = "INSERT INTO user_accounts (user_name, password, email, verification_code) VALUES ($1, $2, $3, $4) RETURNING id, blacklist_id;";

const CREATE_PRIVATE_BLACKLIST = "INSERT INTO private_blacklists (id) VALUES ($1) returning id";

const DELETE_ACCOUNT = "DELETE FROM user_accounts WHERE user_name=$1;";

//TODO: Set ips to be [ip] on create (contain ip used to create account)
const createAccount = async (username, password, email) => {
    const hashedPassword = await bcrypt.hashSync(password, 12);
    const verificationCode = Math.ceil((Math.random() * (999999 - 100000) + 100000));

    const account = await query(CREATE_ACCOUNT, [ username.toLowerCase(), hashedPassword, email.toLowerCase(), verificationCode ])
        .then(res => res.rows[0])
        .catch(err => err);

    if (account.constraint) {
        return account;
    }

    const { blacklist_id } = account;
    const privateBlacklist = await query(CREATE_PRIVATE_BLACKLIST, [ blacklist_id ]).then(res => res.rows[0]);

    const verificationEmailResponse = await sendAccountVerificationEmail(email, username, verificationCode);

    if (verificationEmailResponse.status === "failed") {
        // No need to delete the privateBlacklist as well, the delete should cascade
        await query(DELETE_ACCOUNT, [ username.toLowerCase() ])
            .then(res => res.rows)
            .catch(err => {
                console.log("Delete Account ERROR - 1337. Failed to delete account after verification email filed to send", err);
            });
    }

    return { account, privateBlacklist, verificationEmailResponse };
}

export {
    createAccount
};