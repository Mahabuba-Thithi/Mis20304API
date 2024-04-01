function searchCountry() {
  const searchInput = document.getElementById("searchInput").value;
  fetch(`https://restcountries.com/v3.1/name/${searchInput}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.length > 0) {
        const country = data[0];
        const countryInfo = `
          <h2>${country.name.common}</h2>
          <p>Capital: ${country.capital}</p>
          <p>Population: ${country.population}</p>
          <p>Region: ${country.region}</p>
          <div id="showButton"> <button  onclick="showWeather('${country.name.common}')">Show Weather</button>
          </div>
        `;

        document.getElementById("countryInfo").innerHTML = countryInfo;
      } else {
        document.getElementById("countryInfo").innerHTML =
          "<p>Country not found</p>";
      }
    })
    .catch((error) => console.log("Error:", error));
}

function showWeather(countryName) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${countryName}&appid=15d62855a8cde5311ed5b82e995e2fd3`
  )
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("showButton").innerHTML="";
      const weatherInfo = `
        <p>Temperature: ${Math.round(data.main.temp - 273.15)}°C</p>
        <p>Description: ${data.weather[0].description}</p>
      `;
      document
        .getElementById("countryInfo")
        .insertAdjacentHTML("beforeend", weatherInfo);
    })
    .catch((error) => console.log("Error:", error));
}
