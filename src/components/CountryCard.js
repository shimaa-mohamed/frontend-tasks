import React, { Component } from "react";
class CountryCard extends Component {
  render() {
      const {country}=this.props;
    return (
      <>
        <img
          className="grid-img"
          src={country.flag}
          style={{width:"100 px",height: "100 px"}}
          alt="germanyFlag"
        />
        <div className="card-content">
          <h2>{country.name}</h2>
          <p>
            Population: <span className="info"> {country.population}</span>
          </p>
          <p>
            Region: <span className="info"> {country.region}</span>
          </p>
          <p>
            Capital: <span className="info"> {country.capital}</span>
          </p>
        </div>
      </>
    );
  }
}

export default CountryCard;
