import Axios from "axios";

const getAll = () => {
  const request = Axios.get(
    "https://studies.cs.helsinki.fi/restcountries/api/all"
  );
  return request.then((response) => response.data);
};

const getSingle = (target) => {
  const request = Axios.get(
    `https://studies.cs.helsinki.fi/restcountries/api/name/${target}`
  );
  return request.then((response) => response.data);
};

export default {
  getAll,
  getSingle,
};
