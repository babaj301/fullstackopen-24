require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/persons');

// JSON parser to get access to body
app.use(express.json());

// for serving the frontend as a static file
app.use(express.static('dist'));

//So we can access the backend from the frontend even though its not the same domain
app.use(cors());

// A small and compact logger
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

// To get all persons
app.get('/api/persons', (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons);
  });
});

// To get specific person
app.get('/api/persons/:id', (req, res) => {
  Person.findById(req.params.id).then((person) => {
    res.json(person);
  });
});

// To delete a person in the database
app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((error) => {
      next(error);
    });
});

// To add a new person to the phonebook
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

// For handling unknown endpoints that are not among the routes
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};
app.use(unknownEndpoint);

// To handle errors from the routes
const errorHandler = (error, req, res, next) => {
  console.log(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  }

  next(error);
};
// handler of requests with result to errors
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
