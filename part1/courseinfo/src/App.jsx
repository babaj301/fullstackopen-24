const App = () => {
  const course = 'Half Stack application development';
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10,
    },
    {
      name: 'Using props to pass data',
      exercises: 7,
    },
    {
      name: 'State of a component',
      exercises: 14,
    },
  ];

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
        <Part part={parts[0].name} exercises={parts[0].exercises} />
        <Part part={parts[1].name} exercises={parts[1].exercises} />
        <Part part={parts[2].name} exercises={parts[2].exercises} />
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
        ex1={parts[0].exercises}
        ex2={parts[1].exercises}
        ex3={parts[2].exercises}
      />
    </div>
  );
};

export default App;
