// setting the date and time
function formatDate(date) {
	let days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];

	let months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	let now = new Date();
	let dayOfWeek = days[date.getDay()];
	let monthName = months[date.getMonth()];
	let day = date.getDay();
	let year = date.getFullYear();
	let currentDate = document.querySelector("#current-date");
	let currentTime = document.querySelector("#current-time");
	let hours = now.getHours();
	hours = hours % 12 || 12;

	currentDate.innerHTML = ` ${dayOfWeek}, ${day} , ${monthName} ${year}`;

	if (currentTime > 12) {
		currentTime.innerHTML = ` ${hours}: ${now.getMinutes()}pm`;
	} else {
		currentTime.innerHTML = ` ${hours}: ${now.getMinutes()}am`;
	}
}
formatDate(new Date());

// changing the city name
function citySearch(event) {
	event.preventDefault();
	let cityName = document.querySelector("#city-name");
	let search = document.querySelector("#search-city");

	cityName.innerHTML = search.value;

	// getting current weather by city
	let apiKey = "5423fee45fccae4c3cd5d7b43daf88ad";
	let city = search.value;
	let unit = "imperial";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;

	function showTemp(response) {
		console.log(response.data);
		let temperature = Math.round(response.data.main.temp);
		let cityTemp = document.querySelector("#temp");
		cityTemp.innerHTML = `${temperature}`;
	}
	axios.get(apiUrl).then(showTemp);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", citySearch);

// getting current weather by geolocation

function showTemperature(response) {
	let cityName = document.querySelector("#city-name");
	cityName.innerHTML = response.data.name;
	let temperature = Math.round(response.data.main.temp);
	let locationTemp = document.querySelector("#temp");
	locationTemp.innerHTML = `${temperature}`;
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

// changing temp to farh and celcius
function changeToCel(event) {
	event.preventDefault();
	let weather = document.querySelector("#temp");
	weather.innerHTML = 29;
}
let celcius = document.querySelector("#cel-link");
celcius.addEventListener("click", changeToCel);

function changeToFarh(event) {
	event.preventDefault();
	let temp = document.querySelector("#temp");
	temp.innerHTML = 78;
}
let farh = document.querySelector("#farh-link");
farh.addEventListener("click", changeToFarh);
