import { getReport, hasSponsored, sponsor } from '../../queries/';

const router = require('express-promise-router')();

router.post('/:region/:realm/:character/:instance', async (req, res) => {
    const { region, realm, character, instance } = req.params;
    const { clientIp } = req;

    const report = await getReport(region, realm, character, clientIp);
    const reportId = report.id;

    if (!reportId) res.send("no report id");

    const sponsored = await hasSponsored(clientIp, reportId, instance);
    if (!sponsored) {
        const sponsorResponse = await sponsor(clientIp, reportId, instance);
        if (sponsorResponse.constraint) {
            res.status(400);
        }

        res.json(sponsorResponse);
    } else {
        res.json({ hasSponsored: sponsored });
    }
});

export {
    router
};