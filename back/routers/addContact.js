'use strict'
const express = require('express');
const router = express.Router();
const Contact = require('../model/Contacts');
const parsePhoneNumber = require('libphonenumber-js');
const morgan = require('morgan');
morgan.token('body', (req, res) => JSON.stringify(req.body));

router.post('', morgan(':body'), async (req, res) => {
    if (!req.body.name) {
      res.status(400).send('You need to send a name!');
      return;
    }
    if (!req.body.number) {
      res.status(400).send('You need to send a number!');
      return;
    }
    const phoneNumberUs = parsePhoneNumber(req.body.number, 'US');
    const phoneNumberIl = parsePhoneNumber(req.body.number, 'IL');
    if (!phoneNumberUs.isValid() && !phoneNumberIl.isValid()) {
      res.status(400).send('Not valid phone number!');
      return;
    }
    const phonebook = await Contact.find();
    for (const person of phonebook) {
      if (person.name.toLowerCase() === req.body.name.toLowerCase()) {
        res.status(400).send('This name is already in the phonebook!');
        return;
      }
      if (person.number === req.body.number) {
        res.status(400).send('This number is already in the phonebook!');
        return;
      }
    }

    const contact = new Contact({
      name: req.body.name,
      number: req.body.number,
    });
    phonebook.push(contact);
    res.status(201).json(phonebook);
    contact.save();
  });

module.exports = router