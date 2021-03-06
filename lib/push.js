"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const $fh = require('fh-mbaas-api');
const async = require("async");
const Message = require('../model/message');
const Options = require("../model/options");

const pushRoute = new express.Router();

pushRoute.use(cors());
pushRoute.use(bodyParser());

// Endpoint for testing backend deployment
pushRoute.get("/", (request, response) => {
  response.status(200)
    .send("Hello from node backend!");
});

// Endpoint for sending push to all devices of 1 application
pushRoute.get('/:appId', (request, response) => {
  const message = new Message("Hello from node backend!");
  const options = new Options();
  options.apps.push(request.params.appId);

  $fh.push(message, options, (err, res) => {
    response.send(err || res);
  });
});

// Endpoint for sending push to a list of aliases
pushRoute.post('/:appId', (request, response) => {
  const message = new Message("Hello from node backend!");
  const options = new Options();
  options.apps.push(request.params.appId);

  const aliases = request.body;
  async.each(aliases, alias => {
    options.aliases[0] = alias;
    $fh.push(message, options, (err, res) => {
      console.log(`[${alias}] FH.PUSH RESULT: ${err || res}`);
    });
  },
    err => console.log(`[${alias}] ERROR: ${err}`)
  );

  response.send(`Notifications are being sent for ${aliases.length}. Check the results in the Cloud App console."`)
});

// Endpoint for sending push to 1 device
pushRoute.get('/:appId/:alias', (request, response) => {
  const message = new Message("Hello from node backend!");
  const options = new Options();
  options.apps.push(request.params.appId);
  options.aliases.push(request.params.alias);

  $fh.push(message, options, (err, res) => {
    response.send(err || res);
  });
});

module.exports = pushRoute;
