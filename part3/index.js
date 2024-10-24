require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/persons');

app.use(express.json());
app.use(express.static('dist'));
app.use(cors());

app.use(morgan('tiny, :data'));

morgan.token('data', (req, res) => {
  return JSON.stringify(req.body);
});

let persons = [
  {
    id: '1',
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: '2',
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: '3',
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: '4',
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

app.get('/api/persons', (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons);
  });
});

app.get('/info', (req, res) => {
  res.send(
    `<p>Phonebook has info for ${
      persons.length
    } people </p> <p>${new Date()}</p>`
  );
});

app.get('/api/persons/:id', (req, res) => {
  Person.findById(req.params.id).then((person) => {
    res.json(person);
  });
});

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  persons = persons.filter((n) => n.id !== id);
  res.status(204);
});

const generateId = () => {
  const id = Math.max(...persons.map((n) => n.id)) + 1;
  return String(id);
};

app.post('/api/persons', (req, res) => {
  const person = req.body;

  if (!person.name) {
    res.status(400).json({ error: 'name is missing' });
  }
  if (!person.number) {
    res.status(400).json({ error: 'number is missing' });
  }

  const exists = persons.find((n) => n.name === person.name);

  if (exists) {
    res.status(400).json({ error: 'name must be unique' });
  }

  person.id = generateId();

  persons = persons.concat(person);
  res.json(person);
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
