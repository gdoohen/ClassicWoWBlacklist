import { query } from './index';

const IS_USERNAME_TAKEN = "SELECT exists (SELECT 1 FROM user_accounts WHERE user_name=$1 LIMIT 1);";

const isUsernameTaken = async username => {
    const { rows } = await query(IS_USERNAME_TAKEN, [username]);
    const exists = rows && rows[0].exists;
    return exists;
}

export {
    isUsernameTaken
};