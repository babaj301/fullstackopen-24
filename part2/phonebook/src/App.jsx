import { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    console.log('effect');
    axios
      .get('http://localhost:3001/persons')
      .then((res) => {
        console.log(res);
        setPersons(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };
    const exist = persons.find((person) => {
      return JSON.stringify(person.name) === JSON.stringify(newPerson.name);
    });

    if (exist) {
      alert(`${newName} is already added to phonebook`);

      setNewName('');
      setNewNumber('');
    } else {
      axios
        .post('http://localhost:3001/persons', newPerson)
        .then((res) => {
          console.log(res.data);
          setPersons(persons.concat(res.data));
          setNewName('');
          setNewNumber('');
        })
        .catch((err) => console.error(err));
    }
  };

  const handleName = (event) => {
    setNewName(event.target.value);
  };

  const handleNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const filtered = persons.filter((e) => {
    return e.name.toLowerCase().includes(search);
  });

  console.log(filtered);

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter search={search} handleSearch={handleSearch} />
      <h2>add a new</h2>

      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        newNumber={newNumber}
        handleName={handleName}
        handleNumber={handleNumber}
      />

      <h2>Numbers</h2>

      <Persons filtered={filtered} persons={persons} />
    </div>
  );
};

export default App;
