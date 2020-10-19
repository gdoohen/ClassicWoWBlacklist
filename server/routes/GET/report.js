import { getReport } from '../../queries/';
import { formatProperName } from '../../utils/stringFormatting';

const router = require('express-promise-router')();

router.get('/:region/:realm/:character', async (req, res) => {
    const { region, realm, character } = req.params;
    const { clientIp } = req;
    const report = await getReport(region.toUpperCase(), formatProperName(realm), formatProperName(character), clientIp);

    if (report.query === "failed") {
        res.status(400).json(report);
    } else {
        res.json(report);
    }
});

export {
    router
};