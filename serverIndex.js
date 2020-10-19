import express from 'express';
import path from 'path';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import httpsRedirect from 'express-http-to-https';
import requestIp from 'request-ip';

import { mountRoutes } from './server/routes/routesIndex';
import './server/queries/toptens';

const PORT = process.env.PORT || 4000;
const app = express();

//Redirect HTTP connections to HTTPS
const ignoreHosts = [/localhost:(\d{4})/];
const ignoreRoutes = [];
app.use(httpsRedirect.redirectToHTTPS(ignoreHosts, ignoreRoutes));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(requestIp.mw());

mountRoutes(app);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.listen(PORT, () => {
    console.log("Server is running on Port: " + PORT);
});

//Cron Jobs
import "./server/cronJobs";