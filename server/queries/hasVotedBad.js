import { query } from '.';

const SELECT_BAD_BOI_VOTE = "SELECT EXISTS (SELECT 1 FROM bad_boi_points WHERE user_ip=$1 AND report_id=$2 LIMIT 1);";

const hasVotedBad = async (ip, reportId) => {
    const { rows } = await query(SELECT_BAD_BOI_VOTE, [ip, reportId]);
    const badBoiVote = rows[0].exists;
    return badBoiVote;
};

export {
    hasVotedBad
};