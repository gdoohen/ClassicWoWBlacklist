import { query } from '.';

const SELECT_GOOD_BOI_VOTE = "SELECT EXISTS (SELECT 1 FROM good_boi_points WHERE user_ip=$1 AND report_id=$2 LIMIT 1);";

const hasVotedGood = async (ip, reportId) => {
    const { rows } = await query(SELECT_GOOD_BOI_VOTE, [ip, reportId]);
    const goodBoiVote = rows[0].exists;
    return goodBoiVote;
};

export {
    hasVotedGood
};