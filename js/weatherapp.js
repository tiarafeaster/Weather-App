// setting the date and time
function formatDate(timestamp) {
	let days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];

	let date = new Date(timestamp);
	let day = days[date.getDay()];
	let hours = date.getHours();
	let minutes = date.getMinutes();

	return `${day} ${hours}:${minutes}`;
}

// changing the city name
function search(city) {
	let apiKey = "5423fee45fccae4c3cd5d7b43daf88ad";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
	axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
	event.preventDefault();
	let cityInput = document.querySelector("#city-input");
	search(cityInput.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

// getting forecast coordinates

function getForecast(coordinates) {
	let apiKey = "5423fee45fccae4c3cd5d7b43daf88ad";
	let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;

	axios.get(apiUrl).then(showForecast);
}

// getting current weather by geolocation

function showTemperature(response) {
	let temperature = document.querySelector("#temperature");
	fahrenheitTemperature = response.data.main.temp;
	temperature.innerHTML = Math.round(fahrenheitTemperature);

	let city = document.querySelector("#city");
	city.innerHTML = response.data.name;

	let description = document.querySelector("#description");
	description.innerHTML = response.data.weather[0].description;

	let humidity = document.querySelector("#humidity");
	humidity.innerHTML = response.data.main.humidity;

	let wind = document.querySelector("#wind");
	wind.innerHTML = Math.round(response.data.wind.speed);

	let date = document.querySelector("#date");
	date.innerHTML = formatDate(response.data.dt * 1000);

	let icon = document.querySelector("#icon");
	icon.setAttribute(
		"src",
		`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
	);
	icon.setAttribute("alt", response.data.weather[0].description);

	getForecast(response.data.coord);
}

function showPosition(position) {
	let lat = position.coords.latitude;
	let long = position.coords.longitude;
	let apiKey = "5423fee45fccae4c3cd5d7b43daf88ad";
	let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
	let apiUrl = `${apiEndpoint}lat=${lat}&lon=${long}&appid=${apiKey}&units=imperial`;
	axios.get(apiUrl).then(showTemperature);
}
function getPosition(event) {
	event.preventDefault();
	navigator.geolocation.getCurrentPosition(showPosition);
}
let button = document.querySelector("#geo-button");
button.addEventListener("click", getPosition);

// changing temp to farh and celcius make sure to update
function showCelsiusTemperature(event) {
	event.preventDefault();
	let celsiusTemperature = ((fahrenheitTemperature - 32) * 5) / 9;
	fahrenheitLink.classList.remove("active");
	celsiusLink.classList.add("active");
	let temperature = document.querySelector("#temperature");
	temperature.innerHTML = Math.round(celsiusTemperature);
}

function showFahrenheitTemperature(event) {
	event.preventDefault();
	let temperature = document.querySelector("#temperature");
	fahrenheitLink.classList.add("active");
	celsiusLink.classList.remove("active");
	temperature.innerHTML = Math.round(fahrenheitTemperature);
}

let fahrenheitTemperature = null;

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);

let fahrenheitLink = document.querySelector("#fahr-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

function formatDay(timestamp) {
	let date = new Date(timestamp * 1000);
	let day = date.getDay();
	let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

	return days[day];
}
function showForecast(response) {
	let forecast = response.data.daily;
	let forecastElement = document.querySelector("#weather-forecast");

	let forecastHTML = `<div class="row">`;

	forecast.forEach(function (forecastDay, index) {
		if (index < 4) {
			forecastHTML =
				forecastHTML +
				`
		<div class="col-3">
			<div class="forecast-date">${formatDay(forecastDay.dt)}</div>
			    <img
			    src= "http://openweathermap.org/img/wn/${
						forecastDay.weather[0].icon
					}@2x.png";
			    alt="partly cloudy"
			    width="40"
			    />
			<div class="forecast-temperature">
				<span class="forecast-temperature-max"> ${Math.round(
					forecastDay.temp.max
				)}° </span>
				<span class="forecast-temperature-min"> ${Math.round(
					forecastDay.temp.min
				)}° </span>
			</div>
		</div>`;
		}
	});

	forecastHTML = forecastHTML + `</div>`;
	forecastElement.innerHTML = forecastHTML;
}

search("New York");
