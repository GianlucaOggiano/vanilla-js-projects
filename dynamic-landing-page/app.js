const WEATHER_KEY = '6835862829e250e3b8f7253cde3baa3b';
const WEATHER_URL = `http://api.openweathermap.org/data/2.5/weather?`;

const timeElement = document.getElementById('time');
const greetingElement = document.getElementById('greeting');
const userElement = document.getElementById('user');

const weatherElement = document.getElementById('weather');
const weatherIconElement = weatherElement.querySelector('#weatherIcon');
const locationElement = weatherElement.querySelector('#location');
const statsElement = weatherElement.querySelector('.stats');

const getTime = () => {
  const now = new Date();
  const hours = now
    .getHours()
    .toLocaleString('en-Us', { minimumIntegerDigits: 2 });
  const minutes = now
    .getMinutes()
    .toLocaleString('en-Us', { minimumIntegerDigits: 2 });
  const seconds = now
    .getSeconds()
    .toLocaleString('en-Us', { minimumIntegerDigits: 2 });

  const output = `<span>${hours}</span>:<span>${minutes}</span>:<span>${seconds}</span>`;

  timeElement.innerHTML = output;

  // console.log({ hours, minutes, seconds });
};

const setDailyGreeting = () => {
  const now = new Date();
  const hours = now.getHours();
  if (hours < 12) {
    greetingElement.innerHTML = 'Good Morning,';
    document.body.style.backgroundImage = 'url(./img/morning.jpg)';
    document.body.style.color = '#ffffff';
  } else if (hours < 18) {
    document.body.style.backgroundImage = 'url(./img/afternoon.jpg)';
    document.body.style.color = '#ffffff';
    greetingElement.innerHTML = 'Good Afternoon,';
  } else {
    document.body.style.backgroundImage = 'url(./img/night.jpg)';

    greetingElement.innerHTML = 'Good Evening,';
  }
};

const getUserName = () => {
  userElement.innerText =
    localStorage.getItem('name') === null
      ? '[Your name]'
      : localStorage.getItem('name');
};

const setUserName = (event) => {
  if (event.type === 'keypress' && event.keyCode == 13) {
    const name = event.target.innerText;
    if (name.trim() === '') return userElement.blur();
    localStorage.setItem('name', name);
    userElement.blur();
  }
};

const getWeather = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const { latitude, longitude } = coords;
        fetchWeather(latitude, longitude);
      },
      (err) =>
        (weatherElement.innerHTML =
          '<small style="margin-top:15px">Turn on geolocation for weather</small>'),
      { maximumAge: 10000, timeout: 5000, enableHighAccuracy: true },
    );
  } else {
    console.log('Geolocation API is not supported in your browser.');
  }
};

const fetchWeather = async (latitude, longitude) => {
  const res = await fetch(
    `${WEATHER_URL}lat=${latitude}&lon=${longitude}&appid=${WEATHER_KEY}&units=metric`,
  );
  const data = await res.json();
  console.log(data);
  const imgElement = document.createElement('img');
  imgElement.src = ` http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
  console.log(imgElement);
  weatherIconElement.appendChild(imgElement);
  locationElement.innerHTML = `<p>${data.name}</p>`;
  statsElement.innerHTML = `<span>${data.main.temp}°</span>`;
};

userElement.addEventListener('keypress', setUserName);
userElement.addEventListener('blur', getUserName);

setInterval(getTime, 1000);
getTime();
setDailyGreeting();
getUserName();
getWeather();
