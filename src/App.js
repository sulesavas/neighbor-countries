import "./App.css";
import { useState } from "react";
import axios from "axios";
function App() {
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [mutualNeighbors, setMutualNeighbors] = useState([
    { id: 1, name: "Turkey" },
    { id: 3, name: "Greece" },
  ]);

  const Generate = () => {
    axios(`https://travelbriefing.org/countries.json`).then((response) => {
      let countries = [];
      for (let i = 0; i < 10; i++) {
        var item =
          response.data[Math.floor(Math.random() * response.data.length)];
        countries.push(item);
      }

      setSelectedCountries(countries);

      findMutualNeighbors();
    });
  };

  const findMutualNeighbors = () => {
    selectedCountries.forEach((value) => {
      axios(value.url).then((response) => {
        console.log(response.data.neighbors);
      });
    });
  };

  return (
    <div>
      <button onClick={() => Generate()}>Generate Groupings</button>
      <h1>Selected Countries</h1>
      <ul>
        {selectedCountries.map((value, index) => {
          return <li key={index}>{value.name}</li>;
        })}
      </ul>
      <h1>Mutual Neighbors</h1>
      <ul>
        {mutualNeighbors.map((neighbor, index) => {
          return <li key={index}>{neighbor.name}</li>;
        })}
      </ul>
    </div>
  );
}

export default App;
