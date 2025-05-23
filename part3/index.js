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

// General info
app.get('/info', (req, res) => {
  Person.find({}).then((persons) => {
    res.send(
      `<p>Phonebook has info for ${
        persons.length
      } people </p> <p>${new Date()}</p>`
    );
  });
});

// To get all persons
app.get('/api/persons', (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons);
  });
});

// To get specific person
app.get('/api/persons/:id', (req, res, next) => {
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
app.post('/api/persons', (req, res, next) => {
  const body = req.body;

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((person) => {
      res.json(person);
    })
    .catch((error) => {
      next(error);
    });
});

// To handle the user being able to update the number of an existing person
app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body;

  const person = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then((updatedPerson) => {
      res.json(updatedPerson);
    })
    .catch((error) => {
      next(error);
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
    return res.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    console.log(error.message);
    return res.status(400).send({ error: error.message });
  }

  next(error);
};
// handler of requests with result to errors
app.use(errorHandler);
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
