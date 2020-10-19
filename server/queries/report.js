import memoizerific from 'memoizerific';

import { query, getGoodBoiPoints, getBadBoiPoints, hasVotedGood, hasVotedBad } from './index';
import { isWordIllegal } from '../utils/illegalWords';
import SERVERS from './servers';
import INSTANCES from './instances';

const INSERT_REPORT_QUERY = `
    INSERT INTO player_reports (region, realm, character_name)
    VALUES ($1, $2, $3)
    ON CONFLICT (region, realm, character_name) DO NOTHING
    RETURNING *;
`;

const SELECT_REPORT_QUERY = `
    SELECT * FROM player_reports
    WHERE region=$1 AND realm=$2 AND character_name=$3
    LIMIT 1;
`;

const queryReport = async (region, realm, character) => {
    return await query(SELECT_REPORT_QUERY, [region, realm, character]);
};
const memoizedQueryReport = memoizerific(1)(queryReport);

const insertOrSelectReport = async (region, realm, character) => {
    region = region.toUpperCase();
    realm = realm.toLowerCase();
    character = character.toLowerCase();

    if (isWordIllegal(realm) || isWordIllegal(character)) {
        return { query: "failed", reason: "Don't say bad words!" };
    } else if (!SERVERS[region].includes(realm)) {
        return { query: "failed", reason: "Invalid realm" };
    }

    return await query(INSERT_REPORT_QUERY, [region, realm, character]).then(async response => {
        if (response && response.rows.length > 0) {
            return response.rows[0];
        } else {
            const reportResponse = await queryReport(region, realm, character).then(res => res.rows[0]);
            return reportResponse;
        }
    });
};
const memoizedInsertOrSelectReport = memoizerific(3)(insertOrSelectReport);

const getReportId = async (region, realm, character) => {
    const insertOrSelectResponse = await insertOrSelectReport(region, realm, character);
    if (insertOrSelectResponse.id) {
        return insertOrSelectResponse.id;
    } else {
        return null;
    }
};

const getReport = async (region, realm, character, ip = undefined) => {
    let report = { region, realm, character, goodBoiPoints: 0, badBoiPoints: 0 };

    const reportResponse = await insertOrSelectReport(region, realm, character);
    if (reportResponse.query === "failed") {
        return reportResponse;
    }

    if (reportResponse.id) {
        const reportId = reportResponse.id;
        let goodBoiPoints = getGoodBoiPoints(reportId);
        let badBoiPoints = getBadBoiPoints(reportId);

        await Promise.all([goodBoiPoints, badBoiPoints]).then(vals => {
            goodBoiPoints = vals[0];
            badBoiPoints = vals[1];
        });

        report.id = reportId;
        report.goodBoiPoints = Number(goodBoiPoints);
        report.badBoiPoints = Number(badBoiPoints);

        if (ip !== undefined && reportId) {
            let votedGood = hasVotedGood(ip, reportId);
            let votedBad = hasVotedBad(ip, reportId);

            await Promise.all([votedGood, votedBad]).then(vals => {
                votedGood = vals[0];
                votedBad = vals[1];
            });

            report.hasVotedGood = votedGood;
            report.hasVotedBad = votedBad;
            report.sponsors = calculateReportSponsors(ip, reportResponse);
        }
    }

    return report;
};

const calculateReportSponsors = (ip, report) => {
    let sponsors = {};

    INSTANCES.forEach(instance => {
        const instanceArrayString = report[instance];
        const instanceArray = JSON.parse(instanceArrayString);

        const sponsorCount = instanceArray.length;
        const hasSponsored = instanceArray.includes(ip);

        sponsors[instance] = {hasSponsored, sponsorCount};
    });

    return sponsors;
}

export {
    getReport,
    getReportId
};