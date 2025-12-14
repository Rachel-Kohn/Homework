import { Component } from "react";
import Weather from "./components/Weather";
import "./App.css";

class App extends Component {
  state = {
    weather: null,
    error: ""
  };

  componentDidMount() {
    const zipCode = "90210";
    const key = "my key";

    fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${key}&units=imperial&lang=en`)
      .then(res => res.json())
      .then(data => {
        if (data.cod && data.cod !== 200) {
          throw new Error(data.message);
        }
        this.setState({ weather: data });
      })
      .catch(err => this.setState({ error: err.message }));
  }

  render() {
    const { weather, error } = this.state;

    return (
      <div>
        <h1>Weather App</h1>
        {error && <p className="error">{error}</p>}
        <Weather weather={weather} />
      </div>
    );
  }
}

export default App;