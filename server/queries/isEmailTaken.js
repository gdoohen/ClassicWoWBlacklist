import { query } from './index';

const IS_EMAIL_TAKEN = "SELECT exists (SELECT 1 FROM user_accounts WHERE email=$1 LIMIT 1);";

const isEmailTaken = async email => {
    const { rows } = await query(IS_EMAIL_TAKEN, [email]);
    const exists = rows && rows[0].exists;
    return exists;
}

export {
    isEmailTaken
};