const express = require('express');
const app = express();
const PORT = 3001;

app.use(express.json());

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
  res.json(persons);
});

app.get('/info', (req, res) => {
  res.send(
    `<p>Phonebook has info for ${
      persons.length
    } people </p> <p>${new Date()}</p>`
  );
});

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  const person = persons.find((n) => n.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(204).end();
  }
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
  person.id = generateId();

  persons = persons.concat(person);
  res.json(person);

  console.log(persons);
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
