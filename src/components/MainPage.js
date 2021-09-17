import React, { Component } from "react";
import Header from "./Header";
import { Link } from "react-router-dom";
import CountryCard from "./CountryCard";
import "../index.scss";
import Form from "./Form";
class App extends Component {
  state = {
    countries: [],
  };
  getAll = () => {
    fetch("https://restcountries.eu/rest/v2/all")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({ countries: data });
      })
      .catch(() => {
        console.log("error");
      });
  };

  getCountryByName = (name) => {
    fetch(`https://restcountries.eu/rest/v2/name/${name}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({ countries: data });
      })
      .catch(() => {
        console.log("error");
      });
  };

  getCountryByRegion = (region) => {
    fetch(`https://restcountries.eu/rest/v2/region/${region}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        this.setState({ countries: data });
      })
      .catch(() => {
        console.log("error");
      });
  };

  componentDidMount() {
    this.getAll();
  }

  render() {
    const { countries } = this.state;
    // console.log(countries);
    let i = 0;
    return (
      <div>
        <Header />
        <main>
          <Form
            countries={this.countries}
            getAll={this.getAll}
            getCountryByName={this.getCountryByName}
            getCountryByRegion={this.getCountryByRegion}
          />
          <div className="grid" ref={this.grid}>
            {countries &&
              countries.map((c) => (
                <Link
                  key={i++}
                  to={`/details/${c.alpha3Code}`}
                  className="card"
                >
                  <CountryCard country={c} />
                </Link>
              ))}
          </div>
        </main>
      </div>
    );
  }
}

export default App;
