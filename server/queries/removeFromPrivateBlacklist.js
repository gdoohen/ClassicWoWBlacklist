import pull from 'lodash/pull';

import { query, getReportId } from '.';

const GET_PRIVATE_BLACKLIST_ID = "SELECT blacklist_id as id FROM user_accounts WHERE user_name=$1;";

const GET_PRIVATE_BLACKLIST = "SELECT json_array_report_ids as ids FROM private_blacklists WHERE id=$1;";

const UPDATE_PRIVATE_BLACKLIST = "UPDATE private_blacklists SET json_array_report_ids=$2 WHERE id=$1 RETURNING id";

const removeFromPrivateBlacklist = async (username, characterObject) => {
    const { region, realm, character } = characterObject;
    const blacklistId = await query(GET_PRIVATE_BLACKLIST_ID, [ username.toLowerCase() ]).then(res => res.rows[0].id); //Safe to assume username exists because it should have been retrieved from a validated token

    const currentBlacklistString = await query(GET_PRIVATE_BLACKLIST, [blacklistId]).then(res => res.rows[0].ids);
    const blacklist = JSON.parse(currentBlacklistString);

    const reportId = await getReportId(region, realm, character);
    if (reportId.query === "failed") {
        return reportId;
    }

    pull(blacklist, reportId);

    const updatedBlacklist = await query(UPDATE_PRIVATE_BLACKLIST, [blacklistId, JSON.stringify(blacklist)]).then(res => res.rows[0]);

    return { updatedBlacklist };
}

export {
    removeFromPrivateBlacklist
};