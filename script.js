// import {addDetailsInfo} from"./detailsScript"
const grid = document.querySelector(".grid");
const form = document.querySelector("form");
const submitBtn = document.querySelector("button[type='submit']");
const searchInput = document.querySelector("input[name='searchInput']");
const filter = document.querySelector("select");

function addItemToGrid(country) {
  const countryInGrid = document.createElement("a");
  countryInGrid.innerHTML = ` <img class="grid-img" src="${country.flag}" style="width: 100px;height: 100px;" alt="germanyFlag">
  <div class="card-content">
  <h2>${country.name}</h2>
  <p>Population: <span class="info"> ${country.population}</span></p>
  <p>Region: <span class="info"> ${country.region}</span></p>
  <p>Capital: <span class="info"> ${country.capital}</span></p>
  </div>
      `;
  countryInGrid.classList.add("card");
  countryInGrid.setAttribute("href", `details.html?name=${country.name}`);
  grid.appendChild(countryInGrid);
}

function searchAction(queryCountry) {
  grid.innerHTML = "";
  addItemToGrid(queryCountry);
}

function filterAction(queryRegion) {
  grid.innerHTML = "";
  queryRegion.forEach((country) => {
    addItemToGrid(country);
  });
}

function getAll() {
  fetch("https://restcountries.eu/rest/v2/all")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      grid.innerHTML = "";
      data.forEach((country) => {
        addItemToGrid(country);
      });
    })
    .catch(() => {
      console.log("error");
    });
}

function getCountryByName(name) {
  fetch(`https://restcountries.eu/rest/v2/name/${name}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      searchAction(data[0]);
    })
    .catch(() => {
      console.log("error");
    });
}

function getCountryByRegion(region) {
  fetch(`https://restcountries.eu/rest/v2/region/${region}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      filterAction(data);
    })
    .catch(() => {
      console.log("error");
    });
}

function showInGrid() {
  getAll();
  form.addEventListener("input", (e) => {
    e.preventDefault();
    if (searchInput.value.length === 0 && filter.value.length === 0) {
      getAll();
    } else if (searchInput.value.length) {
      getCountryByName(searchInput.value);
    } else if (filter.value.length !== 0) {
      getCountryByRegion(filter.value);
    }
  });
}

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
});
showInGrid();
