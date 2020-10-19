import { Pool } from 'pg';

import { getReport, getReportId } from './report';
import { getTopTens, updateTopTens } from './toptens';

import { getGoodBoiPoints } from './goodBoiPoints';
import { hasVotedGood } from './hasVotedGood';
import { voteGood } from './voteGood';

import { getBadBoiPoints } from './badBoiPoints';
import { hasVotedBad } from './hasVotedBad';
import { voteBad } from './voteBad';

import { hasSponsored } from './hasSponsored';
import { sponsor } from './sponsor';

import { login } from './login';
import { createAccount } from './createAccount';
import { isEmailTaken } from './isEmailTaken';
import { isUsernameTaken } from './isUsernameTaken';
import { verifyAccount } from './verifyAccount';
import { getVerificationCodeAndEmail } from './getVerificationCodeAndEmail';
import { resetPassword } from './resetPassword';

import { getPrivateBlacklistById, getPrivateBlacklistByUsername } from './getPrivateBlacklist';
import { addToPrivateBlacklist } from './addToPrivateBlacklist';
import { removeFromPrivateBlacklist } from './removeFromPrivateBlacklist';

import { logUser } from './logUser';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL || "", //FIXME: Provide Default DB URL
    ssl: true
});

pool.on('error', error => {
    console.log("idle client error", error);
});

const query = async (text, params = []) => {
    return pool.query(text, params).then(res => res);
}

export {
    query,
    getReport,
    getReportId,
    getTopTens,
    updateTopTens,
    getGoodBoiPoints,
    hasVotedGood,
    voteGood,
    getBadBoiPoints,
    hasVotedBad,
    voteBad,
    hasSponsored,
    sponsor,
    login,
    createAccount,
    isEmailTaken,
    isUsernameTaken,
    verifyAccount,
    getVerificationCodeAndEmail,
    resetPassword,
    getPrivateBlacklistById, getPrivateBlacklistByUsername,
    addToPrivateBlacklist,
    removeFromPrivateBlacklist,
    logUser
};
