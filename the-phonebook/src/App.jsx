import { useState, useEffect } from "react";
import Filter from "./components/filter";
import Form from "./components/form";
import Persons from "./components/persons";
import Message from "./components/message";
import axioService from "./resources/axiosStore";
import "./App.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState(null);
  const [errorStyle, setErrorStyle] = useState({});

  useEffect(() => {
    axioService.getAll().then((initPersons) => {
      setPersons(initPersons);
    });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    // const existingName = persons.some((person) => person.name === newName);
    const checkName = persons.find((person) => person.name === newName);
    if (checkName) {
      const confirmation = window.confirm(
        `${checkName.name} is already added to the phonebook, replace the old number with a new one? `
      );
      if (confirmation) {
        axioService
          .updatePerson(checkName.id, {
            name: newName,
            number: newPhone,
          })
          .then((updatedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id === updatedPerson.id ? updatedPerson : person
              )
            );
            setMessage(`Updated ${updatedPerson.name}`);
            setNewName("");
            setNewPhone("");
          })
          .catch((error) => {
            setMessage(
              `Information of ${checkName.name} has already been removed from server`
            );
            setPersons(persons.filter((person) => person.id !== checkName.id));
            setErrorStyle({ color: "red", borderColor: "red" });
            console.log(error);
          });
        return;
      }
      return;
    }

    axioService
      .postNew({
        name: newName,
        number: newPhone,
      })
      .then((newPerson) => {
        setPersons(persons.concat(newPerson));
        setMessage(`Added ${newPerson.name}`);
      });

    setNewName("");
    setNewPhone("");
  }

  function handleNameChange(e) {
    setNewName(e.target.value);
  }

  function handlePhoneChange(e) {
    setNewPhone(e.target.value);
  }

  function handleSearch(e) {
    setFilter(e.target.value);
  }

  function handleDelete(e) {
    const confirmation = window.confirm(
      "Are you sure you want to delete this person?"
    );
    if (confirmation) {
      const id = e.target.id;
      axioService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch((error) => {
          setMessage(`this person has already been removed from server`);
          setPersons(persons.filter((person) => person.id !== id));
          setErrorStyle({ color: "red", borderColor: "red" });
          console.log(error);
        });
    }
  }

  setTimeout(() => {
    if (message !== null) {
      setMessage(null);
    }
    setErrorStyle({});
  }, 5000);

  const shownNumbers =
    filter === ""
      ? persons
      : persons.filter((number) => {
          return number.name.toLowerCase().includes(filter.toLowerCase());
        });

  return (
    <div>
      <h2>Phonebook</h2>
      {message && <Message style={errorStyle} message={message} />}
      <Filter value={filter} onChange={handleSearch} />
      <h2>add a new</h2>
      <Form
        handleName={handleNameChange}
        handlePhone={handlePhoneChange}
        newName={newName}
        newPhone={newPhone}
        onSubmit={handleSubmit}
      />
      <h2>Numbers</h2>
      <Persons onDelete={handleDelete} shownNumbers={shownNumbers} />
    </div>
  );
};

export default App;
