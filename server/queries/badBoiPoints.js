import memoizerific from 'memoizerific';

import { query } from './index';

const SELECT_BAD_BOI_POINTS = "SELECT COUNT(*) FROM bad_boi_points WHERE report_id=$1";

const queryBadBoiPoints = async (reportId) => {
    return query(SELECT_BAD_BOI_POINTS, [reportId]);
}
const memoizedQueryBadBoiPoints = memoizerific(1)(queryBadBoiPoints);

const getBadBoiPoints = async reportId => {
    const { rows } = await queryBadBoiPoints(reportId);
    const badBoiPoints = rows[0].count
    return badBoiPoints;
}

export {
    getBadBoiPoints
};