import React, { Component } from "react";
import "../index.scss";

class Form extends Component {
  state = {
    searchVal: "",
    filterVal: "",
  };

  handleSearch = (e) => {
    this.setState({ searchVal: e.target.value });
    this.props.getCountryByName(e.target.value);
  };
  handleFilter = (e) => {
    this.setState({ filterVal: e.target.value });
    this.props.getCountryByRegion(e.target.value);
  };
  handleForm = (e) => {
    e.preventDefault();
    if (
      this.state.searchVal.length === 0 &&
      this.state.filterVal.length === 0
    ) {
      this.props.getAll();
    }
  };
  handleSubmit = (e) => {
    e.preventDefault();
  };
  render() {
    return (
      <form onInput={this.handleForm}>
        <div className="search-div">
          <button type="submit" onClick={this.handleSubmit}>
            <i className="fa fa-search icon" aria-hidden="true"></i>
          </button>
          <input
            type="text"
            placeholder="Search for a country.."
            name="searchInput"
            value={this.searchVal}
            onChange={this.handleSearch}
          />
        </div>
        <select
          name="filter"
          id="filter"
          value={this.filterVal}
          onChange={this.handleFilter}
          title="filter"
          defaultValue=""
        >
          <option value="" disabled>
            Filter by Region
          </option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </form>
    );
  }
}

export default Form;
