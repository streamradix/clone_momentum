const API_KEY = "db7cdbd7ea68fd672b149196c4596a1e";
const HIDDEN = "hidden";

const weather = document.querySelector("#weather");
const country = weather.querySelector("#country");
const city = weather.querySelector("#city");
const icon = weather.querySelector("#icon");
const main = weather.querySelector("#main");
const description = weather.querySelector("#description");
const sun_rise = weather.querySelector("#sun-rise");
const sun_set = weather.querySelector("#sun-set");
const temp = weather.querySelector("#temp");
const feel_like = weather.querySelector("#feel-like");
const air_pressure = weather.querySelector("#air-pressure");
const humidity = weather.querySelector("#humidity");

const convertUnixTimeToDate = (timestamp) => {
	const date = new Date(timestamp * 1000);
	const hour = String(date.getHours()).padStart(2, "0");
	const minute = String(date.getMinutes()).padStart(2, "0");
	const second = String(date.getSeconds()).padStart(2, "0");

	return `${hour}:${minute}:${second}`;
};

const onGeoSuccess = (position) => {
	const lat = position.coords.latitude;
	const lon = position.coords.longitude;
	const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

	fetch(url)
		.then((response) => response.json())
		.then((data) => {
			weather.classList.remove(HIDDEN);
			console.dir(position);
			console.dir(data);

			country.innerText = data.sys.country;
			city.innerText = data.name;
			icon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
			main.innerText = data.weather[0].main;
			description.innerText = data.weather[0].description;

			temp.innerText = `Temperature ${data.main.temp} C`; // 온도 C
			feel_like.innerText = `Feel Like ${data.main.feels_like} C`; // 체감 온도 C
			air_pressure.innerText = `Air Pressure ${data.main.pressure}hPa`; // 대기압 hPa
			humidity.innerText = `Humidity ${data.main.humidity}%`; // 습도 %

			sun_rise.innerText = `일출 ${convertUnixTimeToDate(data.sys.sunrise)}`;
			sun_set.innerText = `일몰 ${convertUnixTimeToDate(data.sys.sunset)}`;
		});
};

const onGeoError = () => {
	weather.classList.add(HIDDEN);
};

navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError);
