import axios from 'axios';
import { useState, useEffect } from 'react';

const App = () => {
  const [countryValue, setCountryValue] = useState('');
  const [allCountries, setAllCountries] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const handleChange = (event) => {
    setCountryValue(event.target.value);
    const found = allCountries.filter((n) =>
      n.name.common.toLowerCase().includes(countryValue)
    );
    setFiltered(found);

    console.log(countryValue);

    console.log(found);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((res) => {
        setAllCountries(res.data);
      });
  }, []);

  // console.log(allCountries);
  // console.log(filtered);

  return (
    <div>
      <div>
        {' '}
        <form onSubmit={handleSubmit}>
          <input type="text" value={countryValue} onChange={handleChange} />
        </form>
      </div>
      {filtered.length === 1 ? (
        filtered.map((n) => {
          return (
            <div key={n.length}>
              <div>
                <h1>{n.name.common}</h1>
                <p>Capital: {n.capital.map((n) => n)}</p>
                <p>Area: {n.area}</p>
              </div>

              <div>
                <h2>
                  Languages:
                  {/* {n.languages} */}
                </h2>
              </div>
              <div>{n.flag}</div>
            </div>
          );
        })
      ) : (
        <div>
          {filtered.length >= 10 ? (
            <div>
              <p>Too many matches, specify another filter </p>
            </div>
          ) : (
            <div>
              {filtered.map((n) => {
                return <p key={n.ccn3}>{n.name.common}</p>;
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
