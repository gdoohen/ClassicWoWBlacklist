import memoizerific from 'memoizerific';

import { query } from '.';

const SELECT_GOOD_BOI_POINTS = "SELECT COUNT(*) FROM good_boi_points WHERE report_id=$1";

const queryGoodBoiPoints = async (reportId) => {
    return query(SELECT_GOOD_BOI_POINTS, [reportId]);
}
const memoizedQueryGoodBoiPoints = memoizerific(1)(queryGoodBoiPoints);

const getGoodBoiPoints = async reportId => {
    const { rows } = await queryGoodBoiPoints(reportId);
    const goodBoiPoints = rows[0].count;
    return goodBoiPoints;
}

export {
    getGoodBoiPoints
};