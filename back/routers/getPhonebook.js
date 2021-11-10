'use strict';
const express = require('express');
const router = express.Router();
const Contact = require('../model/Contacts');

router.get('', (req, res) => {
  Contact.find()
    .then((contacts) => {
      res.send(contacts);
    })
    .catch((err) => {
      res
        .status(500)
        .send(
          'We are having problems with our servers. Webpage not opperable!'
        );
    });
});

module.exports = router;
