export const getAll = () =>
  fetch("https://restcountries.eu/rest/v2/all")
    .then((res) => res.json())
    .then((data) => data)
    .catch(() => {
      console.log("error");
    });

export const getCountryByName = (name) =>
  fetch(`https://restcountries.eu/rest/v2/name/${name}`)
    .then((res) => res.json())
    .then((data) => data)
    .catch(() => {
      console.log("error");
    });

export const getCountryByRegion = (region) =>
  fetch(`https://restcountries.eu/rest/v2/region/${region}`)
    .then((res) => res.json())
    .then((data) => data)
    .catch(() => {
      console.log("error");
    });
export const getCountryByCode = (code) =>
  fetch(`https://restcountries.eu/rest/v2/alpha?codes=${code}`)
    .then((res) => res.json())
    .then((data) => data)
    .catch(() => {
      console.log("error");
    });
