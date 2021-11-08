'use strict';
const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan')

const app = express();
const port = process.env.PORT || 3001;
app.use(morgan('tiny'))
morgan.token('body', (req, res) => JSON.stringify(req.body))

app.use(
  cors({
    origin: '*',
    methods: '*',
  })
);
app.use(express.json());

let phonebook = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

app.get('/api/persons', (req, res) => {
  res.json(phonebook);
});

app.get('/info', (req, res) => {
  const infoString = `Phonebook has info for ${phonebook.length} people <br> ${new Date(Date.now())}`;
  res.send(infoString);
});

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = phonebook.find((person) => person.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  phonebook = phonebook.filter((note) => note.id !== id);

  res.status(202).json(phonebook);
});

app.post('/api/persons', morgan(':body'), (req, res) => {
  if (!req.body.name) {
    res.status(400).json({ error: 'missing name' });
    return;
  }
  for (const person of phonebook) {
    if (person.name === req.body.name) {
      res.status(400).json({ error: 'name already in phonebook' });
      return;
    }
  }
//   const person = {
//     id: generateId(),
//     name: req.body.name,
//     number: req.body.number,
//   };
  req.body.id = generateId()
  phonebook.push(req.body);
//   console.log(phonebook);
  res.status(201).json(phonebook);
});

function generateId() {
  return Math.floor(Math.random() * 1000);
}

app.listen(port, (error) => {
  if (error) {
    console.log(error);
    return;
  }

  console.log(`listening on port ${port}`);
});
