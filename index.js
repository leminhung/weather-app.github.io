const inputElement = document.querySelector(".search-bar");
const buttonElement = document.querySelector("button");
const locationElement = document.querySelector(".location > p");
const temElement = document.querySelector(".tem > p");
const cloudElement = document.querySelector(".cloud > p");
const humidityElement = document.querySelector(".humidity > p");
const windElement = document.querySelector(".wind > p");
const bodyElement = document.querySelector("body");
const urlBg = "https://source.unsplash.com/1600x900/?";

inputElement.addEventListener("keyup", (e) => {
  e.preventDefault();
  const value = inputElement.value.trim();
  if (e.key === "Enter" && value) {
    weatherApp.fetchAPI(value);
  }
});

buttonElement.addEventListener("click", (e) => {
  e.preventDefault();
  const value = inputElement.value.trim();
  if (value) {
    weatherApp.fetchAPI(value);
  }
});

// https://api.openweathermap.org/data/2.5/weather?q=hanoi&appid=6f429c9cf31066b6d305ac837d669ab7
// https://source.unsplash.com/1600x900/?nature,water
const weatherApp = {
  fetchAPI: function (city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6f429c9cf31066b6d305ac837d669ab7`;
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.display(data));
  },
  display: function (data) {
    locationElement.textContent = data.name;
    temElement.textContent = Math.round(data.main.temp - 273.15);
    cloudElement.textContent = data.weather[0].description;
    humidityElement.textContent = data.main.humidity;
    windElement.textContent = data.wind.speed;
    bodyElement.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + data.name + "')";
  },
};

weatherApp.fetchAPI("ha noi");
