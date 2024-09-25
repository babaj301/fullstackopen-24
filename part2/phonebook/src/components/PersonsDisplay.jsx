import React from 'react';
import Person from './Person';

const PersonsDisplay = ({ persons, filtered, deletePerson }) => {
  return (
    <div>
      {filtered
        ? filtered.map((person) => {
            return (
              <Person
                key={person.id}
                person={person}
                deletePerson={deletePerson}
              />
            );
          })
        : persons.map((person) => {
            return (
              <Person
                key={person.id}
                person={person}
                deletePerson={deletePerson}
              />
            );
          })}
    </div>
  );
};

export default PersonsDisplay;
