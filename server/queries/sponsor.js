import { query } from '.';
import INSTANCES from './instances';

const GET_CURRENT_SPONSOR_ARRAY = instance => {
    return `SELECT ${instance} FROM player_reports WHERE id=$1 LIMIT 1;`;
}

const SPONSOR = instance => {
    return `UPDATE player_reports SET ${instance}=$2 WHERE id=$1 RETURNING id, ${instance};`;
};

const sponsor = async (ip, reportId, instance) => {
    if (!INSTANCES.includes(instance)) {
        return {constraint: "Invalid instance. Possible injection detected."};
    }

    const instanceArrayString = await query(GET_CURRENT_SPONSOR_ARRAY(instance), [ reportId ])
        .then(res => res.rows[0][instance])
        .catch(err => err);
    
    if (!instanceArrayString.severity) {
        const instanceArray = JSON.parse(instanceArrayString);

        if (!instanceArray.includes(ip)) {
            instanceArray.push(ip);

            const newInstanceArrayString = JSON.stringify(instanceArray);
            const updateResponse = await query(SPONSOR(instance), [ reportId, newInstanceArrayString ])
                .then(res => res.rows[0])
                .catch(err => err);

            if (updateResponse.constraint) {
                return updateResponse;
            } else {
                return updateResponse.id;
            }
        } else {
            console.error("Sponsor usage ERROR - 42");
            return { server: 500, constraint: "ERROR", hasAlreadySponsored: true};
        }
    } else {
        return instanceArrayString;
    }
}

export {
    sponsor
};