import React, { Component } from "react";
import Header from "./Header";
import { Link } from "react-router-dom";
import CountryCard from "./CountryCard";
import "../index.scss";
import { getAll, getCountryByName, getCountryByRegion } from "../utils/api";
import Form from "./Form";
class App extends Component {
  state = {
    countries: [],
  };

  searchByName = (name) => {
    getCountryByName(name).then((data) => {
      this.setState({ countries: data });
    });
  };

  searchByRegion = (region) => {
    getCountryByRegion(region).then((data) => {
      this.setState({ countries: data });
    });
  };

  showAll = () => {
    getAll().then((data) => {
      this.setState({ countries: data });
    });
  };

  componentDidMount() {
    this.showAll();
  }

  render() {
    const { countries } = this.state;
    return (

      <div>
        <Header toggleTheme={this.props.toggleTheme} />
        <main>
          <Form
            countries={this.countries}
            showAll={this.showAll}
            searchByName={this.searchByName}
            searchByRegion={this.searchByRegion}
          />
          <div className="grid" ref={this.grid}>
            {countries && countries.length&&
              countries.map((c) => (
                <Link
                  key={c.name}
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
