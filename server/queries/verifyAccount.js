import { query } from './index';

const IS_VERIFICATION_CODE_VALID = "SELECT exists (SELECT 1 FROM user_accounts WHERE user_name=$1 AND (verification_code=$2 OR (verification_code=0 AND verified=true)) LIMIT 1);";

const VERIFY_ACCOUNT = "UPDATE user_accounts SET verification_code=0, verified=true WHERE user_name=$1 RETURNING user_name, verified;";

const verifyAccount = async (username, verificationCode) => {
    const codeIsValid = await query(IS_VERIFICATION_CODE_VALID, [username, verificationCode]).then(res => res.rows[0].exists);
    if (codeIsValid) {
        const verifiedAccount = await query(VERIFY_ACCOUNT, [username]).then(res => res.rows[0]);
        return verifiedAccount;
    } else {
        return { codeIsValid };
    }
}

export {
    verifyAccount
};