import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../index.scss";
class BasicDetails extends Component {
  state = {
    bordersNames: [],
    bordersCode: [],
    bordersArr: [],
  };

  componentDidMount() {
    this.setState({ bordersCode: this.props.country.borders });
  }

  render() {
    const { country } = this.props;
    let i = 0;
    return (
      <div className="details-wrapper">
        <img
          className="details-wrapper__img"
          src={country.flag}
          style={{ width: "100px", height: "100px" }}
          alt="germanyFlag"
        />
        <div className="details-wrapper__content">
          <h2>{country.name}</h2>
          <div className="details-wrapper__not-borders">
            <div>
              <p>
                Native Name:&nbsp;
                <span > {country.nativeName}</span>
              </p>
              <p>
                population:&nbsp;
                <span > {country.population}</span>
              </p>
              <p>
                Region:&nbsp; <span > {country.region}</span>
              </p>
              <p>
                Sub Region: &nbsp;
                <span > {country.subregion}</span>
              </p>
              <p>
                Capital:&nbsp; <span >{country.capital}</span>
              </p>
            </div>
            <div>
              <p>
                Top Level Domain:&nbsp;
                <span >{country.topLevelDomain}</span>
              </p>
              <p>
                currencies:&nbsp;{" "}
                <span >
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
                <span >
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
            <span className="details-wrapper__borders">
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
