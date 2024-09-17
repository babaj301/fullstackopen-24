import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');

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
      setPersons(persons.concat(newPerson));
      setNewName('');
      setNewNumber('');
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
    console.log(search);
  };

  const filtered = persons.filter((e) => {
    return e.name.toLowerCase().includes(search);
  });

  console.log(filtered);

  return (
    <div>
      <h2>Phonebook</h2>
      <input value={search} onChange={handleSearch} />
      <h2>add a new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleName} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {filtered
          ? filtered.map((person) => {
              return (
                <p key={person.id}>
                  {person.name} {person.number}
                </p>
              );
            })
          : persons.map((person) => {
              return (
                <p key={person.id}>
                  {person.name} {person.number}
                </p>
              );
            })}
      </div>
    </div>
  );
};

export default App;
