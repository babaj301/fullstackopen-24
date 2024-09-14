import { useState } from 'react';

const Button = ({ text, handleClick }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const Display = ({ text, value }) => {
  return (
    <div>
      {text}
      {value}
    </div>
  );
};

const Statistics = ({ sum, good, bad, neutral }) => {
  return (
    <div>
      <Display text={'good'} value={good} />
      <Display text={'neutral'} value={neutral} />
      <Display text={'bad'} value={bad} />
      <Display text={'all'} value={sum} />
      <Display text={'average'} value={(good * 1 + bad * -1) / sum} />
      <Display text={'positive'} value={`${(good / sum) * 100} %`} />
    </div>
  );
};

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => {
    setGood(good + 1);
  };

  const handleNeutral = () => {
    setNeutral(neutral + 1);
  };

  const handleBad = () => {
    setBad(bad + 1);
  };

  const sum = bad + neutral + good;

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button text={'good'} handleClick={handleGood} />
      <Button text={'neutral'} handleClick={handleNeutral} />
      <Button text={'bad'} handleClick={handleBad} />
      <h1>Statistics</h1>
      <Statistics sum={sum} good={good} bad={bad} neutral={neutral} />
    </div>
  );
}

export default App;
