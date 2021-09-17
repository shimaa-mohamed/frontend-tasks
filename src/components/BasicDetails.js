import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../index.css";
class BasicDetails extends Component {
    state={
        bordersNames:[],
        bordersCode:[],
        bordersArr:[]
    }

  componentDidMount(){
      this.setState({bordersCode:this.props.country.borders});
  }

  render() {
    const { country} = this.props;
    let i=0;
        return (
      <div className="details-card-wrapper">
        <img
          className="details-card-img"
          src={country.flag}
          style={{ width: "100px", height: "100px" }}
          alt="germanyFlag"
        />
        <div className="details-card-content">
          <h2>{country.name}</h2>
          <div className="all-except-borders">
            <div calss="right-side">
              <p>
                Native Name:&nbsp;
                <span className="info"> {country.nativeName}</span>
              </p>
              <p>
                population:&nbsp;
                <span className="info"> {country.population}</span>
              </p>
              <p>
                Region:&nbsp; <span className="info"> {country.region}</span>
              </p>
              <p>
                Sub Region: &nbsp;
                <span className="info"> {country.subregion}</span>
              </p>
              <p>
                Capital:&nbsp; <span className="info">{country.capital}</span>
              </p>
            </div>
            <div className="left-side">
              <p>
                Top Level Domain:&nbsp;
                <span className="info">{country.topLevelDomain}</span>
              </p>
              <p>
                currencies:&nbsp;{" "}
                <span className="info currencies">
                  {country.currencies &&
                    country.currencies.map((curr, index) =>
                      index === country.currencies.length - 1
                        ? curr.name
                        : curr.name + ","
                    )}
                </span>
              </p>
              <p>
                Languages: &nbsp;{" "}
                <span className="info languages">
                  {country.languages &&
                    country.languages.map((lang, index) =>
                      index === country.languages.length - 1
                        ? lang.name
                        : lang.name + ","
                    )}
                </span>
              </p>
            </div>
          </div>
          <p>
            Border Countries:&nbsp;
            <span className="info borders">
              {country.borders &&
                country.borders.map((borderCountry) => (
                  <Link
                  key={i++}
                    to={`/details/${borderCountry}`}
                    className="border-country"
                  >
                    {borderCountry}
                  </Link>
                ))}
            </span>
          </p>
        </div>
      </div>
    );
  }
}

export default BasicDetails;
