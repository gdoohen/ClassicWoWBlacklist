import * as axiosMiddleware from './axiosMiddleware';

const PATHS = {
    // GET
    REPORT: "/report",
    TOP_TENS: "/summary/topTens",
    DASHBOARD: "/dashboard",
    BLACKLIST: "/blacklist",
    LOG_USER: "/logging/user",

    // POST
    VOTE_GOOD: "/vote/good",
    VOTE_BAD: "/vote/bad",
    SPONSOR: "/sponsor",
    CREATE_ACCOUNT: "/account/create",
    LOGIN: "/account/login",
    LOGIN_WITH_TOKEN: "/account/login/token",
    VERIFY_ACCOUNT: "/account/verify",
    RESEND_VERIFICATION_CODE: "/account/resendVerification",
    RESET_PASSWORD: "/account/resetPassword",
    ADD_TO_BLACKLIST: "/blacklist/add",
    REMOVE_FROM_BLACKLIST: "/blacklist/remove",
};

// GET
export const getReport = async (region, realm, character) => {
    return axiosMiddleware.getJSON(`${PATHS.REPORT}/${region}/${realm}/${character}`);
};

export const getTopTens = async () => {
    return axiosMiddleware.getJSON(`${PATHS.TOP_TENS}`);
};

export const getDashboardData = async (token) => {
    return axiosMiddleware.getJSON(`${PATHS.DASHBOARD}/${token}`);
};

export const getPrivateBlacklistData = async (blacklistId) => {
    return axiosMiddleware.getJSON(`${PATHS.BLACKLIST}/${blacklistId}`);
};

export const logUser = async () => {
    return axiosMiddleware.getJSON(`${PATHS.LOG_USER}`);
};

// POST
export const voteGood = async (region, realm, character) => {
    return axiosMiddleware.post(`${PATHS.VOTE_GOOD}/${region}/${realm}/${character}`);
};

export const voteBad = async (region, realm, character) => {
    return axiosMiddleware.post(`${PATHS.VOTE_BAD}/${region}/${realm}/${character}`);
};

export const sponsor = async (region, realm, character, instance) => {
    return axiosMiddleware.post(`${PATHS.SPONSOR}/${region}/${realm}/${character}/${instance}`);
};

export const createAccount = async (username, password, email) => {
    return axiosMiddleware.post(`${PATHS.CREATE_ACCOUNT}`, { username, password, email });
};

export const login = async (username, password) => {
    return axiosMiddleware.post(`${PATHS.LOGIN}`, { username, password });
};

export const loginWithToken = async (token) => {
    return axiosMiddleware.post(`${PATHS.LOGIN_WITH_TOKEN}`, { token });
};

export const verifyAccount = async (username, verificationCode) => {
    return axiosMiddleware.post(`${PATHS.VERIFY_ACCOUNT}/${username}`, { verificationCode });
};

export const resendVerificationCode = async (username) => {
    return axiosMiddleware.post(`${PATHS.RESEND_VERIFICATION_CODE}/${username}`);
};

export const resetPassword = async (email) => {
    return axiosMiddleware.post(`${PATHS.RESET_PASSWORD}`, { email });
};

// token: user authenication token
// characterObject: { region, realm, character }
export const addToBlacklist = async (token, characterObject) => {
    return axiosMiddleware.post(`${PATHS.ADD_TO_BLACKLIST}`, { token, characterObject });
};

// token: user authenication token
// characterObject: { region, realm, character }
export const removeFromBlacklist = async (token, characterObject) => {
    return axiosMiddleware.post(`${PATHS.REMOVE_FROM_BLACKLIST}`, { token, characterObject });
};