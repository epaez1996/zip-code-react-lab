import React, { Component } from "react";
import "./App.css";

function ZipSearchField({ zipCode, handleZipCodeChange }) {
  return (
    <div
      style={{
        color: "#222",
        fontWeight: "bold",
        textAlign: "center",
        margin: "1rem",
      }}
    >
      Zip Code:{" "}
      <input
        type="text"
        placeholder="Try 10016"
        value={zipCode}
        onChange={handleZipCodeChange}
      />
    </div>
  );
}

const City = ({
  state,
  location,
  estimatedPopulation,
  totalWages,
  locationText,
}) => {
  return (
    <div className="city-container">
      <div className="header-container">
        <h4>{locationText}</h4>
      </div>
      <div>
        <ul className="info-container">
          <li>State: {state}</li>
          <li>Location: {location}</li>
          <li>Population (estimated): {estimatedPopulation}</li>
          <li>Total Wages: {totalWages}</li>
        </ul>
      </div>
    </div>
  );
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { zipCode: "", zipData: [] };
    this.handleZipCodeChange = this.handleZipCodeChange.bind(this);
  }

  handleZipCodeChange(e) {
    if (e.target.value.length === 5) {
      fetch(`http://ctp-zip-api.herokuapp.com/zip/${e.target.value}`)
        .then((response) => response.json())
        .then((data) => this.setState({ ...this.state, zipData: data }))
        .catch((err) => console.log(err));
    }
    this.setState({ zipCode: e.target.value });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <ZipSearchField
          zipCode={this.state.zipCode}
          handleZipCodeChange={this.handleZipCodeChange}
        />
        <div>
          {this.state.zipData.map((data, i) => (
            <City
              key={i}
              location={data.Location}
              state={data.State}
              estimatedPopulation={data.EstimatedPopulation}
              totalWages={data.TotalWages}
              locationText={data.LocationText}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
