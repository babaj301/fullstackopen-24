import { useState } from 'react';

const Button = ({ text, handleClick }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const Display = ({ text, number }) => {
  return (
    <div>
      {text}
      {number}
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

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button text={'good'} handleClick={handleGood} />
      <Button text={'neutral'} handleClick={handleNeutral} />
      <Button text={'bad'} handleClick={handleBad} />
      <h1>Statistics</h1>

      <Display text={'good'} number={good} />
      <Display text={'neutral'} number={neutral} />
      <Display text={'bad'} number={bad} />
    </div>
  );
}

export default App;
