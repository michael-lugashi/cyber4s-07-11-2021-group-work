'use strict';
const express = require('express');
const router = express.Router();
const Contact = require('../model/Contacts');

router.delete('/:name', async (req, res) => {

  const phonebook = await Contact.find();
  const contactIndex = phonebook.findIndex(
    (contact) => contact.name.toLowerCase() === req.params.name.toLowerCase()
  );

  if (contactIndex + 1) {
    phonebook.splice(contactIndex, 1);
    res.status(202).send(phonebook);
    // so user does not have to wait for it to be removed from the database
    // you don't need to catch it because it has to work since the contact being deleted was taken right out of the database
    Contact.findOneAndRemove(phonebook[contactIndex]).exec();
    return;
  }
  res.status(400).send('Contact does not exist!');
});

module.exports = router;
