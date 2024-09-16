const Course = ({ course }) => {
  const Header = ({ course }) => {
    return (
      <div>
        <h1>{course}</h1>
      </div>
    );
  };

  const Part = ({ part }) => {
    return (
      <div>
        <p>
          {part.name} {part.exercises}
        </p>
      </div>
    );
  };

  const Content = ({ parts }) => {
    return (
      <div>
        {parts.map((part) => {
          return <Part key={part.id} part={part} />;
        })}
      </div>
    );
  };

  const Total = ({ parts }) => {
    const sum = parts.reduce(
      (accumulator, currentValue) => accumulator + currentValue.exercises,
      0
    );
    return (
      <div>
        <p>
          Number of exercises
          {sum}
        </p>
      </div>
    );
  };

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default Course;
