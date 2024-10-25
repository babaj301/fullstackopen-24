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

// let persons = [
//   {
//     id: '1',
//     name: 'Arto Hellas',
//     number: '040-123456',
//   },
//   {
//     id: '2',
//     name: 'Ada Lovelace',
//     number: '39-44-5323523',
//   },
//   {
//     id: '3',
//     name: 'Dan Abramov',
//     number: '12-43-234345',
//   },
//   {
//     id: '4',
//     name: 'Mary Poppendieck',
//     number: '39-23-6423122',
//   },
// ];

// app.get('/info', (req, res) => {
//   //   res.send(
//   //     `<p>Phonebook has info for ${
//   //       persons.length
//   //     } people </p> <p>${new Date()}</p>`
//   //   );
//   // });

app.get('/api/persons', (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons);
  });
});

app.get('/api/persons/:id', (req, res) => {
  Person.findById(req.params.id).then((person) => {
    res.json(person);
  });
});

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((error) => {
      next(error);
    });
});

const generateId = () => {
  const id = Math.max(...persons.map((n) => n.id)) + 1;
  return String(id);
};

app.post('/api/persons', (req, res) => {
  const body = req.body;

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((person) => {
    res.json(person);
  });
});

const PORT = process.env.PORT || 3001;

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};
app.use(unknownEndpoint);

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
