import "./App.css";
import React, { useState } from "react";

const CitySearchField = ({ city, handleCityChange, handleCitySubmit }) => {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <form onSubmit={handleCitySubmit}>
        <input
          placeholder="Try Corona"
          value={city}
          onChange={handleCityChange}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

const Zip = (props) => {
  return <div className="zip-container">{props.zip}</div>;
};

const App = () => {
  const [city, setCity] = useState("");
  const [data, setData] = useState([]);

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleCitySubmit = (e) => {
    e.preventDefault();

    let cityInput = city.toUpperCase();
    fetch(`http://ctp-zip-api.herokuapp.com/city/${cityInput}`)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));

    setCity("");
  };

  return (
    <div className="App">
      <div className="App-Header">
        <h2>City Search</h2>
      </div>
      <CitySearchField
        city={city}
        handleCityChange={handleCityChange}
        handleCitySubmit={handleCitySubmit}
      />
      {data.map((d, i) => (
        <Zip zip={d} key={i} />
      ))}
    </div>
  );
};

export default App;
