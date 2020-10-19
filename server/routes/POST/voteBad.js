import { getReport, hasVotedBad, voteBad } from '../../queries/';
import { formatProperName } from '../../utils/stringFormatting';

const router = require('express-promise-router')();

router.post('/:region/:realm/:character', async (req, res) => {
    const { region, realm, character } = req.params;
    const { clientIp } = req;

    const report = await getReport(region.toUpperCase(), formatProperName(realm), formatProperName(character), clientIp);
    const reportId = report.id;

    if (!reportId) res.send("no report id");

    const hasVoted = await hasVotedBad(clientIp, reportId);
    let vote;
    if (!hasVoted) {
        vote = await voteBad(clientIp, reportId);
    }

    res.send(vote);
});

export {
    router
};