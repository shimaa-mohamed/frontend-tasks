import React, { Component } from "react";
import Header from "./Header";
import { Link } from "react-router-dom";
import "../index.scss";
import BasicDetails from "./BasicDetails";
class Details extends Component {
  state = {
    country: {},
  };

  getCountryByCode = (code) => {
    fetch(`https://restcountries.eu/rest/v2/alpha?codes=${code}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        this.setState({ country: data[0] });
      })
      .catch(() => {
        console.log("error");
      });
  };

  handleRefresh = () => {
    this.getCountryByCode(this.props.match.params.countryCode);
  };
  componentDidMount() {
    this.getCountryByCode(this.props.match.params.countryCode);
  }
  render() {
    const { country } = this.state;
    this.handleRefresh(this.props.match.params.countryCode);

    return (
      <div>
        <Header />
        <main className="country-info">
          <Link className="back-btn" to="/">
            <i className="fas fa-long-arrow-alt-left icon"></i>Back
          </Link>
          <BasicDetails country={country} />
        </main>
      </div>
    );
  }
}

export default Details;
