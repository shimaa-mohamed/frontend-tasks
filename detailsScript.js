const detailsOfCountry = document.querySelector(".country-info");
const countryName = new URLSearchParams(window.location.search).get("name");

function getCountryByCode(code, field) {
  fetch(`https://restcountries.eu/rest/v2/alpha?codes=${code}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const newNode = document.createElement("a");
      console.log(data[0].name);
      newNode.innerHTML = data[0].name;
      newNode.classList.add("border-country");
      newNode.setAttribute("href", `details.html?name=${data[0].name}`);
      document.querySelector(`.${field}`).appendChild(newNode);
      console.log("done");
    });
}
function arrayOfSpans(arr = [], field) {
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    const newNode = document.createElement("span");
    newNode.innerHTML =
      i === arr.length - 1 ? element.name : element.name + ", ";
    document.querySelector(`.${field}`).appendChild(newNode);
  }
}
function arrayOfBtns(arr = [], field) {
  arr.forEach((element) => {
    getCountryByCode(element, field);
  });
}
function addDetailsInfo(country) {
  const newItem = document.createElement("div");
  newItem.innerHTML = `<img class="details-card-img" src="${country.flag}" style="width: 100px;height: 100px;" alt="germanyFlag">
  <div class="details-card-content"> <h2>${country.name}</h2>
  <div class="all-except-borders">
  <div calss="right-side"> <p>Native Name:&nbsp <span class="info"> ${country.nativeName}</span></p>
  <p>population:&nbsp <span class="info"> ${country.population}</span></p>
  <p>Region:&nbsp <span class="info"> ${country.region}</span></p>
  <p>Sub Region: &nbsp<span class="info"> ${country.subregion}</span></p>
  <p>Capital:&nbsp <span class="info">${country.capital}</span></p></div>
 

<div class="left-side">  <p>Top Level Domain:&nbsp <span class="info">${country.topLevelDomain}</span></p>
<p>currencies:&nbsp <span class="info currencies"></span></p><p>Languages: &nbsp <span class="info languages"></span></p>
</div></div>
  <p>Border Countries:&nbsp <span class="info borders"></span></p></div>
   `;
  newItem.classList.add("details-card-wrapper");
  detailsOfCountry.appendChild(newItem);
  arrayOfSpans(country.languages, "languages");
  arrayOfSpans(country.currencies, "currencies");
  arrayOfBtns(country.borders, "borders");
}
function getCountryByName(name) {
  fetch(`https://restcountries.eu/rest/v2/name/${name}`)
    .then((res) => res.json())
    .then((data) => {
      //   console.log(data);
      addDetailsInfo(data[0]);
    })
    .catch(() => {
      console.log("error");
    });
}

getCountryByName(countryName);
