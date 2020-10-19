import cron from 'node-cron';

import { updateTopTens } from '../queries/toptens';

const updateTopTensPlusLog = () => {
    updateTopTens();
    console.log("Updated Top Tens at " + new Date());
};

cron.schedule('*/15 * * * * *', updateTopTens);