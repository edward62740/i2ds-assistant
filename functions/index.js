'use strict';
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const PromisePool = require('es6-promise-pool');
const { database } = require('firebase-admin');

exports.I2DSgoogleAssistantIntegration = functions.https.onRequest(async (req, res) => {
  let requested_state = Object.values(req.body.queryResult.parameters);
  const getDeviceInfoPromise = admin.database()
    .ref(`/devices`).once('value');
  let deviceSnapshot = await Promise.resolve(getDeviceInfoPromise);
  let devices = Object.keys(deviceSnapshot.val());
  for (var i = 0; i < devices.length; i++) {
    admin.database().ref('/req/send').update({ [devices[i].replace(/\D/g, '')]: requested_state[0] })
  }

  res.send({
    speech: "hello"
  });
});