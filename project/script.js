const API_KEY = "0b46b6f225289f27c80fc00866f29c30";

const weatherIcons = {
  Clear: 'wi wi-day-sunny',
  Rain: 'wi wi-rain',
  Clouds: 'wi wi-cloudy',
  Snow: 'wi wi-snow',
  Thunderstorm: 'wi wi-thunderstorm',
  Drizzle: 'wi wi-sprinkle',
  Mist: 'wi wi-fog',
  Smoke: 'wi wi-smoke',
  Haze: 'wi wi-day-haze',
  Dust: 'wi wi-dust',
  Fog: 'wi wi-fog',
  Sand: 'wi wi-sandstorm',
  Ash: 'wi wi-volcano',
  Squall: 'wi wi-strong-wind',
  Tornado: 'wi wi-tornado'
};

const getWeatherIcon = (weatherMain) => {
  const iconClass = weatherIcons[weatherMain] || 'wi wi-na';
  return `<i class="${iconClass}"></i>`;
};

const elements = {
  form: document.getElementById('search-form'),
  cityInput: document.getElementById('city-input'),
  loading: document.getElementById('loading'),
  error: document.getElementById('error'),
  weatherInfo: document.getElementById('weather-info'),
  cityName: document.getElementById('city-name'),
  weatherIcon: document.getElementById('weather-icon'),
  temperature: document.getElementById('temperature'),
  description: document.getElementById('description'),
  feelsLike: document.getElementById('feels-like'),
  humidity: document.getElementById('humidity'),
  windSpeed: document.getElementById('wind-speed')
};

const showLoading = () => {
  elements.loading.classList.remove('hidden');
  elements.error.classList.add('hidden');
  elements.weatherInfo.classList.add('hidden');
};

const showError = (message) => {
  elements.loading.classList.add('hidden');
  elements.error.classList.remove('hidden');
  elements.weatherInfo.classList.add('hidden');
  elements.error.textContent = message;
};

const showWeather = (data) => {
  elements.loading.classList.add('hidden');
  elements.error.classList.add('hidden');
  elements.weatherInfo.classList.remove('hidden');

  elements.cityName.textContent = data.name;
  elements.weatherIcon.innerHTML = getWeatherIcon(data.weather[0].main);
  elements.temperature.textContent = `${Math.round(data.main.temp)}°C`;
  elements.description.textContent = data.weather[0].description;
  elements.feelsLike.textContent = `${Math.round(data.main.feels_like)}°C`;
  elements.humidity.textContent = `${data.main.humidity}%`;
  elements.windSpeed.textContent = `${Math.round(data.wind.speed)} m/s`;
};

const fetchWeather = async (city) => {
  try {
    showLoading();
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      throw new Error('City not found');
    }
    
    const data = await response.json();
    showWeather(data);
  } catch (err) {
    showError('Failed to fetch weather data');
  }
};

elements.form.addEventListener('submit', (e) => {
  e.preventDefault();
  const city = elements.cityInput.value.trim();
  if (city) {
    fetchWeather(city);
  }
});

// Initial weather fetch
fetchWeather('London');