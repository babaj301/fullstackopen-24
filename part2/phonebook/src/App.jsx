import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import PersonsDisplay from './components/PersonsDisplay';
import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    console.log('effect');
    personService
      .getAll()
      .then((person) => {
        setPersons(person);
        console.log(person);
      })
      .catch((err) => {
        console.log(err);
      });
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
      console.log('person entering');
      personService
        .addPerson(newPerson)
        .then((person) => {
          setPersons(persons.concat(person));
          setNewName('');
          setNewNumber('');
        })
        .catch((err) => console.error(err));
    }
  };

  const handleDelete = (id) => {
    const person = persons.find((p) => p.id === id);
    const confirm = window.confirm(
      `Are you sure you want to delete ${person.name}`
    );

    confirm
      ? personService.deletePerson(id).then((res) => {
          console.log(res);
        })
      : alert('Thanks for not deleting them');

    setPersons(persons.filter((person) => person.id !== id));
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

  const filtered = persons.filter((p) => {
    return p.name.toLowerCase().includes(search);
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
      <PersonsDisplay
        persons={persons}
        filtered={filtered}
        deletePerson={handleDelete}
      />
    </div>
  );
};

export default App;
