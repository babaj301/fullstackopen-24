const App = () => {
  const course = 'Half Stack application development';
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10,
  };
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7,
  };
  const part3 = {
    name: 'State of a component',
    exercises: 14,
  };

  const Header = ({ course }) => {
    return (
      <>
        <h1>{course}</h1>
      </>
    );
  };

  const Part = ({ part, exercises }) => {
    return (
      <div>
        <p>
          {part} {exercises}
        </p>
      </div>
    );
  };

  const Content = ({ part, exercises }) => {
    return (
      <div>
        <Part part={part1.name} exercises={part1.exercises} />
        <Part part={part2.name} exercises={part2.exercises} />
        <Part part={part3.name} exercises={part3.exercises} />
      </div>
    );
  };

  const Total = ({ ex1, ex2, ex3 }) => {
    return (
      <div>
        <p>Number of exercises {ex1 + ex2 + ex3}</p>
      </div>
    );
  };

  return (
    <div>
      <Header course={course} />
      <Content />
      <Total
        ex1={part1.exercises}
        ex2={part2.exercises}
        ex3={part3.exercises}
      />
    </div>
  );
};

export default App;
