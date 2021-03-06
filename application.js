"use strict";

const mbaasApi = require('fh-mbaas-api');
const express = require('express');
const mbaasExpress = mbaasApi.mbaasExpress();
const cors = require('cors');

// list the endpoints which you want to make securable here
const securableEndpoints = ['/hello'];

const app = express();

// Enable CORS for all requests
app.use(cors());

// Note: the order which we add middleware to Express here is important!
app.use('/sys', mbaasExpress.sys(securableEndpoints));
app.use('/mbaas', mbaasExpress.mbaas);

// allow serving of static files from the public directory
app.use(express.static(__dirname + '/public'));

// Note: important that this is added just before your own Routes
app.use(mbaasExpress.fhmiddleware());

// Routes
const push = require('./lib/push');

app.use('/push', push);

// Important that this is last!
app.use(mbaasExpress.errorHandler());

const port = process.env.FH_PORT || process.env.OPENSHIFT_NODEJS_PORT || 8001;
const host = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
app.listen(port, host, () => {
  console.log(`App started at: ${new Date()} on port: ${port}`);
});
