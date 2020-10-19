import { query } from './index';

const GET_VERIFICATION_CODE_AND_EMAIL = "SELECT verification_code, email, verified FROM user_accounts WHERE user_name=$1 LIMIT 1";

const getVerificationCodeAndEmail = async username => {
    const verificationCodeAndEmail = await query(GET_VERIFICATION_CODE_AND_EMAIL, [username]).then(res => res.rows[0]);
    return verificationCodeAndEmail;
};

export {
    getVerificationCodeAndEmail
};