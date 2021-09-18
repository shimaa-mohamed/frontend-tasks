import React, { Component } from "react";
import Header from "./Header";
import { Link } from "react-router-dom";
import "../index.scss";
import { getCountryByCode } from "../utils/api";
import BasicDetails from "./BasicDetails";
class Details extends Component {
  state = {
    country: {},
  };

  searchByCode = (code) => {
    getCountryByCode(code).then((data) => {
      this.setState({ country: data[0] });
    });
  };

  componentDidMount() {
    this.searchByCode(this.props.countryCode);
  }
  render() {
    const { country } = this.state;
    console.log(this.props);
    this.searchByCode(this.props.countryCode);

    return (
      <div>
        <Header toggleTheme={this.props.toggleTheme} />
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
