import { useState, useEffect } from "react";
import axiosService from "./resources/axiosStore";

function App() {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axiosService
      .getAll()
      .then((data) => {
        setCountries(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handleSearch(e) {
    setSearch(e.target.value);

    const filteredCountries = countries.filter((country) =>
      country.name.common.toLowerCase().includes(search.toLowerCase())
    );
    setCountries(filteredCountries);
    console.log(filteredCountries);
  }

  return (
    <>
      <div>
        find countries
        <input type="text" value={search} onChange={handleSearch} />
      </div>
      <div>
        <ul>
          {countries.map((countrie) => {
            <li>{countrie.name}</li>;
          })}
        </ul>
      </div>
    </>
  );
}

export default App;
