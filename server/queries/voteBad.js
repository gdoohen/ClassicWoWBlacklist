import { query } from '.';

const INSERT_BAD_BOI_VOTE = "INSERT INTO bad_boi_points (user_ip, report_id) VALUES ($1, $2) RETURNING report_id;";

const voteBad = async (ip, reportId) => {
    const { rows } = await query(INSERT_BAD_BOI_VOTE, [ip, reportId]);
    const badBoiVote = rows[0];
    return badBoiVote;
}

export {
    voteBad
};