const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export async function getWeather(city) {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

    const response = await fetch(URL);

    const data = await response.json();

    return data;
    if (!response.ok) {
        throw new Error("City not found!");
    }
}