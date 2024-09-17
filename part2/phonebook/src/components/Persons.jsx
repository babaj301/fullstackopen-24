import React from 'react';

const Persons = ({ filtered, persons }) => {
  return (
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
  );
};

export default Persons;
