'use strict'
const express = require('express');
const router = express.Router();
const Contact = require('../model/Contacts');

router.get('/:name', (req, res) => {
    Contact.findOne({
      name: { $regex: `^${req.params.name}$`, $options: 'i' },
    }).then((contact) => {
      if (contact) {
        res.json(contact);
      } else {
        res.status(404).send('Contact does not exist!');
      }
    }).catch();
  });

module.exports = router