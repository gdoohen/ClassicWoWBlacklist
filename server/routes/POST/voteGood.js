import { getReport, hasVotedGood, voteGood } from '../../queries/';
import { formatProperName } from '../../utils/stringFormatting';

const router = require('express-promise-router')();

router.post('/:region/:realm/:character', async (req, res) => {
    const { region, realm, character } = req.params;
    const { clientIp } = req;

    const report = await getReport(region.toUpperCase(), formatProperName(realm), formatProperName(character), clientIp);
    const reportId = report.id;

    if (!reportId) res.send("no report id");

    const hasVoted = await hasVotedGood(clientIp, reportId);
    let vote = "already voted";
    if (!hasVoted) {
        vote = await voteGood(clientIp, reportId);
    }

    res.send(vote);
});

export {
    router
};