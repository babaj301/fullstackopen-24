import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Notification from './components/Notification';
import PersonsDisplay from './components/PersonsDisplay';
import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');
  const [popup, setPopup] = useState(null);

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

    console.log(exist);

    if (exist) {
      // alert(`${newName} is already added to phonebook`);
      const agreeToChange = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );

      const editedInfo = { ...exist, number: newNumber };

      agreeToChange
        ? personService.editPerson(editedInfo).then((person) => {
            setPopup(`Changed ${newPerson.name}'s number`);

            setTimeout(() => {
              setPopup(null);
            }, 3000);
            setNewName('');
            setNewNumber('');

            console.log(person);
          })
        : setNewName('');
      setNewNumber('');
    } else {
      console.log('person entering');
      personService
        .addPerson(newPerson)
        .then((person) => {
          setPersons(persons.concat(person));
          setPopup(`Added ${newPerson.name}`);

          setTimeout(() => {
            setPopup(null);
          }, 3000);
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
      ? personService
          .deletePerson(id)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            alert(
              `Information of ${person.name} has already been removed from server`
            );
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
      <Notification message={popup} />

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
