import find from 'lodash/find';
import uniq from 'lodash/uniq';
import filter from 'lodash/filter';

import { query } from './index';

const TOP_TEN_GOOD_BOIS_QUERY = `
    SELECT report_id, COUNT(*) as good_boi_points
    FROM good_boi_points
    GROUP BY (report_id)
    ORDER BY good_boi_points DESC
    LIMIT 10;
`;

const TOP_TEN_BAD_BOIS_QUERY = `
    SELECT report_id, COUNT(*) as bad_boi_points
    FROM bad_boi_points
    GROUP BY (report_id)
    ORDER BY bad_boi_points DESC
    LIMIT 10;
`;

const GET_REPORTS_BY_IDS_QUERY = `
    SELECT *
    FROM player_reports
    WHERE id=ANY($1);
`;

var recentTopTens = {};

const getTopTens = () => {
    return recentTopTens;
};

const updateTopTens = async () => {
    let topTenGoodBoiReportIdsToCountMap = query(TOP_TEN_GOOD_BOIS_QUERY);
    let topTenBadBoiReportIdsToCountMap = query(TOP_TEN_BAD_BOIS_QUERY);

    await Promise.all([topTenGoodBoiReportIdsToCountMap, topTenBadBoiReportIdsToCountMap]).then(vals => {
        topTenGoodBoiReportIdsToCountMap = vals[0].rows;
        topTenBadBoiReportIdsToCountMap = vals[1].rows;
    });

    const goodBoiReportIds = topTenGoodBoiReportIdsToCountMap.map(topTenGoodBoiReportIdCountObject => topTenGoodBoiReportIdCountObject.report_id);
    const badBoiReportIds = topTenBadBoiReportIdsToCountMap.map(topTenBadBoiReportIdCountObject => topTenBadBoiReportIdCountObject.report_id);

    const topTensReportIds = uniq(goodBoiReportIds.concat(badBoiReportIds));

    const topTensReports = await query(GET_REPORTS_BY_IDS_QUERY, [topTensReportIds]).then(res => res.rows);

    let topTenGoodBoiReports = topTensReports.map(report => {
        let reportAndCount = Object.assign({}, report);
        const reportIdCount = find(topTenGoodBoiReportIdsToCountMap, {report_id: reportAndCount.id});
        if (!reportIdCount) return undefined;
        const count = reportIdCount.good_boi_points;
        reportAndCount.count = Number(count);
        return reportAndCount;
    });
    topTenGoodBoiReports = filter(topTenGoodBoiReports, report => report !== undefined).sort((a, b) => b.count - a.count);

    let topTenBadBoiReports = topTensReports.map(report => {
        let reportAndCount = Object.assign({}, report);
        const reportIdCount = find(topTenBadBoiReportIdsToCountMap, {report_id: reportAndCount.id});
        if (!reportIdCount) return undefined;
        const count = reportIdCount.bad_boi_points;
        reportAndCount.count = Number(count);
        return reportAndCount;
    });
    topTenBadBoiReports = filter(topTenBadBoiReports, report => report !== undefined).sort((a, b) => b.count - a.count);

    recentTopTens = {topTenGoodBoiReports, topTenBadBoiReports};
};

export {
    getTopTens,
    updateTopTens
};