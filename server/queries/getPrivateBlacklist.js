import { query } from '.';

const GET_PRIVATE_BLACKLIST_ID = "SELECT blacklist_id as id FROM user_accounts WHERE user_name=$1 LIMIT 1;";

const GET_PRIVATE_BLACKLIST = "SELECT json_array_report_ids as ids FROM private_blacklists WHERE id=$1 LIMIT 1;";

const GET_PLAYER_REPORTS_IN_BLACKLIST = "SELECT id, realm, region, character_name FROM player_reports WHERE id=ANY($1::int[]);"

const GET_USERNAME = "SELECT user_name FROM user_accounts WHERE blacklist_id=$1 LIMIT 1;"

const getPrivateBlacklistById = async (blacklistId, username = "") => {
    const currentBlacklistString = await query(GET_PRIVATE_BLACKLIST, [blacklistId])
        .then(res => res.rows[0].ids)
        .catch(err => err);
    
    if (currentBlacklistString.constraint) {
        return currentBlacklistString;
    }

    const blacklist = JSON.parse(currentBlacklistString);

    const playerReports = await query(GET_PLAYER_REPORTS_IN_BLACKLIST, [ blacklist ]).then(res => res.rows);

    if (username.length === 0) {
        username = await query(GET_USERNAME, [ blacklistId ]).then(res => res.rows[0].user_name);
    }

    return { playerReports, blacklistId, username };
};

const getPrivateBlacklistByUsername = async (username) => {
    const blacklistId = await query(GET_PRIVATE_BLACKLIST_ID, [ username.toLowerCase() ]).then(res => res.rows[0].id);

    return getPrivateBlacklistById(blacklistId, username);
};

export {
    getPrivateBlacklistById,
    getPrivateBlacklistByUsername
};