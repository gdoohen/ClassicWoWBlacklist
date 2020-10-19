import passwordGenerator from 'generate-password';
import bcrypt from 'bcrypt';

import { query } from './index';

const RESET_PASSWORD = "UPDATE user_accounts SET password=$2 WHERE email=$1 RETURNING user_name, email;";

const resetPassword = async email => {
    const newPassword = passwordGenerator.generate({
        length: 12,
        numbers: true,
        excludeSimilarCharacters: true,
        strict: true
    });

    const hashedNewPassword = bcrypt.hashSync(newPassword, 12);
    const updatedAccount = await query(RESET_PASSWORD, [ email.toLowerCase(), hashedNewPassword ])
        .then(res => res.rows[0])
        .catch(err => err);

   return { account: updatedAccount, newPassword };
};

export {
    resetPassword
};