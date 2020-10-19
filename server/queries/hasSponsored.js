import { query } from '.';

const GET_CURRENT_SPONSOR_ARRAY = "SELECT * FROM player_reports WHERE id=$1 LIMIT 1;";

const hasSponsored = async (ip, reportId, instance) => {
    const instanceArrayString = await query(GET_CURRENT_SPONSOR_ARRAY, [ reportId ]).then(res => {
        return res.rows[0][instance];
    });
    
    if (instanceArrayString) {
        const instanceArray = JSON.parse(instanceArrayString);
        return instanceArray.includes(ip);
    } else {
        return false;
    }
};

export {
    hasSponsored
};