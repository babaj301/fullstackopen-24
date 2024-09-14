import { useState } from 'react';

const Button = ({ text, handleClick }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td> {value}</td>
    </tr>
  );
};

const Statistics = ({ sum, good, bad, neutral }) => {
  if (sum === 0) {
    return <div>No feedback given</div>;
  }
  return (
    <table>
      <tbody>
        <StatisticLine text={'good'} value={good} />
        <StatisticLine text={'neutral'} value={neutral} />
        <StatisticLine text={'bad'} value={bad} />
        <StatisticLine text={'all'} value={sum} />
        <StatisticLine text={'average'} value={(good * 1 + bad * -1) / sum} />
        <StatisticLine text={'positive'} value={`${(good / sum) * 100} %`} />
      </tbody>
    </table>
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
