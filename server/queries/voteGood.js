import { query } from '.';

const INSERT_GOOD_BOI_VOTE = "INSERT INTO good_boi_points (user_ip, report_id) VALUES ($1, $2) RETURNING report_id;";

const voteGood = async (ip, reportId) => {
    const { rows } = await query(INSERT_GOOD_BOI_VOTE, [ip, reportId]);
    const goodBoiVote = rows[0];
    return goodBoiVote;
}

export {
    voteGood
};