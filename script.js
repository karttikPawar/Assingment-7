const API_KEY = "48cb211089756f315b588b384f8b64cf";

const getWeather = async (city = "Delhi") => {
  return await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
  ).then((res) => res.json());
};

const input = document.getElementById("cityInput");
const submit = document.getElementById("submit");

getWeather().then((data) => {
  console.log(data);
  if (data.message) {
    return alert(data.message);
  }
  cityDate(data.name, data.sys.country);
  temp(data.main.temp, data.weather[0]);
  otherValues(data.main, data.visibility, data.wind, data.sys);
});

submit.onclick = function (e) {
  e.preventDefault();

  if (!input.value) {
    return alert("Please enter city name");
  }

  getWeather(input.value).then((data) => {
    console.log(data);
    if (data.message) {
      return alert(data.message);
    }
    cityDate(data.name, data.sys.country);
    temp(data.main.temp, data.weather[0]);
    otherValues(data.main, data.visibility, data.wind, data.sys);
  });
};

const sunriseSunset = () => {};

const cityDate = (name, con) => {
  const cityName = document.getElementById("cityName");
  cityName.textContent = name + ", " + con;

  const date = document.getElementById("date");
  const todayDate = new Date();
  date.textContent =
    weekDay(todayDate.getDay()) +
    " " +
    todayDate.getDate() +
    " " +
    month(todayDate.getMonth()) +
    " " +
    todayDate.getFullYear();
};

const temp = (tempVal, weather) => {
  const temp = document.getElementById("temp");
  const sky = document.getElementById("sky");
  const weatherIcon = document.getElementById("weatherIcon");
  temp.textContent = tempVal;
  sky.textContent = weather.main;
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${weather.icon}@2x.png`
  );
};

const otherValues = (temps, visi, wind, sys) => {
  const minTemp = document.getElementById("minTemp");
  const maxTemp = document.getElementById("maxTemp");
  const visibility = document.getElementById("visibility");
  const winds = document.getElementById("winds");
  const sunrise = document.getElementById("sunrise");
  const sunset = document.getElementById("sunset");

  minTemp.innerHTML = temps.temp_min + "&#176C";
  maxTemp.innerHTML = temps.temp_max + "&#176C";
  visibility.textContent = visi;
  winds.textContent = wind.speed + " Km/pH";

  const sunriseTime = new Date(sys.sunrise * 1000);
  const sunsetTime = new Date(sys.sunset * 1000);

  sunrise.textContent =
    sunriseTime.getHours() + ":" + sunsetTime.getMinutes() + "Am";
  sunset.textContent =
    sunsetTime.getHours() + ":" + sunsetTime.getMinutes() + "Pm";
};

const month = (val) => {
  switch (val) {
    case 1:
      return "Jan";
    case 2:
      return "Feb";
    case 3:
      return "Mar";
    case 4:
      return "Apr";
    case 5:
      return "May";
    case 6:
      return "Jun";
    case 7:
      return "Jul";
    case 8:
      return "Aug";
    case 9:
      return "Sep";
    case 10:
      return "Oct";
    case 11:
      return "Nov";
    case 12:
      return "Dec";
  }
};
const weekDay = (val) => {
  switch (val) {
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
    case 7:
      return "Sunday";
  }
};
