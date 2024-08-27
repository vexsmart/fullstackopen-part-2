const Persons = (props) => {
  return (
    <ul>
      {props.shownNumbers.map((person) => (
        <li key={person.id} id={person.id}>
          {person.name} {person.number}
          <button id={person.id} onClick={props.onDelete}>delete</button>
        </li>
      ))}
    </ul>
  );
};

export default Persons;
