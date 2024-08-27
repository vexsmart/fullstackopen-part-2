import Header from "./header";
import Content from "./content";
import Total from "./total";

const Course = (props) => {
  const { course } = props;

  return (
    <div>
      <h1>Web Development Curriculum</h1>
      <Header content={course[0].name} />
      <Content
        part1={course[0].parts[0].name}
        part2={course[0].parts[1].name}
        part3={course[0].parts[2].name}
        part4={course[0].parts[3].name}
        exercises1={course[0].parts[0].exercises}
        exercises2={course[0].parts[1].exercises}
        exercises3={course[0].parts[2].exercises}
        exercises4={course[0].parts[3].exercises}
      />
      <Total total={props.total} />
      <Header content={course[1].name} />
      <Content
        part1={course[1].parts[0].name}
        part2={course[1].parts[1].name}
        exercises1={course[1].parts[0].exercises}
        exercises2={course[1].parts[1].exercises}
      />
      <Total total={props.total2} />
    </div>
  );
};

export default Course;
